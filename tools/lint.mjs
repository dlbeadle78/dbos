import { readFile, readdir } from "node:fs/promises";
import { extname, relative, resolve } from "node:path";
import { ROOT } from "./lib/model.mjs";
import { checkBoundaries } from "./check-boundaries.mjs";

const ignored = new Set([".git","node_modules","dist","coverage"]);
const sourceExtensions = new Set([".mjs",".ts"]);
const problems = [];
const checkerPath = "tools/lint.mjs";
const unapprovedAnyType = /(?:\bas\s+any\b|:\s*any\b|<any>)/u;
const prohibitedProcessExecution = /node:child_process|execSync|spawnSync|execFile|spawn\(/u;

async function visit(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const path = resolve(dir, entry.name);
    if (entry.isDirectory()) await visit(path);
    else if (sourceExtensions.has(extname(entry.name))) {
      const text = await readFile(path, "utf8");
      if (text.includes("\t")) problems.push(`${relative(ROOT,path)} contains a tab`);
      const rel = relative(ROOT, path).replaceAll("\\", "/");
      if (unapprovedAnyType.test(text) && !text.includes("documented-any-exception")) problems.push(`${rel} contains unapproved any type`);
      if (rel !== checkerPath && prohibitedProcessExecution.test(text)) problems.push(`${rel} adds prohibited process execution`);
    }
  }
}
await visit(ROOT);
await checkBoundaries(ROOT);
if (problems.length) throw new Error(problems.join("\n"));
console.log("Lint and prohibited-capability checks passed.");
