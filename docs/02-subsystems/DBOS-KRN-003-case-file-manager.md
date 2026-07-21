# Case File Manager Specification

| Field | Value |
|---|---|
| Document ID | DBOS-KRN-003 |
| Status | Approved |
| Version | 0.1.0 |
| DBCA authority | ARC-004; ARC-005; ADR-001; ADR-002 |

## Purpose

Maintain the governed record of a bounded case, its source material, claims, artefacts and chronology while preserving provenance and historical versions.

## Responsibilities

- Create a case identity, purpose, owner, evidence boundary and retention class.
- Register evidence and artefact references with provenance, effective time and verification state.
- Preserve competing or disputed assertions without silent resolution.
- Produce permission-filtered case views and manifests.
- Seal, reopen through a new version, supersede and dispose only under explicit policy and authority.

## Non-responsibilities

The subsystem does not judge evidence, decide professional outcomes, copy external system records without need, infer missing facts or treat a case file as a complete world view.

## Inputs

`CaseFileRequest`, subject references, evidence or artefact references, provenance records, classification, retention policy, authority, dispute/correction and lifecycle request.

## Outputs

`CaseFileRecord`, `CaseManifest`, `CaseEntry`, `CaseView`, conflict notice, integrity result, lifecycle event and disposal certificate.

## Interfaces

| Interface | Behaviour |
|---|---|
| `IF-CF-01 OpenCaseFile` | Create a case with explicit purpose and evidence boundary |
| `IF-CF-02 RegisterCaseEntry` | Append a versioned reference and provenance without judging it |
| `IF-CF-03 CorrectCaseEntry` | Supersede an erroneous entry while preserving lineage |
| `IF-CF-04 MarkDispute` | Record unresolved conflict between assertions or sources |
| `IF-CF-05 GetCaseView` | Return minimum-necessary, permission-filtered content as of a stated time |
| `IF-CF-06 SealCaseFile` | Prevent ordinary additions after completeness and retention checks |
| `IF-CF-07 DisposeCaseFile` | Apply authorised retention outcome with recorded proof |

## State

Case states are `open`, `restricted`, `sealed`, `superseded`, `retention-hold` and `disposed`. Entries are append-only in meaning and may be `current`, `superseded`, `disputed`, `withdrawn` or `expired`. Disposal preserves a minimal non-sensitive certificate where policy requires it.

## Requirements and invariants

- `DBOS-KRN-003-R1`: every case entry MUST retain source, provenance type, recorded time, effective time if known and verification state.
- `DBOS-KRN-003-R2`: user-declared information MUST remain labelled until independently verified.
- `DBOS-KRN-003-R3`: conflicting assertions MUST coexist and surface as conflict.
- `DBOS-KRN-003-R4`: absence of an entry MUST NOT be represented as evidence of absence.
- `DBOS-KRN-003-R5`: correction MUST preserve the superseded record and reason.
- `DBOS-KRN-003-R6`: sealing and disposal MUST require explicit authority, retention checks and audit evidence.
- `DBOS-KRN-003-R7`: views MUST enforce purpose limitation and minimum necessary disclosure.

## Dependencies

Requires Permissions, State Manager, Timeline, Configuration, Event Bus and Audit Trail. Supplies references to Context Manager, Mission Control and Decision Log.

## Future extension points

Domain-specific case profiles, legal holds, integrity manifests and external source adapters MAY extend the contract. They cannot introduce domain judgement or erase provenance.

## Failure behaviour

Missing provenance, identity ambiguity, duplicate entry, classification conflict, stale version, retention conflict, unauthorised access and integrity failure block mutation. Unreadable referenced evidence remains registered as unavailable with its prior metadata; it is never silently dropped.

## Observability, security and privacy

All reads of restricted material, entry mutations, exports, seals, holds and disposal are audited. Views use references and redaction to minimise copied sensitive content.

