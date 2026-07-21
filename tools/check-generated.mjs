import { mkdtemp, cp, readFile, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, relative, resolve } from "node:path";
import { ROOT } from "./lib/model.mjs";
import { writeArtifacts } from "./generate-contracts.mjs";

async function filesUnder(path) {
  const entries = await readdir(path, { recursive: true, withFileTypes: true });
  return entries.filter((entry) => entry.isFile()).map((entry) => resolve(entry.parentPath, entry.name)).sort();
}

const temp = await mkdtemp(join(tmpdir(), "dbos-generated-"));
try {
  await cp(resolve(ROOT, "packages/contracts/model"), resolve(temp, "packages/contracts/model"), { recursive: true });
  await writeArtifacts(temp);
  const expectedRoot = resolve(ROOT, "packages/contracts");
  const actualRoot = resolve(temp, "packages/contracts");
  const paths = [
    "src/generated/contracts.ts",
    "src/generated/type-fixtures.generated.ts",
    "fixtures/fixtures.generated.json",
    "generated-manifest.json",
  ];
  const schemaFiles = (await filesUnder(resolve(expectedRoot, "schemas"))).map((path) => relative(expectedRoot, path));
  paths.push(...schemaFiles);
  for (const path of paths.sort()) {
    const expected = await readFile(resolve(expectedRoot, path), "utf8");
    const actual = await readFile(resolve(actualRoot, path), "utf8");
    if (expected !== actual) throw new Error(`Generated artefact drift: ${path}`);
  }
  console.log(`Generated artefacts are deterministic (${paths.length} files).`);
} finally {
  await rm(temp, { recursive: true, force: true });
}
