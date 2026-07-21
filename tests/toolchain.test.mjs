import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
test("toolchain and direct contract dependencies are pinned exactly", async () => {
  const pkg = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
  assert.equal(pkg.engines.node, "=24.14.0");
  assert.equal(pkg.engines.npm, "=11.9.0");
  assert.equal(pkg.devDependencies.typescript, "7.0.2");
  assert.equal(pkg.devDependencies.ajv, "8.20.0");
  assert.equal(pkg.private, true);
});
