# State Manager Specification

| Field | Value |
|---|---|
| Document ID | DBOS-KRN-010 |
| Status | Approved |
| Version | 0.1.0 |
| DBCA authority | ES-007; ES-010; ARC-005 |

## Purpose

Provide the sole guarded transition authority for registered Kernel lifecycle models and preserve immutable transition history.

## Responsibilities

- Register versioned state-machine definitions and transition guards.
- Validate current state, expected version, authority and guard evidence.
- Commit one atomic transition and its correlated event or commit neither.
- Reject direct, skipped or stale transitions.
- Provide current and historical state projections.
- Coordinate cancellation, supersession and recovery transitions without changing domain meaning.

## Non-responsibilities

State Manager does not decide domain outcomes, manufacture guard evidence, own the domain record, schedule work or compensate external side effects.

## Inputs

`TransitionRequest`, object type/id, expected state/version, target state, actor, authority reference, guard-evidence references, reason, correlation and idempotency key.

## Outputs

`TransitionRecord`, current state projection, guard evaluation, conflict result, transition event and recovery-required signal.

## Interfaces

| Interface | Behaviour |
|---|---|
| `IF-STA-01 RegisterStateModel` | Admit a versioned lifecycle definition after compatibility review |
| `IF-STA-02 RequestTransition` | Evaluate and atomically commit a permitted transition |
| `IF-STA-03 GetCurrentState` | Return state, version and last transition as of query time |
| `IF-STA-04 GetStateHistory` | Return ordered authorised transition records |
| `IF-STA-05 ValidateTransition` | Evaluate without mutation for planning and readiness |
| `IF-STA-06 ReconcileTransition` | Resolve an uncertain commit before any retry |

## State

State Manager owns registered state models and append-only `TransitionRecord` history. Current state is a deterministic projection of accepted transitions. Terminal records are immutable; any continuation uses a permitted supersession relation.

## Requirements and invariants

- `DBOS-KRN-010-R1`: only registered transitions under the applicable model version MAY commit.
- `DBOS-KRN-010-R2`: every transition MUST validate expected current state, object version, actor authority and all guards.
- `DBOS-KRN-010-R3`: transition record and domain event MUST commit atomically in semantic outcome.
- `DBOS-KRN-010-R4`: duplicate idempotency keys with identical intent MUST return the original result; different intent MUST fail.
- `DBOS-KRN-010-R5`: skipped guards and direct state mutation are critical conformance failures.
- `DBOS-KRN-010-R6`: terminal history MUST NOT be rewritten.
- `DBOS-KRN-010-R7`: an unknown commit result MUST block retry until reconciliation.

## Dependencies

Requires Permissions, Configuration, Event Bus, Timeline and Audit Trail. Every lifecycle-owning subsystem depends on State Manager for mutation.

## Future extension points

Sub-state machines, compensating transition profiles and formal model verification MAY be added. An extension cannot permit an existing forbidden transition without a breaking contract change and ADR.

## Failure behaviour

Unknown model, unsupported version, guard failure, stale state, stale object version, insufficient authority, duplicate-key conflict and commit uncertainty return typed failures. Guard failure leaves state unchanged. Commit uncertainty creates a reconciliation block and audit alert.

## Observability, security and privacy

Every request records actor, prior/target state, model version, guard result and reason. Guard evidence is referenced and permission-filtered.

