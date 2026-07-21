# DBOS-ADR-008: Audit Acceptance Independent of Event Bus Delivery

| Field | Value |
|---|---|
| Status | Accepted |
| Decision date | 2026-07-21 |
| Scope | Mandatory accountability records |
| DBCA authority | Constitution Article 9; ES-010; ES-011 |

## Context

If mandatory audit depends solely on ordinary event delivery, Event Bus failure can permit unaudited high-impact mutation. If audit becomes the domain event store, its access, retention and content duties conflict with operational consumption.

## Decision

Audit Trail accepts mandatory records through its own logical interface. High-impact mutation requiring audit succeeds only when the audit acceptance condition defined by policy is met. Audit may consume or publish health events, but ordinary Event Bus delivery is not its only acceptance path.

Audit records and domain events remain linked but distinct: events support reaction; audit supports accountability and integrity.

## Consequences

High-impact work fails safely during audit unavailability. Implementations must coordinate semantic atomicity without assuming a particular transaction or storage technology.

## Alternatives rejected

- Audit only from Event Bus: rejected because delivery failure creates an accountability gap.
- Audit as the Event Bus: rejected because consumers and retention have different access needs.
- Best-effort audit for all actions: rejected because material actions require traceability.

## Failure controls

Mandatory audit failure blocks initiating action unless a future explicitly approved emergency policy applies. Degraded audit state raises an integrity alert and bounds queued records.

