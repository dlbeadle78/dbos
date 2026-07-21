# DBOS-ADR-001: Single-Owner State with Derived Projections

| Field | Value |
|---|---|
| Status | Accepted |
| Decision date | 2026-07-21 |
| Scope | Kernel mutable state |
| DBCA authority | PRI-001 principle 9; ARC-005 |

## Context

Mission, project, task, timeline and dashboard views overlap. If several subsystems can update the same meaning, state diverges and no reliable audit or recovery path exists.

## Decision

Each mutable semantic record has exactly one owning subsystem. Other subsystems hold stable references and build versioned as-of projections. State Manager owns transition authority but not domain meaning. Event Bus transports owner facts but does not become a state owner.

## Consequences

Ownership and correction are unambiguous. Queries may require multiple owner references and projections may be temporarily stale, so every projection states source versions, `as_of` time and limitations.

## Alternatives rejected

- Shared mutable records: rejected because responsibility and conflict resolution become ambiguous.
- Event Bus as system of record: rejected because transport and domain ownership have different failure and retention needs.
- Mission Control owning all Kernel data: rejected because it creates a central semantic bottleneck and duplicated responsibility.

## Failure controls

Owner mismatch blocks mutation. Projection inconsistency returns a limited view and triggers refresh; it never writes back inferred corrections.

