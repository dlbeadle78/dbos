import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { relative, resolve } from "node:path";
import { ROOT } from "./lib/model.mjs";
import { stableJson } from "./lib/stable-json.mjs";
const ignored = [".git/","node_modules/","dist/","coverage/","reports/release-manifest.json"];
const files = [];
async function visit(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = resolve(dir, entry.name);
    const rel = relative(ROOT,path).replaceAll("\\","/");
    if (ignored.some((prefix) => rel === prefix.replace(/\/$/u,"") || rel.startsWith(prefix))) continue;
    if (entry.isDirectory()) await visit(path);
    else {
      const data = await readFile(path);
      files.push({ path: rel, bytes: data.byteLength, sha256: createHash("sha256").update(data).digest("hex") });
    }
  }
}
await visit(ROOT);
files.sort((a,b) => a.path.localeCompare(b.path));
await mkdir(resolve(ROOT,"reports"),{recursive:true});
await writeFile(resolve(ROOT,"reports/release-manifest.json"),stableJson({
  manifest_version:"1.0.0",
  runtime_baseline:"5ee2a994889e6c6fe26f5782c3eea28ae003cce6",
  release_status:"development-not-releasable",
  files,
}),"utf8");
console.log(`Release manifest generated for ${files.length} files.`);
