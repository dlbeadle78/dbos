import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { ROOT, loadModel } from "./lib/model.mjs";
import { stableJson } from "./lib/stable-json.mjs";

const model = await loadModel();
const entries = [];
for (const contract of model.contracts) {
  const markdown = await readFile(resolve(ROOT, contract.source_path), "utf8");
  if (!markdown.includes(contract.document_id)) throw new Error(`${contract.document_id} missing from ${contract.source_path}`);
  for (const invariant of contract.invariants) {
    if (!markdown.includes(invariant)) throw new Error(`${invariant} missing from authoritative Markdown`);
    entries.push({
      trace_id: invariant,
      contract_id: contract.document_id,
      source_path: contract.source_path,
      implementation_status: "not-implemented",
      reason: "Stage one provides structural mirrors only; semantic invariants require later pure validators, state tests or repository constraints.",
    });
  }
}
const report = {
  report_version: "1.0.0",
  runtime_baseline: model.authority.runtime_baseline,
  markdown_authoritative: true,
  contracts: model.contracts.length,
  models: model.contracts.flatMap((contract) => contract.models).length,
  invariants: entries,
};
await mkdir(resolve(ROOT, "reports"), { recursive: true });
await writeFile(resolve(ROOT, "reports/traceability.json"), stableJson(report), "utf8");
console.log(`Traceability verified for ${entries.length} invariants.`);
