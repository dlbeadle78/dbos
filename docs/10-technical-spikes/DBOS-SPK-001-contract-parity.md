# DBOS-SPK-001: Contract Generation Parity

| Field | Value |
|---|---|
| Status | Completed |
| Result | Pass |
| Execution date | 2026-07-21 |
| DBOS baseline | v0.1.0 at `d142b25c361e809c90edca74013d2bb13b6f5065` |
| Governing decisions | DBOS-ADR-009; DBOS-ADR-010 |
| Environment | Node.js 24.14.0; TypeScript 7.0.2; Ajv 8.20.0 |
| Repository impact | Documentation only; disposable harness and outputs excluded |

## Objective

Determine whether every DBOS semantic contract can be represented by one canonical generation model that emits strict TypeScript declarations and JSON Schema 2020-12 validators without structural disagreement.

This spike proves generation parity and contract coverage. It does not claim that schemas alone enforce behavioural invariants, authority, state transitions or recovery semantics.

## Scope

The authoritative sources were DBOS-CTR-001 through DBOS-CTR-008. The spike covered every named record or envelope in those documents, all declared required fields, enumerated values, explicit-null boundaries and closed-object behaviour.

The disposable harness generated both TypeScript and JSON Schema from the same in-memory contract model. Generated output was not copied into DBOS because production contract code remains prohibited.

## Method

1. Read the eight approved Markdown contracts from the frozen v0.1.0 baseline.
2. Inventory each named record, envelope, request, response, model and session.
3. Represent required fields and closed enumerations in a disposable neutral model.
4. Generate one strict TypeScript interface and one JSON Schema 2020-12 schema per runtime model.
5. Compile positive TypeScript fixtures and assert expected compile failures for missing required fields and incorrect primitive types.
6. Validate positive and negative fixtures using Ajv with strict and all-error modes.
7. Reject additional undeclared properties at runtime.
8. Verify that all 51 published invariant identifiers and all eight failure-behaviour sections remain present in the authoritative source.
9. Hash disposable generated artefacts and result evidence before deletion or expiry.

## Contract coverage

| Contract | Generated models | Required fields represented | Published invariants accounted for |
|---|---|---:|---:|
| DBOS-CTR-001 | `CanonicalRecord` | 15 | 6 |
| DBOS-CTR-002 | `ComponentRequest`, `ComponentResponse` | 32 | 6 |
| DBOS-CTR-003 | `EventEnvelope` | 18 | 7 |
| DBOS-CTR-004 | `AuthorityGrant`, `PermissionRequest`, `PermissionDecision` | 41 | 6 |
| DBOS-CTR-005 | `StateModel`, `TransitionRequest`, `TransitionRecord` | 38 | 6 |
| DBOS-CTR-006 | `FailureRecord`, `RecoveryRecord` | 30 | 6 |
| DBOS-CTR-007 | `EvidenceBoundary`, `TemporalAssertion` | 21 | 7 |
| DBOS-CTR-008 | `EngineManifest`, `LoadSession` | 35 | 7 |
| **Total** | **16 models** | **230 required-field representations** | **51 invariants** |

Fields described as applicable or unknown were represented explicitly through nullable values rather than being silently omitted. This follows DBOS-CTR-001-R3 and prevents absence from being interpreted as inferred truth.

## Evidence results

| Evidence | Result |
|---|---:|
| Semantic contracts represented | 8 of 8 |
| Generated runtime models | 16 |
| JSON Schema 2020-12 documents generated | 16 |
| Runtime fixtures executed | 70 |
| Runtime fixtures matching expected acceptance/rejection | 70 |
| Strict TypeScript compilation | Pass |
| Expected TypeScript negative cases recognised | Pass |
| Published invariant identifiers accounted for | 51 of 51 |
| Failure-behaviour sections accounted for | 8 of 8 |

Runtime negative fixtures covered missing mandatory fields, additional undeclared properties, incorrect primitive types and invalid enumerated values where applicable.

Key disposable evidence digests:

| Artefact | SHA-256 |
|---|---|
| Generated TypeScript declarations | `7abfcdc462cd58594049b224c3184e55c0ac6a7bd8fe83b59b7be1a242d009fc` |
| Runtime fixture results | `9717151b082790ce66485c2d76d2febbb6c1521a6a6c14990ac475105e1bc805` |

The individual 16 schema digests were also recorded during execution. The digest identifies the disposable evidence but does not promote it to a DBOS contract.

## Findings

### Finding 1: one-source generation is viable

All TypeScript and JSON Schema shapes were generated from the same model. This eliminates manual field duplication between the two implementation formats and makes structural drift detectable.

### Finding 2: closed runtime validation is required

TypeScript cannot validate persisted or externally supplied data. JSON Schema with `additionalProperties: false`, explicit required fields and closed enumerations correctly rejected all tested malformed shapes.

### Finding 3: semantic invariants need a separate executable layer

Rules such as stable identity, owner authority, monotonic sequence, exact idempotent outcome, temporal overlap and unknown-side-effect recovery are not field-shape rules. They require pure semantic validators, state-model tests or repository constraints. Generating a schema must never be reported as behavioural conformance.

### Finding 4: Markdown remains authoritative

The spike confirmed that generated types and schemas can mirror the contract documents. It did not identify a reason to reverse the authority direction. DBCA and DBOS Markdown remain controlling.

## Required generation controls

The implementation SHALL:

- maintain a machine-readable canonical model with explicit trace links to DBOS document, rule and field identifiers;
- generate TypeScript and JSON Schema in one deterministic command;
- prohibit manual edits to generated outputs;
- use JSON Schema 2020-12 and strict Ajv validation;
- reject undeclared properties by default;
- generate positive and negative fixtures for every model;
- run semantic validators separately from shape validation;
- fail CI when regenerated output differs from committed output; and
- report unimplemented invariants rather than treating them as schema passes.

## Limitations

- The disposable field model used representative object shapes for nested scopes and references. Production schemas must define those nested structures fully.
- The spike did not test schema migration between contract versions because v1.0.0 is the only current version.
- Compile-time negative tests cover structural typing, not runtime provenance or authority.
- No generated artefact is approved for direct promotion into production packages.

## Recommendation

Adopt a single-source contract-generation pipeline using pinned TypeScript 7.0.2 and Ajv 8.20.0 for the initial implementation slice. Treat these exact versions as spike selections subject to normal dependency review and lockfile controls.

SPK-01 satisfies its pass condition. Production implementation must recreate the generator through reviewed commits, expand nested schemas, and map every semantic invariant to an executable validator or test before claiming contract conformance.
