export type CompatibilityDecision =
  | Readonly<{ compatible: true; reason: "supported-major-and-minor" }>
  | Readonly<{ compatible: false; reason: "malformed-version" | "unsupported-major" | "unsupported-minor" }>;

const SEMVER = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/u;

export function decideCompatibility(candidate: string, supported = "1.0.0"): CompatibilityDecision {
  const candidateMatch = SEMVER.exec(candidate);
  const supportedMatch = SEMVER.exec(supported);
  if (candidateMatch === null || supportedMatch === null) {
    return { compatible: false, reason: "malformed-version" };
  }
  const candidateMajor = Number(candidateMatch[1]);
  const candidateMinor = Number(candidateMatch[2]);
  const supportedMajor = Number(supportedMatch[1]);
  const supportedMinor = Number(supportedMatch[2]);
  if (candidateMajor !== supportedMajor) {
    return { compatible: false, reason: "unsupported-major" };
  }
  if (candidateMinor > supportedMinor) {
    return { compatible: false, reason: "unsupported-minor" };
  }
  return { compatible: true, reason: "supported-major-and-minor" };
}
