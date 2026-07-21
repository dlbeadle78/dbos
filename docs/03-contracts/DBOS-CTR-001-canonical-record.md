# Canonical Record Contract

| Field | Value |
|---|---|
| Document ID | DBOS-CTR-001 |
| Status | Approved |
| Contract version | 1.0.0 |
| DBCA authority | ARC-005; ADR-007 |

## Purpose

Define the identity, version, ownership, time and provenance carried by every material Kernel record.

## Required fields

| Field | Meaning |
|---|---|
| `record_id` | Stable opaque identifier that does not encode mutable meaning |
| `record_type` | Registered semantic record type |
| `contract_version` | Version governing interpretation |
| `record_version` | Monotonic version within the stable identity |
| `owner` | Subsystem or authorised human owning meaning and mutation |
| `lifecycle_state` | State under a registered model |
| `created_at` | Recorded instant and timezone |
| `updated_at` | Latest recorded mutation instant |
| `effective_interval` | Real-world validity when applicable, or explicit unknown |
| `origin_ref` | Actor, component or source that originated the record |
| `provenance_type` | Governing, verified-evidence, user-declared, inferred, generated or unknown |
| `mission_id` | Governing mission when the record is mission-scoped |
| `correlation_id` | End-to-end operation correlation |
| `sensitivity` | Declared access and handling class |
| `supersedes` | Prior version or record identity where meaning changes |

## Invariants

- `DBOS-CTR-001-R1`: identity MUST remain stable across non-semantic updates.
- `DBOS-CTR-001-R2`: meaning-changing correction MUST create a new version and preserve superseded state.
- `DBOS-CTR-001-R3`: missing origin, time or provenance MUST be explicit, never inferred silently.
- `DBOS-CTR-001-R4`: one subsystem MUST own mutable meaning for each record type.
- `DBOS-CTR-001-R5`: read projections MUST identify source record versions and `as_of` time.
- `DBOS-CTR-001-R6`: absence of a record MUST NOT be interpreted as proof of real-world absence.

## Failure behaviour

Invalid identity, duplicate version, owner mismatch, unsupported contract, temporal inconsistency and missing mandatory provenance reject the mutation. Existing accepted versions remain unchanged.

