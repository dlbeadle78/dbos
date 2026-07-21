# DBOS-ADR-014: Durable Event Journal, Transactional Outbox and Audit Atomicity

| Field | Value |
|---|---|
| Status | Accepted |
| Decision date | 2026-07-21 |
| Scope | Owner mutation, event commitment, delivery and mandatory audit acceptance |
| DBCA authority | ES-006; ES-007; ES-010; ES-011 |
| Supersedes | None |
| Depends on | DBOS-ADR-002; DBOS-ADR-008; DBOS-ADR-011; DBOS-ADR-012 |

## Context

DBOS requires a material owner mutation to produce a committed domain event or typed failure. Ordinary delivery may fail after commit, and mandatory audit acceptance cannot depend solely on that delivery. The single SQLite store permits a local atomic boundary while logical ownership remains separate.

## Problem Statement

Ensure that accepted state, required events and mandatory audit evidence cannot diverge across crashes, retries or delivery failures, without claiming global exactly-once processing or turning Event Bus or Audit Trail into the domain owner.

## Decision

DBOS v0.2.0 SHALL implement one durable in-process Event Bus backed by an append-only Event Journal and transactional outbox.

For a mutation that requires both a domain event and mandatory audit acceptance, one local database transaction SHALL:

1. validate the owner state version and permission decision;
2. write the owner mutation or append-only successor;
3. append the immutable domain event;
4. record mandatory audit acceptance through the Audit Trail logical interface; and
5. commit all accepted records together.

If any required write fails before commit, none of the semantic outcome is accepted. Event delivery begins only after commit. Audit Trail remains a separate logical owner with distinct access and retention semantics; co-transaction does not make ordinary Event Bus delivery its acceptance path.

Delivery SHALL be at least once. Consumers SHALL be idempotent by event ID and semantic operation key. Producer sequence is monotonic per producer but no global ordering is claimed. Consumer checkpoints record pending, delivered, acknowledged, retrying, dead-lettered or expired states.

Replay SHALL preserve original event identity and add replay-session context. Dead letters require an owner and bounded recovery process. Unknown publication or commit outcomes reconcile by stable identifiers before retry.

No external broker, distributed transaction or exactly-once claim is part of v0.2.0. SPK-03 SHALL prove crash-point behaviour before implementation begins.

## Alternatives Considered

- **Publish after state commit without outbox:** can lose the event between commit and publication.
- **Event Bus as system of record:** conflicts with single-owner domain state.
- **Audit only as an event consumer:** permits unaudited accepted mutation when delivery fails.
- **Audit Trail as the Event Bus:** conflates accountability access/retention with operational consumption.
- **Exactly-once delivery:** cannot be honestly guaranteed across future side effects and hides idempotency needs.
- **External broker:** adds a network and operational boundary not needed for a single process.

## Consequences

- State, required event and mandatory audit acceptance share a provable local commit boundary.
- Consumers must tolerate duplicates and temporary projection staleness.
- Event delivery can recover independently without reversing domain truth.
- Journal and audit data remain linked but governed separately.
- Storage throughput and transaction duration require monitoring.

## Risks

- A broad transaction may couple logically independent failures.
- Consumers may accidentally produce duplicate semantic effects.
- Poison events may block a subscription.
- Replay may be mistaken for a new domain occurrence.
- Audit and event schemas may drift despite shared commit timing.

## Mitigations

- Limit co-transaction to records required by declared policy.
- Provide consumer idempotency stores and conformance tests.
- Use bounded retry, dead-letter ownership and subscription isolation.
- Mark replay context while preserving original identity and occurrence time.
- Version and validate event and audit contracts independently.
- Inject failures before and after every write, commit and acknowledgement in SPK-03.

## Traceability back to DBCA

| DBCA obligation | DBOS realisation |
|---|---|
| ES-006 contracted integration | Immutable versioned event envelopes and authorised subscriptions |
| ES-007 lifecycle integrity | Owner version check and event commitment form one semantic outcome |
| ES-010 failure and recovery | Durable outbox, reconciliation, retry, dead letter and replay controls |
| ES-011 accountability | Mandatory audit acceptance cannot be bypassed by ordinary delivery failure |

## Affected Kernel Subsystems

Event Bus, Audit Trail, State Manager and every event-producing or consuming subsystem. Mission Control, Permissions, Configuration, Timeline and Notification System have critical consumer or producer obligations.

## Future Impact

A future external broker remains possible as a delivery adapter but cannot weaken local semantic commitment. Multi-store or multi-process deployment requires a new consistency ADR. External side effects require separate effect-ledger and unknown-outcome controls rather than extending the database transaction across a network.
