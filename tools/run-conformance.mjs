import Ajv2020 from "ajv/dist/2020.js";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { ROOT, loadModel } from "./lib/model.mjs";
import { buildPositiveFixture } from "./generate-contracts.mjs";
import { stableJson } from "./lib/stable-json.mjs";

function wrongValueForField(field) {
  if (field.kind === "string") return 123;
  if (field.kind === "integer" || field.kind === "number") return "not-a-number";
  if (field.kind === "boolean") return "not-a-boolean";
  if (field.kind === "array") return {};
  return [];
}

export async function runConformance(root = ROOT) {
  const model = await loadModel(resolve(root, "packages/contracts/model/contracts.json"));
  const fixtureSet = JSON.parse(await readFile(resolve(root, "packages/contracts/fixtures/fixtures.generated.json"), "utf8"));
  const ajv = new Ajv2020({ strict: true, allErrors: true, validateFormats: false });
  ajv.addKeyword({ keyword: "x-dbos-trace", schemaType: "object", valid: true });
  const validators = new Map();
  for (const name of (await readdir(resolve(root, "packages/contracts/schemas"))).filter((name) => name.endsWith(".schema.json")).sort()) {
    const schema = JSON.parse(await readFile(resolve(root, "packages/contracts/schemas", name), "utf8"));
    validators.set(schema.title, ajv.compile(schema));
  }

  const runtimeModels = new Map(model.contracts.flatMap((contract) => contract.models.map((runtimeModel) => [runtimeModel.name, runtimeModel])));
  const fixtureResults = [];
  for (const plan of fixtureSet.fixture_plans) {
    const validate = validators.get(plan.model);
    const runtimeModel = runtimeModels.get(plan.model);
    if (!validate || !runtimeModel) throw new Error(`No model or schema validator for ${plan.model}`);
    const firstField = runtimeModel.fields[0];
    const wrongField = runtimeModel.fields.find((field) => !field.nullable) ?? firstField;
    const enumField = runtimeModel.fields.find((field) => Array.isArray(field.enum));
    const versionField = runtimeModel.fields.find((field) => ["contract_version", "event_version", "model_version", "version"].includes(field.name));
    for (const category of plan.cases) {
      const value = buildPositiveFixture(runtimeModel);
      if (category === "missing-required") delete value[firstField.name];
      else if (category === "additional-property") value.prohibited_extra_field = true;
      else if (category === "wrong-type") value[wrongField.name] = wrongValueForField(wrongField);
      else if (category === "invalid-enum" && enumField) value[enumField.name] = "__invalid_enum__";
      else if (category === "unsupported-major" && versionField) value[versionField.name] = "2.0.0";
      else if (category !== "positive") throw new Error(`Unsupported fixture category ${category} for ${plan.model}`);
      const expectedValid = category === "positive";
      const actual = Boolean(validate(value));
      fixtureResults.push({
        fixture_id: `${plan.model}-${category}`,
        contract_id: plan.contract_id,
        model: plan.model,
        category,
        expected_valid: expectedValid,
        actual_valid: actual,
        matched_expectation: actual === expectedValid,
        errors: validate.errors ?? [],
      });
    }
  }

  const results = [];
  for (const contract of model.contracts) {
    for (const runtimeModel of contract.models) {
      const relevant = fixtureResults.filter((fixture) => fixture.model === runtimeModel.name);
      const passed = relevant.every((fixture) => fixture.matched_expectation);
      results.push({
        behaviour_id: `DBOS-P3-SHAPE-${runtimeModel.name}`,
        status: passed ? "passed" : "failed",
        contract_id: contract.document_id,
        model: runtimeModel.name,
        evidence: relevant.map((fixture) => fixture.fixture_id),
        reason: passed ? "Ajv 2020 strict validation matched every generated positive and negative fixture." : "At least one fixture disagreed with its expected result.",
        approved_exception_ref: null,
      });
    }
    for (const invariant of contract.invariants) {
      results.push({
        behaviour_id: invariant,
        status: "not-implemented",
        contract_id: contract.document_id,
        model: null,
        evidence: [],
        reason: "Structural schema validation does not prove this semantic invariant.",
        approved_exception_ref: null,
      });
    }
  }

  const categories = new Map(fixtureResults.map((fixture) => [fixture.category, true]));
  for (const [behaviour_id, category] of [
    ["DBOS-P3-UNSUPPORTED-MAJOR","unsupported-major"],
    ["DBOS-P3-ADDITIONAL-PROPERTIES","additional-property"],
    ["DBOS-P3-MALFORMED-SENSITIVE-PAYLOAD","invalid-enum"],
  ]) {
    const relevant = fixtureResults.filter((fixture) => fixture.category === category);
    results.push({
      behaviour_id,
      status: relevant.length > 0 && relevant.every((fixture) => fixture.matched_expectation && !fixture.actual_valid) ? "passed" : "failed",
      contract_id: null,
      model: null,
      evidence: relevant.map((fixture) => fixture.fixture_id),
      reason: `${category} fixtures must be rejected before mutation.`,
      approved_exception_ref: null,
    });
  }

  const summary = { passed: 0, failed: 0, "not-implemented": 0, "approved-exception": 0 };
  for (const result of results) summary[result.status] += 1;
  const report = {
    report_version: "1.0.0",
    runtime_baseline: "5ee2a994889e6c6fe26f5782c3eea28ae003cce6",
    generated_at: new Date().toISOString(),
    fixture_summary: {
      total: fixtureResults.length,
      matched: fixtureResults.filter((fixture) => fixture.matched_expectation).length,
      categories: [...categories.keys()].sort(),
    },
    results,
    summary,
  };
  await mkdir(resolve(root, "reports"), { recursive: true });
  await writeFile(resolve(root, "reports/conformance.json"), stableJson(report), "utf8");
  if (summary.failed > 0) throw new Error(`${summary.failed} conformance behaviours failed.`);
  return report;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const report = await runConformance();
  console.log(report.summary);
}
