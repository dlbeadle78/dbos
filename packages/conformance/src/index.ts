export const CONFORMANCE_STATUSES = [
  "passed",
  "failed",
  "not-implemented",
  "approved-exception",
] as const;

export type ConformanceStatus = (typeof CONFORMANCE_STATUSES)[number];

export interface ConformanceResult {
  readonly behaviour_id: string;
  readonly status: ConformanceStatus;
  readonly contract_id: string | null;
  readonly model: string | null;
  readonly evidence: readonly string[];
  readonly reason: string;
  readonly approved_exception_ref: string | null;
}

export interface ConformanceReport {
  readonly report_version: "1.0.0";
  readonly runtime_baseline: "5ee2a994889e6c6fe26f5782c3eea28ae003cce6";
  readonly generated_at: string;
  readonly results: readonly ConformanceResult[];
  readonly summary: Readonly<Record<ConformanceStatus, number>>;
}
