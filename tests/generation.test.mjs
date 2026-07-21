import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { generateArtifacts } from "../tools/generate-contracts.mjs";
import { loadModel } from "../tools/lib/model.mjs";

test("one canonical model deterministically generates 16 models and schemas", async () => {
  const model = await loadModel();
  const first = generateArtifacts(model);
  const second = generateArtifacts(model);
  assert.equal(first.types, second.types);
  assert.equal(first.fixtures, second.fixtures);
  assert.equal(first.schemas.size, 16);
  assert.equal(JSON.parse(first.fixtures).fixture_plans.length, 16);
});

test("generated outputs declare their authoritative source", async () => {
  const types = await readFile(new URL("../packages/contracts/src/generated/contracts.ts", import.meta.url), "utf8");
  assert.match(types, /GENERATED FROM packages\/contracts\/model\/contracts\.json/u);
  assert.match(types, /DBOS-CTR-001/u);
  assert.match(types, /DBOS-CTR-008/u);
});
