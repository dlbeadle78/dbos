# DBOS Conformance Manifest

| Field | Value |
|---|---|
| Document ID | DBOS-GOV-002 |
| Status | Approved |
| DBOS version | 0.1.0 |
| DBCA baseline | v1.0.0 |
| DBCA commit | `035377ca6e5b72bb732d59bc9b528bf337a0c274` |
| Declaration date | 2026-07-21 |

## Conformance declaration

DBOS v0.1.0 is engineered against DBCA v1.0.0. The following DBCA authorities are normative for this release:

1. DBCA Constitution and Engineering Principles.
2. ADR-001 to ADR-010, particularly mission-centred architecture, contract-driven engineering and DBCA/DBOS separation.
3. Architecture documents ARC-001 to ARC-011 where applicable to Kernel coordination, context, objects, time and portfolio work.
4. Mission, evidence, authority, output and component-interface contracts.
5. Mission state, failure recovery, observability and behaviour-test specifications.

## Dependency rules

- `DBOS-GOV-002-R1`: DBOS MUST NOT redefine or weaken a DBCA constitutional rule.
- `DBOS-GOV-002-R2`: DBOS MAY specialise DBCA semantics only where the specialisation remains compatible and traceable.
- `DBOS-GOV-002-R3`: conflicts MUST resolve in favour of DBCA until an authorised DBCA amendment is adopted.
- `DBOS-GOV-002-R4`: a future DBCA baseline change requires impact analysis, contract compatibility review, ADR and trust revalidation planning.
- `DBOS-GOV-002-R5`: DBCA source text MUST be referenced rather than copied into DBOS as a competing source of truth.

## Conformance evidence

Conformance is evidenced by the release traceability matrix, requirement catalogue, behavioural catalogue and validation report in `docs/08-assurance/`.

