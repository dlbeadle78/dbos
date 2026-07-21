# Engine Manifest and Load Session Contract

| Field | Value |
|---|---|
| Document ID | DBOS-CTR-008 |
| Status | Approved |
| Contract version | 1.0.0 |
| DBCA authority | ARC-002; ES-006; ADR-004; ADR-010 |

## Purpose

Define how a future engine declares compatibility and receives a bounded runtime session.

## Engine manifest

Required fields are `engine_id`, name, version, publisher/origin, integrity evidence, capability keys, DBCA compatibility, DBOS compatibility, provided interfaces, required interfaces, configuration definitions, requested permissions, input/output contracts, event types, failure semantics, health contract, resource classes and data handling declaration.

## Load session

Required fields are session ID, engine/version, mission/step, capability, permission decision, context package version, evidence boundary, configuration version, allowed interfaces, resource limits, opened/expiry time, health state and close/reconciliation result.

## Invariants

- `DBOS-CTR-008-R1`: every engine version has a distinct immutable manifest.
- `DBOS-CTR-008-R2`: unsupported major interface or DBCA/DBOS version blocks loading.
- `DBOS-CTR-008-R3`: session scope MUST be no broader than the mission step.
- `DBOS-CTR-008-R4`: engine availability does not imply trust, authority or delegation.
- `DBOS-CTR-008-R5`: material version or dependency change triggers new compatibility and trust review.
- `DBOS-CTR-008-R6`: session close MUST reconcile in-flight commands and revoke scoped access.
- `DBOS-CTR-008-R7`: v0.1.0 has no registered domain engine implementation.

## Failure behaviour

Manifest, integrity, compatibility, dependency, permission or health failure prevents a new active session. Existing affected sessions are contained and reviewed; silent fallback is prohibited.

