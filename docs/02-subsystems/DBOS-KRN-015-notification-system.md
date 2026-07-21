# Notification System Specification

| Field | Value |
|---|---|
| Document ID | DBOS-KRN-015 |
| Status | Approved |
| Version | 0.1.0 |
| DBCA authority | ARC-006; ARC-011; ES-004; ES-011 |

## Purpose

Convert authorised Kernel events into controlled, deduplicated attention requests while keeping notification delivery separate from mission truth.

## Responsibilities

- Evaluate notification rules against eligible events and recipient context.
- Resolve recipient identity and permitted channel before person-directed delivery.
- Compose minimum-necessary notification content from references and templates.
- Deduplicate, group, prioritise, defer and expire notices.
- Track delivery, acknowledgement, dismissal and escalation status.
- respect quiet periods, preferences and safety-critical exceptions declared in policy.

## Non-responsibilities

Notification System does not determine mission state, invent recipients, send without authority, guarantee that delivery equals reading or perform external communication in v0.1.0.

## Inputs

Eligible event reference, `NotificationRule`, recipient identity reference, channel capability, authority, urgency, sensitivity, content template reference, expiry, quiet-period policy and acknowledgement result.

## Outputs

`NotificationRecord`, composed notice, delivery request for a future authorised adapter, delivery status, acknowledgement, suppression reason and notification events.

## Interfaces

| Interface | Behaviour |
|---|---|
| `IF-NOT-01 EvaluateNotification` | Decide create, suppress, group, defer or require recipient resolution |
| `IF-NOT-02 CreateNotification` | Create an authorised in-system attention record |
| `IF-NOT-03 RequestDelivery` | Prepare a channel request only when adapter, recipient and authority are valid |
| `IF-NOT-04 RecordDeliveryOutcome` | Record delivered, failed or unknown execution evidence |
| `IF-NOT-05 AcknowledgeNotification` | Record recipient acknowledgement without changing domain truth |
| `IF-NOT-06 EscalateNotification` | Apply a declared escalation rule after fresh authority evaluation |

## State

States are `candidate`, `suppressed`, `queued`, `deferred`, `ready`, `delivery-requested`, `delivered`, `acknowledged`, `dismissed`, `failed`, `expired` and `cancelled`. v0.1.0 permits in-system records only; external delivery remains an unimplemented extension.

## Requirements and invariants

- `DBOS-KRN-015-R1`: person-directed notification MUST require resolved recipient, permitted channel, authority and minimum-necessary content.
- `DBOS-KRN-015-R2`: v0.1.0 MUST NOT claim external delivery because no delivery adapter is implemented.
- `DBOS-KRN-015-R3`: identical eligible facts within a deduplication window MUST NOT create repeated attention without policy reason.
- `DBOS-KRN-015-R4`: acknowledgement or delivery MUST NOT alter source object state unless a separate authorised command does so.
- `DBOS-KRN-015-R5`: escalation MUST re-evaluate recipient, authority, urgency and source freshness.
- `DBOS-KRN-015-R6`: notification content MUST disclose uncertainty and limitations inherited from the source event.
- `DBOS-KRN-015-R7`: preference or quiet-period failure MUST default to the safer declared route, not unrestricted delivery.

## Dependencies

Requires Event Bus, Permissions, Configuration, Timeline, State Manager and Audit Trail. Future channel adapters must enter through Engine Loader or a separately specified integration boundary.

## Future extension points

In-app, email, calendar, Teams or other adapters, digests and weekly reports MAY be added after recipient resolution, authority and delivery contracts exist. No adapter gains assumed access.

## Failure behaviour

Ambiguous recipient, denied channel, stale source, composition failure, duplicate conflict, adapter unavailable and unknown delivery return typed outcomes. Unknown external delivery blocks retry until reconciliation to prevent duplicate contact.

## Observability, security and privacy

Creation, suppression, delivery requests, recipient resolution, acknowledgement and failure are audited. Content is redacted from general logs and limited to declared recipients.

