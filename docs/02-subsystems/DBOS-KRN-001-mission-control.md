# Mission Control Specification

| Field | Value |
|---|---|
| Document ID | DBOS-KRN-001 |
| Status | Approved |
| Version | 0.1.0 |
| DBCA authority | ARC-003; ES-001; CTR-001; ES-007 |

## Purpose

Provide the single accountable coordinator for admitting, planning, monitoring, verifying and closing missions.

## Responsibilities

- Capture intended outcome, scope, acceptance conditions and owner.
- Establish evidence boundary, authority envelope, risk and impact before planning.
- Select applicable Kernel services and future engines through declared contracts.
- Produce versioned, dependency-aware mission plans and quality gates.
- Issue authorised commands, monitor stopping conditions and request the minimum human decision.
- Verify acceptance, reconcile side effects and record complete, blocked, cancelled or superseded outcomes.

## Non-responsibilities

Mission Control does not perform domain reasoning, mutate lifecycle state directly, grant its own authority, store copied evidence or treat technical access as permission.

## Inputs

| Input | Required semantics |
|---|---|
| `MissionRequest` | Requested outcome, requester, time, scope and supplied constraints |
| `ContextPackageRef` | Governing, user-provided, evidence, historical and unknown context |
| `AuthorityEnvelopeRef` | Current grants and explicit prohibitions |
| `PortfolioConstraintSet` | Relevant project, deadline, dependency and priority constraints |
| `CapabilityCatalogueRef` | Compatible Kernel services and registered engines |

## Outputs

`MissionRecord`, `MissionPlan`, `ComponentCommand`, `HumanDecisionRequest`, `AcceptanceRecord`, `MissionOutcome` and mission lifecycle events.

## Interfaces

| Interface | Behaviour |
|---|---|
| `IF-MC-01 AdmitMission` | Validate request and create an admitted mission or typed admission failure |
| `IF-MC-02 PlanMission` | Produce a new immutable plan version with gates and dependencies |
| `IF-MC-03 AuthoriseStep` | Confirm state, permission, context and capability readiness before command |
| `IF-MC-04 ReportStepResult` | Reconcile result, side effects, failures and dependent work |
| `IF-MC-05 VerifyMission` | Evaluate mandatory acceptance conditions using referenced evidence |
| `IF-MC-06 CloseMission` | Record a terminal outcome through guarded state transition |
| `IF-MC-07 AssessLateEvidence` | Identify affected decisions and create supersession or follow-up work |

## State

Mission Control owns the versioned `MissionRecord`, current `MissionPlan` reference, acceptance register, risks and unresolved unknowns. State Manager owns lifecycle transitions. Terminal mission records are immutable; replacement work creates a superseding mission relationship.

## Requirements and invariants

- `DBOS-KRN-001-R1`: admission MUST fail when no intended outcome can be established.
- `DBOS-KRN-001-R2`: planning MUST establish evidence boundary, authority, acceptance conditions, impact and reversibility.
- `DBOS-KRN-001-R3`: every command MUST contain mission, step, component version, input references, authority, stop condition and idempotency key where applicable.
- `DBOS-KRN-001-R4`: Mission Control MUST NOT bypass State Manager transition guards.
- `DBOS-KRN-001-R5`: scope expansion MUST create a plan revision and renewed authority check.
- `DBOS-KRN-001-R6`: completion MUST require all mandatory acceptance conditions and side-effect reconciliation.
- `DBOS-KRN-001-R7`: strategic choice, ambiguous recipient, insufficient authority or high-impact irreversibility MUST create an awaiting-human state.
- `DBOS-KRN-001-R8`: late material evidence MUST trigger impact assessment, never historical overwrite.

## Dependencies

Requires State Manager, Permissions, Context Manager, Configuration, Task Manager, Timeline, Event Bus and Audit Trail. It may reference Workspace, Case File, Project, Decision, Memory and Engine Loader records through their interfaces.

## Future extension points

Mission profiles, cost-aware routing and portfolio scheduling MAY extend planning. Extensions MUST preserve admission invariants, Dave's authority and technology-neutral component contracts.

## Failure behaviour

Typed failures are invalid request, insufficient evidence, insufficient authority, capability unavailable, state conflict, verification failure, acceptance failure, side-effect uncertainty and internal inconsistency. Unsafe dependant work stops; verified independent work remains. Unknown side effects MUST be reconciled before retry. Retries use the original idempotency key unless a materially new operation is authorised.

## Observability, security and privacy

Every mutation emits a correlated event and audit record containing references rather than unnecessary source content. Mission views MUST expose current state, evidence boundary, authority, plan version, blockers, acceptance and limitations.

