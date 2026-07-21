import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

export const ROOT = resolve(new URL("../../", import.meta.url).pathname);
export const MODEL_PATH = resolve(ROOT, "packages/contracts/model/contracts.json");

function expandField(tuple) {
  const [name, kind, rawOptions = {}] = tuple;
  const options = { ...rawOptions };
  if (Array.isArray(options.properties)) {
    options.properties = options.properties.map(expandField);
  }
  if (options.items?.kind === "object" && Array.isArray(options.items.properties)) {
    options.items = { ...options.items, properties: options.items.properties.map(expandField) };
  }
  return { name, kind, required: true, nullable: false, ...options };
}

export async function loadModel(path = MODEL_PATH) {
  const compact = JSON.parse(await readFile(path, "utf8"));
  const value = {
    ...compact,
    contracts: compact.contracts.map((contract) => ({
      ...contract,
      models: contract.models.map((model) => ({
        ...model,
        fields: model.fields.map(expandField),
      })),
    })),
  };
  assertModel(value);
  return value;
}

function assertModel(value) {
  if (value === null || typeof value !== "object" || !Array.isArray(value.contracts)) {
    throw new TypeError("Contract model must contain a contracts array.");
  }
  const names = new Set();
  for (const contract of value.contracts) {
    if (typeof contract.document_id !== "string" || typeof contract.source_path !== "string") {
      throw new TypeError("Each contract requires document_id and source_path.");
    }
    for (const model of contract.models ?? []) {
      if (names.has(model.name)) throw new Error(`Duplicate model name: ${model.name}`);
      names.add(model.name);
      if (!Array.isArray(model.fields) || model.fields.length === 0) {
        throw new Error(`Model ${model.name} has no fields.`);
      }
    }
  }
}
