import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { ROOT } from "./lib/model.mjs";
const policy = JSON.parse(await readFile(resolve(ROOT, "architecture/dependency-policy.json"), "utf8"));
const inventory = JSON.parse(await readFile(resolve(ROOT, "reports/dependency-inventory.json"), "utf8"));
const rejected = inventory.dependencies.filter((entry) => !entry.private && !policy.approved_licences.includes(entry.licence));
if (rejected.length) throw new Error(`Unapproved licences: ${rejected.map((entry) => `${entry.name}:${entry.licence}`).join(", ")}`);
console.log("Licence policy check passed.");
