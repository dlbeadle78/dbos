# Task Manager Specification

| Field | Value |
|---|---|
| Document ID | DBOS-KRN-008 |
| Status | Approved |
| Version | 0.1.0 |
| DBCA authority | ARC-003; ARC-010; ES-001 |

## Purpose

Represent executable and non-executable units of work, their dependencies, ownership, acceptance and recovery state.

## Responsibilities

- Create versioned tasks linked to a mission or project outcome.
- Define owner, action class, dependencies, inputs, outputs, authority and acceptance.
- Validate readiness and dependency order.
- Record progress, blockers, result references and cancellation.
- Preserve retry, compensation and idempotency semantics for side-effecting work.

## Non-responsibilities

Task Manager does not execute tasks, grant authority, choose professional outcomes, set mission state or infer task completion from elapsed time.

## Inputs

`TaskRequest`, parent mission/project, owner, dependencies, input/output contracts, acceptance conditions, authority reference, temporal constraints, retry policy, result and lifecycle request.

## Outputs

`TaskRecord`, readiness result, dependency graph, task projection, blocker record, result reference and task events.

## Interfaces

| Interface | Behaviour |
|---|---|
| `IF-TSK-01 CreateTask` | Create a planned task with explicit parent and acceptance |
| `IF-TSK-02 ValidateReadiness` | Check dependencies, state, inputs, authority and capability availability |
| `IF-TSK-03 StartTask` | Apply guarded transition and issue correlation-ready execution record |
| `IF-TSK-04 ReportProgress` | Append evidence-backed progress without changing acceptance |
| `IF-TSK-05 CompleteTask` | Record result only when task acceptance and side effects reconcile |
| `IF-TSK-06 BlockTask` | Record exact blocker, owner and recovery condition |
| `IF-TSK-07 CancelTask` | Stop new work and reconcile in-flight effects |

## State

States are `proposed`, `planned`, `ready`, `in-progress`, `awaiting-human`, `blocked`, `verifying`, `completed`, `cancelled` and `superseded`. Completed and cancelled versions are immutable. Retry may create an attempt record under the same task where the semantic operation and idempotency key remain unchanged.

## Requirements and invariants

- `DBOS-KRN-008-R1`: every task MUST identify parent outcome, owner, acceptance, authority class and expected output.
- `DBOS-KRN-008-R2`: dependency graphs MUST be acyclic and readiness MUST validate all mandatory predecessors.
- `DBOS-KRN-008-R3`: side-effecting tasks MUST declare idempotency, confirmation and reconciliation behaviour.
- `DBOS-KRN-008-R4`: progress MUST be evidence-backed and MUST NOT equal acceptance.
- `DBOS-KRN-008-R5`: completion MUST require output presence, acceptance evidence and side-effect status.
- `DBOS-KRN-008-R6`: failure MUST stop dependent tasks but MUST NOT erase independent verified work.
- `DBOS-KRN-008-R7`: scope change MUST supersede the task definition or create a new version before execution.

## Dependencies

Requires State Manager, Permissions, Timeline, Configuration, Event Bus and Audit Trail. Receives plans from Mission Control and Project Manager; references Engine Loader readiness.

## Future extension points

Recurring tasks, resource estimates, batching and scheduling optimisation MAY be added. They cannot weaken ownership, readiness, acceptance or authority rules.

## Failure behaviour

Circular dependency, missing owner, invalid acceptance, stale state, insufficient authority, unavailable capability and uncertain side effect return typed failures. Non-idempotent unknown outcomes block retry until reconciled.

## Observability, security and privacy

Transitions, attempts, blockers, authority decisions, side effects and completion evidence are evented and audited. Progress views state source and recorded time.

