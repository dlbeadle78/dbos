# Memory Manager Specification

| Field | Value |
|---|---|
| Document ID | DBOS-KRN-006 |
| Status | Approved |
| Version | 0.1.0 |
| DBCA authority | ENG-001; ARC-008; ARC-009 |

## Purpose

Govern the capture, retention, retrieval, correction and forgetting of durable context without treating remembered information as current evidence.

## Responsibilities

- Admit memory candidates under a declared class, purpose, provenance and retention policy.
- Store stable facts, preferences, constraints, decisions, precedents and unresolved items as distinct types.
- Retrieve candidates by mission relevance, authority, recency and scope.
- Preserve corrections, supersession, expiry and conflicts.
- Apply retention review, access revocation and authorised forgetting.

## Non-responsibilities

Memory Manager does not capture everything, convert one edit into a general rule, verify remembered claims automatically, own source evidence or decide how a mission must act.

## Inputs

`MemoryCandidate`, origin reference, type, scope, purpose, provenance, confidence, effective/expiry time, sensitivity, retention class, authority and correction/forget request.

## Outputs

`MemoryRecord`, admission decision, permission-filtered `MemoryResultSet`, conflict notice, retention outcome, forgetting certificate and memory events.

## Interfaces

| Interface | Behaviour |
|---|---|
| `IF-MEM-01 ProposeMemory` | Validate and admit, reject or quarantine a memory candidate |
| `IF-MEM-02 RetrieveMemory` | Return relevant records with limitations and temporal status |
| `IF-MEM-03 CorrectMemory` | Supersede meaning while retaining audit lineage |
| `IF-MEM-04 ReviewRetention` | Apply expiry, continued need, legal hold and sensitivity rules |
| `IF-MEM-05 ForgetMemory` | Remove content when authorised and preserve minimum proof if required |
| `IF-MEM-06 MarkConflict` | Link incompatible records without inventing resolution |

## State

States are `candidate`, `active`, `restricted`, `disputed`, `expired`, `superseded`, `retention-hold` and `forgotten`. Active records are immutable in meaning. Retrieval results are as-of projections, not copies that acquire new authority.

## Requirements and invariants

- `DBOS-KRN-006-R1`: admission MUST record memory type, purpose, provenance, scope, owner, time, sensitivity and retention basis.
- `DBOS-KRN-006-R2`: user-declared and inferred records MUST retain their evidence type.
- `DBOS-KRN-006-R3`: retrieval MUST NOT represent memory as current proof without verification.
- `DBOS-KRN-006-R4`: a single correction MUST remain local unless approved scope evidence supports a durable rule.
- `DBOS-KRN-006-R5`: material conflict, expiry or source change MUST reduce reliance and surface to Context Manager.
- `DBOS-KRN-006-R6`: forgetting MUST respect authority, retention hold and integrity requirements.
- `DBOS-KRN-006-R7`: sensitive information MUST be minimised and purpose-limited.

## Dependencies

Requires Permissions, Configuration, Timeline, Event Bus and Audit Trail. Supplies references to Context Manager and may receive approved records from Mission Control and Decision Log.

## Future extension points

Semantic retrieval, user-managed memory views and calibrated admission policies MAY be added. Automated learning cannot bypass candidate review, provenance or forgetting controls.

## Failure behaviour

Ambiguous identity, missing provenance, unlawful retention, permission denial, conflict, corruption and incomplete forgetting return typed failures. Retrieval degradation returns labelled partial results; it does not substitute similar but unauthorised records.

## Observability, security and privacy

Admission, sensitive reads, correction, expiry, export and forgetting are audited. Audit records prefer identifiers and policy outcomes over remembered content.

