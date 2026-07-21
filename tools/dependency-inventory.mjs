import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { ROOT } from "./lib/model.mjs";
import { stableJson } from "./lib/stable-json.mjs";

const inventory = [];
const modules = resolve(ROOT, "node_modules");
for (const entry of await readdir(modules, { withFileTypes: true })) {
  if (!entry.isDirectory() || entry.name.startsWith(".")) continue;
  if (entry.name.startsWith("@")) {
    for (const scoped of await readdir(resolve(modules, entry.name), { withFileTypes: true })) {
      if (scoped.isDirectory()) await add(resolve(modules, entry.name, scoped.name));
    }
  } else {
    await add(resolve(modules, entry.name));
  }
}
async function add(path) {
  try {
    const pkg = JSON.parse(await readFile(resolve(path, "package.json"), "utf8"));
    inventory.push({ name: pkg.name, version: pkg.version, licence: pkg.license ?? "UNKNOWN", private: pkg.private === true });
  } catch {}
}
inventory.sort((a,b) => `${a.name}@${a.version}`.localeCompare(`${b.name}@${b.version}`));
await mkdir(resolve(ROOT, "reports"), { recursive: true });
await writeFile(resolve(ROOT, "reports/dependency-inventory.json"), stableJson({ report_version:"1.0.0", dependencies:inventory }), "utf8");
console.log(`Dependency inventory contains ${inventory.length} package(s).`);
