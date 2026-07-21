# Kernel Interface Catalogue

| Field | Value |
|---|---|
| Document ID | DBOS-IF-001 |
| Status | Approved |
| Version | 0.1.0 |
| Dependencies | DBOS-CTR-001–008; DBOS-KRN-001–016 |

## Purpose

Define the common preconditions, postconditions and failure semantics for every named subsystem interface.

## Common operation rules

All interfaces use `DBOS-CTR-002`. Mutations require an `allow` decision under `DBOS-CTR-004`, expected version, state guard where applicable and idempotency key. Successful mutation returns a canonical record reference, committed event reference and audit receipt. Queries require declared purpose, permission and `as_of` time and return source versions and limitations.

## Control and work interfaces

| Prefix | Owner | Primary input | Primary output | Mandatory precondition | Failure families |
|---|---|---|---|---|---|
| `IF-MC` | Mission Control | Mission request/record | Plan, command, outcome | Outcome or exact admission gap | input, evidence, authority, acceptance |
| `IF-WS` | Workspace Manager | Workspace/membership request | Workspace record/view | Owner and permitted scope | authority, state, consistency |
| `IF-CF` | Case File Manager | Case/entry request | Case record/manifest | Purpose, provenance, retention class | evidence, security, consistency |
| `IF-PRJ` | Project Manager | Project/baseline request | Project record/status | Outcome, scope, owner, acceptance | input, dependency, state |
| `IF-CTX` | Context Manager | Context request | Context package | Evidence boundary and declared purpose | evidence, authority, dependency |
| `IF-MEM` | Memory Manager | Memory candidate/query | Memory record/result set | Purpose, provenance and retention basis | evidence, security, consistency |
| `IF-DEC` | Decision Log | Decision proposal/result | Decision record/view | Named decision owner and authority | authority, evidence, state |
| `IF-TSK` | Task Manager | Task/lifecycle request | Task record/result | Parent outcome, owner and acceptance | dependency, state, side-effect |

## Runtime and infrastructure interfaces

| Prefix | Owner | Primary input | Primary output | Mandatory precondition | Failure families |
|---|---|---|---|---|---|
| `IF-TIM` | Timeline | Temporal entry/query | Temporal record/projection | Source and explicit timezone or unknown | input, consistency |
| `IF-STA` | State Manager | Transition request | Transition record | Registered model, expected state/version | state, authority, consistency |
| `IF-ENG` | Engine Loader | Manifest/session request | Registration/session | Compatibility, integrity, permission | capability, security, dependency |
| `IF-PER` | Permissions | Grant/evaluation request | Permission decision | Resolved actor or explicit indeterminate | authority, security, consistency |
| `IF-CFG` | Configuration | Definition/version request | Effective configuration | Owner, schema, impact and authority | input, dependency, consistency |
| `IF-EVT` | Event Bus | Event/subscription | Receipt/delivery state | Valid producer and event contract | input, security, dependency |
| `IF-NOT` | Notification System | Eligible event/rule | Notification record/status | Recipient, channel and authority as applicable | authority, dependency, side-effect |
| `IF-AUD` | Audit Trail | Audit record/query | Receipt/view/integrity result | Material action record or query purpose | security, consistency, dependency |

## Postconditions

- Accepted mutations are observable through owner state and an immutable event.
- Rejected mutations leave owner state unchanged.
- Partial outcomes name completed and outstanding effects.
- Unknown side effects return blocked and require reconciliation.
- Query filtering never implies that an omitted inaccessible record does not exist.

## Compatibility

Consumers MUST declare supported interface major versions. Additive optional outputs MAY be ignored only when doing so cannot weaken authority, evidence, state, privacy or failure handling.

