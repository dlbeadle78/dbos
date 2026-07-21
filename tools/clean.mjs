import { rm } from "node:fs/promises";
for (const path of ["packages/contracts/dist","packages/conformance/dist","coverage",".tmp"]) {
  await rm(path, { recursive: true, force: true });
}
