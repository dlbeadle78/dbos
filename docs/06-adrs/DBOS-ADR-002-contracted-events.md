# DBOS-ADR-002: Contracted Events for Cross-Subsystem Facts

| Field | Value |
|---|---|
| Status | Accepted |
| Decision date | 2026-07-21 |
| Scope | Cross-subsystem change communication |
| DBCA authority | ES-006; ES-010; ES-011 |

## Context

Kernel subsystems need to react to changes without hidden calls or shared state. Delivery can fail after owner state commits, so the specification must distinguish domain truth from transport outcome.

## Decision

Owners publish immutable, versioned past-tense domain events under DBOS-CTR-003. The semantic outcome of owner mutation and event commitment is atomic. Consumer delivery is at least once by default and consumers are idempotent. Publication proves an event was accepted, not that every consumer processed it.

No vendor, queue, transaction mechanism or storage pattern is selected in v0.1.0.

## Consequences

Consumers are decoupled and replay is possible. Event versioning, duplicate handling, dead-letter ownership and projection staleness become explicit engineering concerns.

## Alternatives rejected

- Direct hidden calls only: rejected because dependant behaviour and failure become unobservable.
- Global exactly-once claim: rejected because it hides external side-effect and distributed-delivery uncertainty.
- Unversioned notifications: rejected because human attention and system facts have different semantics.

## Failure controls

Uncertain publication reconciles by event ID. Delivery exhaustion enters a dead letter with an owner; it does not reverse domain state.

