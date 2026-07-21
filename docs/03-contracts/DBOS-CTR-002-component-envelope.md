# Component Envelope Contract

| Field | Value |
|---|---|
| Document ID | DBOS-CTR-002 |
| Status | Approved |
| Contract version | 1.0.0 |
| DBCA authority | ES-006 |

## Purpose

Define logical command, query and response messages between Kernel subsystems and future engines.

## Request envelope

| Field | Requirement |
|---|---|
| `message_id` | Unique for this envelope |
| `message_type` | `command` or `query` |
| `contract_version` | Supported interface contract version |
| `correlation_id` | Stable end-to-end operation identifier |
| `causation_id` | Message or event that caused this request |
| `mission_id` / `step_id` | Required for mission execution |
| `sender` / `recipient` | Component identity and version |
| `operation` | Registered interface operation |
| `input_refs` | Declared canonical record references |
| `context_package_ref` | Exact permitted context version where needed |
| `evidence_boundary_ref` | Governing source boundary |
| `permission_decision_ref` | Operation-specific allow decision for mutation |
| `deadline_or_stop` | Explicit stopping semantics |
| `idempotency_key` | Required for retriable mutations and side effects |
| `sensitivity` | Handling class for envelope and results |

## Response envelope

The response MUST repeat `message_id`, correlation, mission/step and operation; identify responder and version; and include `status`, `output_refs`, `claims`, `verification_state`, `limitations`, `events`, `side_effects` and `failure_ref` as applicable.

Valid status values are `succeeded`, `succeeded-with-limitations`, `blocked`, `failed` and `cancelled`. Empty output is not failure unless the interface declares that result.

## Invariants

- `DBOS-CTR-002-R1`: recipients MUST reject unsupported major versions before processing.
- `DBOS-CTR-002-R2`: a component MUST read only declared input and context references.
- `DBOS-CTR-002-R3`: a recipient MUST NOT broaden requested scope or authority.
- `DBOS-CTR-002-R4`: identical mutation intent and idempotency key MUST return the original semantic outcome.
- `DBOS-CTR-002-R5`: response status MUST reflect actual execution evidence and limitations.
- `DBOS-CTR-002-R6`: safe diagnostics MUST preserve correlation without exposing unnecessary sensitive content.

## Failure behaviour

Malformed, expired, misrouted, unauthorised, duplicate-conflicting or unsupported envelopes fail before domain mutation. Timeout with uncertain side effect returns `blocked` pending reconciliation.

