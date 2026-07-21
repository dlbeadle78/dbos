# DBOS-ADR-004: Central Permission Evaluation with Local Enforcement

| Field | Value |
|---|---|
| Status | Accepted |
| Decision date | 2026-07-21 |
| Scope | Kernel authority decisions |
| DBCA authority | ADR-003; ADR-005; ES-004 |

## Context

Every subsystem must enforce authority consistently, but a single central executor would couple unrelated mutations and create a critical bottleneck.

## Decision

Permissions owns grants, policy evaluation, confirmation binding and immutable operation-specific decisions. Each owning subsystem remains responsible for enforcing a valid decision immediately before mutation and for checking local state and contract guards.

Authority is denied by default outside declared scope. Technical access, trust, task requests and urgency do not substitute for permission.

## Consequences

Policy decisions are consistent and auditable while domain owners retain state responsibility. Permission decisions must be short-lived and revalidated after material target, context, recipient, side-effect or grant change.

## Alternatives rejected

- Every subsystem interprets grants independently: rejected because policy drifts.
- Permissions executes all mutations: rejected because it would own neither domain invariants nor recovery.
- Access-based authorisation: rejected by DBCA's separation of access and authority.

## Failure controls

Unavailable or indeterminate permission blocks material mutation. High-impact emergency exceptions require an explicit future policy and audit path; none exists in v0.1.0.

