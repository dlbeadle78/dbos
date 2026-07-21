# State Transition Contract

| Field | Value |
|---|---|
| Document ID | DBOS-CTR-005 |
| Status | Approved |
| Contract version | 1.0.0 |
| DBCA authority | ES-007; ES-010 |

## Purpose

Define registered state models, guarded transitions and atomic transition records.

## State model

A model contains `model_id`, semantic version, object type, states, initial state, terminal states, permitted transitions, guard definitions, required authority classes and supersession policy.

## Transition request

Required fields are object ID/type/version, model/version, expected current state, target state, actor, permission decision, guard-evidence references, reason, event time, correlation and idempotency key.

## Transition record

Required fields are transition ID, request reference, prior/target state, prior/new object version, evaluated guards and results, actor, authority, event/recorded time, reason and committed event reference.

## Invariants

- `DBOS-CTR-005-R1`: transition and event commit together in semantic outcome.
- `DBOS-CTR-005-R2`: all guards MUST pass against the expected version.
- `DBOS-CTR-005-R3`: no operation MAY skip intermediate mandatory states.
- `DBOS-CTR-005-R4`: terminal history is immutable.
- `DBOS-CTR-005-R5`: duplicate identical intent is idempotent; key reuse for different intent fails.
- `DBOS-CTR-005-R6`: model version changes require compatibility and active-object impact review.

## Failure behaviour

Guard, authority, version or state conflict leaves state unchanged. Unknown commit result creates reconciliation state and blocks retry.

