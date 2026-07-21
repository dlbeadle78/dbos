import { readFile, readdir, writeFile } from "node:fs/promises";
import { extname, resolve } from "node:path";
import { ROOT } from "./lib/model.mjs";

const write = process.argv.includes("--write");
const ignored = new Set([".git","node_modules","dist","coverage"]);
const extensions = new Set([".json",".mjs",".ts",".md",".yml",".yaml",".txt"]);
let changed = 0;

async function visit(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const path = resolve(dir, entry.name);
    if (entry.isDirectory()) await visit(path);
    else if (extensions.has(extname(entry.name)) || [".nvmrc",".node-version",".npmrc",".editorconfig",".gitignore"].includes(entry.name)) {
      const original = await readFile(path, "utf8");
      let next = original.replace(/\r\n?/gu, "\n").replace(/[ \t]+$/gmu, "");
      const generatedJson = path.includes("packages/contracts/schemas/") || path.includes("packages/contracts/fixtures/") || path.endsWith("packages/contracts/generated-manifest.json");
      if (path.endsWith("packages/contracts/model/contracts.json") || generatedJson) next = `${JSON.stringify(JSON.parse(next))}\n`;
      else if (entry.name.endsWith(".json")) next = `${JSON.stringify(JSON.parse(next), null, 2)}\n`;
      else if (!next.endsWith("\n")) next += "\n";
      if (next !== original) {
        changed += 1;
        if (write) await writeFile(path, next, "utf8");
        else console.error(`Formatting drift: ${path}`);
      }
    }
  }
}
await visit(ROOT);
if (!write && changed > 0) process.exit(1);
console.log(write ? `Formatted ${changed} file(s).` : "Formatting check passed.");
