# Context Manager Specification

| Field | Value |
|---|---|
| Document ID | DBOS-KRN-005 |
| Status | Approved |
| Version | 0.1.0 |
| DBCA authority | ARC-008; ADR-001; ADR-002 |

## Purpose

Assemble the minimum sufficient, mission-specific context package while preserving authority, provenance, time, conflicts and unknowns.

## Responsibilities

- Accept a declared context requirement and evidence boundary.
- Retrieve authorised references from governing, user-provided, case, project, memory and current mission sources.
- Classify context as governing, user-provided, retrieved evidence, professional, historical, inferred or unknown.
- Rank by relevance while protecting governing and negative constraints.
- Detect conflict, expiry, scope mismatch and missing decisive context.
- Version, invalidate and refresh context packages.

## Non-responsibilities

Context Manager does not turn context into proof, grant authority, retain memory automatically, resolve substantive conflicts or perform professional reasoning.

## Inputs

`ContextRequest`, mission and step references, evidence boundary, authority, required context classes, source references, `as_of` time, size/sensitivity limits and refresh trigger.

## Outputs

`ContextPackage`, `ContextItemRef`, conflict set, exclusion register, unknown register, sufficiency status and context events.

## Interfaces

| Interface | Behaviour |
|---|---|
| `IF-CTX-01 BuildContext` | Assemble a versioned context package for one declared purpose |
| `IF-CTX-02 RefreshContext` | Re-evaluate changed, expired or late-arriving sources |
| `IF-CTX-03 InvalidateContext` | Mark a package unsafe for new reliance and state why |
| `IF-CTX-04 GetContextItem` | Resolve an authorised reference without broadening the package |
| `IF-CTX-05 AssessSufficiency` | Report required, present, excluded, conflicting and unknown context |

## State

Package states are `building`, `valid`, `limited`, `conflicted`, `stale`, `invalidated` and `superseded`. A package is immutable after publication; refresh creates a new version and preserves prior mission reliance.

## Requirements and invariants

- `DBOS-KRN-005-R1`: each item MUST retain source, class, scope, effective time, recorded time, confidence and verification state where applicable.
- `DBOS-KRN-005-R2`: governing context and explicit prohibitions MUST have protected priority.
- `DBOS-KRN-005-R3`: undeclared or inaccessible context MUST NOT be read implicitly.
- `DBOS-KRN-005-R4`: conflict MUST surface and MUST NOT be resolved by rank alone.
- `DBOS-KRN-005-R5`: summaries MUST preserve material qualifiers, exclusions, decisions and unknowns.
- `DBOS-KRN-005-R6`: material time, scope, source or component-version change MUST invalidate or refresh affected packages.
- `DBOS-KRN-005-R7`: minimum necessary context and personal-data minimisation MUST apply before delivery.

## Dependencies

Requires Permissions, Configuration, Memory Manager, Timeline, Event Bus and Audit Trail. Reads governed references from Mission Control, Workspace, Case File, Project and Decision Log.

## Future extension points

Retrieval ranking, context-budget policies and domain profiles MAY be added after missed-context and irrelevant-context evidence exists. Extensions cannot displace governing rules or conceal exclusions.

## Failure behaviour

Missing decisive context returns `limited` or `blocked` according to the request contract. Inaccessible content remains an explicit exclusion. Retrieval failure preserves available items and names affected sources; stale packages cannot serve new high-impact steps.

## Observability, security and privacy

Package construction records source references, inclusion/exclusion reasons, redaction and version without copying private hidden reasoning or unnecessary source text.

