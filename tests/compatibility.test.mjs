import test from "node:test";
import assert from "node:assert/strict";
import { decideCompatibility } from "../packages/contracts/dist/compatibility.js";

test("supported patch version is compatible", () => {
  assert.deepEqual(decideCompatibility("1.0.9"), { compatible: true, reason: "supported-major-and-minor" });
});
test("unsupported major is rejected", () => {
  assert.deepEqual(decideCompatibility("2.0.0"), { compatible: false, reason: "unsupported-major" });
});
test("future minor is rejected until generated contracts are updated", () => {
  assert.deepEqual(decideCompatibility("1.1.0"), { compatible: false, reason: "unsupported-minor" });
});
