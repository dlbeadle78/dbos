# DBOS-ADR-007: Notification Separated from State and Events

| Field | Value |
|---|---|
| Status | Accepted |
| Decision date | 2026-07-21 |
| Scope | Human attention routing |
| DBCA authority | ARC-006; ARC-011; ES-011 |

## Context

An event may require no human attention, while a notification may group several events. Delivery and acknowledgement are unreliable indicators of domain state. Combining them creates duplicate messages and false completion.

## Decision

The Notification System consumes eligible events and separately owns notification lifecycle. It applies recipient, authority, channel, sensitivity, deduplication, quiet-period and escalation rules. Delivery or acknowledgement never changes source state without a distinct authorised command.

DBOS v0.1.0 specifies in-system notification records only and does not claim external email, calendar or Teams delivery.

## Consequences

Attention can be controlled without corrupting mission truth. Rules require freshness, recipient certainty and clear delivery evidence before any future external adapter is permitted.

## Alternatives rejected

- Every event becomes a notification: rejected because it creates noise and privacy risk.
- Acknowledgement closes work: rejected because reading is not acceptance evidence.
- External adapter assumptions in the Kernel: rejected because access and authority are not established.

## Failure controls

Ambiguous recipient or unknown delivery blocks retry or escalation until resolved. Source state remains unchanged.

