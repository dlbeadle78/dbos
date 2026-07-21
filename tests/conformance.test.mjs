import test from "node:test";
import assert from "node:assert/strict";
import { runConformance } from "../tools/run-conformance.mjs";

test("Ajv and fixture expectations agree without overclaiming semantic invariants", async () => {
  const report = await runConformance();
  assert.equal(report.summary.failed, 0);
  assert.equal(report.summary["approved-exception"], 0);
  assert.equal(report.summary["not-implemented"], 51);
  assert.equal(report.fixture_summary.matched, report.fixture_summary.total);
  assert.ok(report.fixture_summary.total >= 64);
});

test("report uses only the authorised status vocabulary", async () => {
  const report = await runConformance();
  const allowed = new Set(["passed", "failed", "not-implemented", "approved-exception"]);
  assert.ok(report.results.every((result) => allowed.has(result.status)));
  assert.deepEqual(Object.keys(report.summary).sort(), [...allowed].sort());
});
