# Kernel Operational Lifecycle

| Field | Value |
|---|---|
| Document ID | DBOS-ARC-002 |
| Status | Approved |
| Version | 0.1.0 |
| Dependencies | DBOS-ARC-001; DBCA ES-007 |

## Purpose

Define the technology-neutral sequence by which the Kernel accepts, executes and closes a mission.

## Lifecycle

1. **Request:** Mission Control receives an intended outcome and opens a correlation chain.
2. **Admission:** Context and Permissions establish constitutional fit, evidence boundary and authority envelope.
3. **Organisation:** Workspace, Case File and Project records are linked or created within authority.
4. **Planning:** Task Manager creates dependency-aware tasks; Timeline provides temporal constraints; Configuration resolves effective policies.
5. **Readiness:** Engine Loader confirms compatible capability availability without loading unauthorised engines.
6. **Execution:** State Manager guards transitions; Mission Control issues versioned commands; events record facts.
7. **Attention:** Notification System routes only actionable, authorised attention requests.
8. **Verification:** outputs, side effects and acceptance evidence are reconciled.
9. **Closure:** Mission Control records complete, blocked or cancelled outcome; Decision Log and Memory receive approved durable records.
10. **Assurance:** Audit Trail preserves the material lineage; late evidence starts impact analysis and supersession where required.

## Lifecycle invariants

- `DBOS-ARC-002-R1`: no executable state exists without outcome, evidence boundary, authority and acceptance conditions.
- `DBOS-ARC-002-R2`: no engine receives undeclared context or broader authority than its mission step.
- `DBOS-ARC-002-R3`: every material mutation emits one committed domain event or a typed failure; unknown outcomes are reconciled before retry.
- `DBOS-ARC-002-R4`: event delivery failure cannot silently erase committed state.
- `DBOS-ARC-002-R5`: notification delivery does not determine mission truth.
- `DBOS-ARC-002-R6`: closure requires acceptance evidence; late evidence never overwrites terminal history.

## Failure containment

Failures stop unsafe dependants, preserve independent verified results and record retry safety. Recovery may correct input, refresh evidence, obtain authority, select an approved compatible engine, retry idempotently, compensate a reversible effect or request the minimum human decision.

