import { readFile, readdir } from "node:fs/promises";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { ROOT } from "./lib/model.mjs";

export async function checkBoundaries(root = ROOT) {
  const policy = JSON.parse(await readFile(resolve(root, "architecture/package-boundaries.json"), "utf8"));
  const violations = [];
  const packages = Object.entries(policy.packages);
  for (const [packageName, config] of packages) {
    const packageRoot = resolve(root, config.path);
    const sourceRoot = resolve(packageRoot, "src");
    const files = await readdir(sourceRoot, { recursive: true, withFileTypes: true });
    for (const entry of files) {
      if (!entry.isFile() || !entry.name.endsWith(".ts")) continue;
      const path = resolve(entry.parentPath, entry.name);
      const text = await readFile(path, "utf8");
      const imports = [...text.matchAll(/(?:from\s+|import\s*\()(["'])([^"']+)\1/gu)].map((match) => match[2]);
      for (const specifier of imports) {
        if (specifier.startsWith("@dbos/")) {
          const target = specifier.split("/").slice(0, 2).join("/");
          if (specifier !== target) violations.push(`${relative(root, path)} deep-imports ${specifier}`);
          if (target !== packageName && !config.may_import.includes(target)) {
            violations.push(`${packageName} may not import ${target}`);
          }
        }
        if (specifier.startsWith("../") && resolve(dirname(path), specifier).startsWith(resolve(root, "packages")) && !resolve(dirname(path), specifier).startsWith(packageRoot)) {
          violations.push(`${relative(root, path)} crosses package boundary using ${specifier}`);
        }
      }
    }
  }
  if (violations.length > 0) throw new Error(`Package-boundary violations:\n${violations.join("\n")}`);
  return { packages_checked: packages.length, violations: 0 };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  console.log(await checkBoundaries());
}
