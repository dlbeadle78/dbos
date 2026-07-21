# Temporal and Evidence Boundary Contract

| Field | Value |
|---|---|
| Document ID | DBOS-CTR-007 |
| Status | Approved |
| Contract version | 1.0.0 |
| DBCA authority | ADR-001; ADR-002; ARC-008; ARC-009 |

## Purpose

Ensure every mission and material projection states what sources it can rely on and when those sources apply.

## Evidence boundary

Required fields are `boundary_id`, mission/scope, included sources, inaccessible sources, provenance types, source versions, retrieval/verification state, recency, material gaps, known conflicts, general-knowledge allowance, created time and supersession.

## Temporal assertion

Required fields are assertion reference, temporal type (`event`, `effective`, `recorded`, `verified`, `expiry`), instant or interval, timezone, precision, source, confidence and `unknown` reason where needed.

## Invariants

- `DBOS-CTR-007-R1`: claims and actions MUST remain within the active evidence boundary.
- `DBOS-CTR-007-R2`: user-declared reality is usable but retains its provenance.
- `DBOS-CTR-007-R3`: unavailable sources and material gaps MUST be explicit.
- `DBOS-CTR-007-R4`: changed source, version, time or verification state MUST trigger affected-result review.
- `DBOS-CTR-007-R5`: plans and future commitments MUST not be represented as current fact.
- `DBOS-CTR-007-R6`: relative time MUST resolve against explicit date and timezone.
- `DBOS-CTR-007-R7`: conflicting assertions coexist until authorised resolution.

## Failure behaviour

Missing decisive source or time produces `limited` or `blocked` according to the caller's acceptance requirement. General knowledge cannot fill a case-evidence gap silently.

