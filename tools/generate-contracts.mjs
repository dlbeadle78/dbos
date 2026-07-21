import { mkdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { loadModel, ROOT } from "./lib/model.mjs";
import { compactJson } from "./lib/stable-json.mjs";

const GENERATED_HEADER = "// GENERATED FROM packages/contracts/model/contracts.json. DO NOT EDIT.\n";

function schemaForField(field) {
  let schema;
  switch (field.kind) {
    case "string": schema = { type: "string" }; break;
    case "integer": schema = { type: "integer" }; break;
    case "number": schema = { type: "number" }; break;
    case "boolean": schema = { type: "boolean" }; break;
    case "array": schema = { type: "array", items: schemaForItem(field.items ?? { kind: "string" }) }; break;
    case "object": schema = objectSchema(field.properties ?? []); break;
    default: throw new Error(`Unsupported field kind: ${field.kind}`);
  }
  if (field.enum) schema.enum = [...field.enum];
  if (field.minimum !== undefined) schema.minimum = field.minimum;
  if (field.pattern) schema.pattern = field.pattern;
  if (field.nullable) return { anyOf: [schema, { type: "null" }] };
  return schema;
}

function schemaForItem(item) {
  if (item.kind === "object") return objectSchema(item.properties ?? []);
  return schemaForField({ ...item, required: true, nullable: false });
}

function objectSchema(fields) {
  return {
    type: "object",
    additionalProperties: false,
    required: fields.filter((field) => field.required !== false).map((field) => field.name),
    properties: Object.fromEntries(fields.map((field) => [field.name, schemaForField(field)])),
  };
}

function tsType(field) {
  let type;
  switch (field.kind) {
    case "string": type = field.enum ? field.enum.map((entry) => JSON.stringify(entry)).join(" | ") : "string"; break;
    case "integer":
    case "number": type = "number"; break;
    case "boolean": type = "boolean"; break;
    case "array": type = `ReadonlyArray<${tsItemType(field.items ?? { kind: "string" })}>`; break;
    case "object": type = tsObjectType(field.properties ?? []); break;
    default: throw new Error(`Unsupported field kind: ${field.kind}`);
  }
  return field.nullable ? `${type} | null` : type;
}
function tsItemType(item) {
  return item.kind === "object" ? tsObjectType(item.properties ?? []) : tsType({ ...item, nullable: false });
}
function tsObjectType(fields) {
  return `Readonly<{ ${fields.map((field) => `readonly ${field.name}: ${tsType(field)};`).join(" ")} }>`;
}

export function valueForField(field, seed) {
  if (field.nullable) return null;
  if (field.enum) return field.enum[0];
  switch (field.kind) {
    case "string":
      if (field.pattern?.includes("^1\\.")) return "1.0.0";
      if (field.name.endsWith("_at") || field.name.endsWith("_time") || field.name.includes("deadline") || field.name.includes("expires")) return "2026-07-21T10:00:00+01:00";
      if (field.name === "timezone") return "Europe/London";
      return `${field.name}-${seed}`;
    case "integer": return Math.max(field.minimum ?? 1, 1);
    case "number": return field.name === "confidence" ? 1 : Math.max(field.minimum ?? 1, 1);
    case "boolean": return true;
    case "array": return [valueForField({ ...(field.items ?? { kind: "string" }), name: `${field.name}_item`, nullable: false }, seed)];
    case "object": return Object.fromEntries((field.properties ?? []).map((nested) => [nested.name, valueForField(nested, seed)]));
    default: throw new Error(`Unsupported field kind: ${field.kind}`);
  }
}

export function buildPositiveFixture(runtimeModel) {
  return Object.fromEntries(runtimeModel.fields.map((field) => [field.name, valueForField(field, runtimeModel.name)]));
}

function wrongValue(field) {
  if (field.kind === "string") return 123;
  if (field.kind === "integer" || field.kind === "number") return "not-a-number";
  if (field.kind === "boolean") return "not-a-boolean";
  if (field.kind === "array") return {};
  return [];
}

export function generateArtifacts(model) {
  const schemas = new Map();
  const fixtures = [];
  const typeLines = [GENERATED_HEADER.trimEnd(), ""];
  const typeFixtureLines = [
    GENERATED_HEADER.trimEnd(),
    'import type * as Contracts from "./contracts.js";',
    "",
    "type Equal<Left, Right> = (<Value>() => Value extends Left ? 1 : 2) extends (<Value>() => Value extends Right ? 1 : 2) ? true : false;",
    "type Assert<Value extends true> = Value;",
    "",
  ];

  for (const contract of model.contracts) {
    for (const runtimeModel of contract.models) {
      typeLines.push(`/** ${runtimeModel.description} Trace: ${contract.document_id} ${contract.source_path} */`);
      typeLines.push(`export interface ${runtimeModel.name} {`);
      for (const field of runtimeModel.fields) typeLines.push(`  readonly ${field.name}: ${tsType(field)};`);
      typeLines.push("}", "");

      const schema = {
        $schema: model.json_schema_dialect,
        $id: `https://dbos.local/schemas/${contract.document_id}/${runtimeModel.name}/1.0.0`,
        title: runtimeModel.name,
        description: `${runtimeModel.description} Authoritative source: ${contract.source_path}`,
        ...objectSchema(runtimeModel.fields),
        "x-dbos-trace": {
          contract_id: contract.document_id,
          contract_version: contract.version,
          source_path: contract.source_path,
          invariants: contract.invariants,
          runtime_baseline: model.authority.runtime_baseline,
        },
      };
      schemas.set(runtimeModel.name, schema);

      const positive = buildPositiveFixture(runtimeModel);
      const firstField = runtimeModel.fields[0];
      const expectedKeys = runtimeModel.fields.map((field) => JSON.stringify(field.name)).join(" | ");
      typeFixtureLines.push(`type ${runtimeModel.name}KeysMatch = Assert<Equal<keyof Contracts.${runtimeModel.name}, ${expectedKeys}>>;`);
      typeFixtureLines.push(`export const ${runtimeModel.name}PositiveField: Pick<Contracts.${runtimeModel.name}, ${JSON.stringify(firstField.name)}> = ${JSON.stringify({ [firstField.name]: positive[firstField.name] })};`);
      typeFixtureLines.push("// @ts-expect-error required fields intentionally missing");
      typeFixtureLines.push(`export const ${runtimeModel.name}MissingRequired: Contracts.${runtimeModel.name} = {};`);
      typeFixtureLines.push("// @ts-expect-error wrong primitive type intentionally supplied");
      typeFixtureLines.push(`export const ${runtimeModel.name}WrongType: Pick<Contracts.${runtimeModel.name}, ${JSON.stringify(firstField.name)}> = ${JSON.stringify({ [firstField.name]: wrongValue(firstField) })};`);

      const enumField = runtimeModel.fields.find((field) => Array.isArray(field.enum));
      const versionField = runtimeModel.fields.find((field) => ["contract_version","event_version","model_version","version"].includes(field.name));
      const cases = ["positive", "missing-required", "additional-property", "wrong-type"];
      if (enumField) cases.push("invalid-enum");
      if (versionField) cases.push("unsupported-major");
      fixtures.push({ contract_id: contract.document_id, model: runtimeModel.name, cases });
    }
  }

  const manifest = {
    generator_version: "1.0.0",
    model_version: model.model_version,
    runtime_baseline: model.authority.runtime_baseline,
    contracts: model.contracts.map((contract) => ({
      document_id: contract.document_id,
      source_path: contract.source_path,
      invariants: contract.invariants,
      models: contract.models.map((runtimeModel) => runtimeModel.name),
    })),
    generated_models: [...schemas.keys()].sort(),
  };

  return {
    types: `${typeLines.join("\n")}\n`,
    typeFixtures: `${typeFixtureLines.join("\n")}\n`,
    fixtures: compactJson({ fixture_version: "1.0.0", fixture_plans: fixtures }),
    schemas,
    manifest: compactJson(manifest),
  };
}

export async function writeArtifacts(outputRoot = ROOT) {
  const model = await loadModel(resolve(outputRoot, "packages/contracts/model/contracts.json"));
  const generated = generateArtifacts(model);
  const srcDir = resolve(outputRoot, "packages/contracts/src/generated");
  const schemaDir = resolve(outputRoot, "packages/contracts/schemas");
  const fixtureDir = resolve(outputRoot, "packages/contracts/fixtures");
  await rm(srcDir, { recursive: true, force: true });
  await rm(schemaDir, { recursive: true, force: true });
  await rm(fixtureDir, { recursive: true, force: true });
  await mkdir(srcDir, { recursive: true });
  await mkdir(schemaDir, { recursive: true });
  await mkdir(fixtureDir, { recursive: true });
  await writeFile(resolve(srcDir, "contracts.ts"), generated.types, "utf8");
  await writeFile(resolve(srcDir, "type-fixtures.generated.ts"), generated.typeFixtures, "utf8");
  for (const [name, schema] of generated.schemas) {
    await writeFile(resolve(schemaDir, `${name}.schema.json`), compactJson(schema), "utf8");
  }
  await writeFile(resolve(fixtureDir, "fixtures.generated.json"), generated.fixtures, "utf8");
  await writeFile(resolve(outputRoot, "packages/contracts/generated-manifest.json"), generated.manifest, "utf8");
  return generated;
}

const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) await writeArtifacts(ROOT);
