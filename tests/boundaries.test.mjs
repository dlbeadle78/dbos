import test from "node:test";
import assert from "node:assert/strict";
import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { checkBoundaries } from "../tools/check-boundaries.mjs";

test("current workspace respects package import direction", async () => {
  const result = await checkBoundaries();
  assert.equal(result.violations, 0);
  assert.equal(result.packages_checked, 2);
});

test("cross-package relative imports fail the boundary gate", async () => {
  const root = await mkdtemp(join(tmpdir(), "dbos-boundary-"));
  await mkdir(resolve(root, "architecture"), { recursive: true });
  await mkdir(resolve(root, "packages/contracts/src"), { recursive: true });
  await mkdir(resolve(root, "packages/conformance/src"), { recursive: true });
  await writeFile(
    resolve(root, "architecture/package-boundaries.json"),
    JSON.stringify({
      packages: {
        "@dbos/contracts": { path: "packages/contracts", may_import: [] },
        "@dbos/conformance": { path: "packages/conformance", may_import: ["@dbos/contracts"] },
      },
    }),
  );
  await writeFile(resolve(root, "packages/contracts/src/index.ts"), "export const contract = true;\n");
  await writeFile(
    resolve(root, "packages/conformance/src/index.ts"),
    'import { contract } from "../../contracts/src/index.js";\nexport { contract };\n',
  );
  await assert.rejects(checkBoundaries(root), /crosses package boundary/u);
});
