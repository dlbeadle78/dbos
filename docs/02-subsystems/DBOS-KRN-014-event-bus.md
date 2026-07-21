# Event Bus Specification

| Field | Value |
|---|---|
| Document ID | DBOS-KRN-014 |
| Status | Approved |
| Version | 0.1.0 |
| DBCA authority | ES-006; ES-010; ES-011 |

## Purpose

Transport versioned facts between Kernel subsystems with correlation, ordering context, replay safety and explicit delivery outcomes.

## Responsibilities

- Validate and publish immutable event envelopes.
- Preserve event identity, source sequence, correlation, causation and recorded time.
- Route events to declared subscriptions with permission and sensitivity controls.
- Track delivery, acknowledgement, retry, dead-letter and replay status.
- Prevent duplicate semantic processing through stable event and consumer keys.
- Support recovery without becoming the source of domain truth.

## Non-responsibilities

Event Bus does not decide policy, mutate domain state, guarantee global chronological order, transform failure into success or expose sensitive payloads to undeclared consumers.

## Inputs

`EventEnvelope`, producer identity/version, event contract version, payload references, sensitivity, mission/correlation/causation, source sequence, idempotency key and subscription definition.

## Outputs

Publication receipt, delivery attempt, acknowledgement, dead-letter record, replay session, subscription status and bus health events.

## Interfaces

| Interface | Behaviour |
|---|---|
| `IF-EVT-01 PublishEvent` | Validate and durably accept one immutable event or fail |
| `IF-EVT-02 Subscribe` | Register authorised event types, versions and delivery policy |
| `IF-EVT-03 AcknowledgeEvent` | Record consumer outcome for one delivery attempt |
| `IF-EVT-04 ReplayEvents` | Re-deliver an authorised range with replay identifiers |
| `IF-EVT-05 GetDeliveryStatus` | Return publication and consumer delivery state |
| `IF-EVT-06 DeadLetterEvent` | Isolate exhausted or incompatible delivery for owned recovery |

## State

Event publication states are `received`, `validated`, `committed` or `rejected`. Per-consumer delivery states are `pending`, `delivered`, `acknowledged`, `retrying`, `dead-lettered` or `expired`. Events are immutable after commit.

## Requirements and invariants

- `DBOS-KRN-014-R1`: every event MUST include event ID, type/version, producer/version, mission/correlation where applicable, causation, source sequence, event and recorded time, sensitivity and payload/reference.
- `DBOS-KRN-014-R2`: committed events MUST be immutable and uniquely identifiable.
- `DBOS-KRN-014-R3`: producer order MAY be preserved by source sequence; global order MUST NOT be implied.
- `DBOS-KRN-014-R4`: delivery is at least once unless a stricter declared contract exists; consumers MUST be idempotent.
- `DBOS-KRN-014-R5`: replay MUST retain original event identity and add replay-session context.
- `DBOS-KRN-014-R6`: incompatible versions or unauthorised subscriptions MUST fail before payload delivery.
- `DBOS-KRN-014-R7`: delivery failure MUST NOT reverse committed domain state or report it as absent.

## Dependencies

Requires Configuration, Permissions, Timeline and Audit Trail. All Kernel subsystems publish and/or consume declared events.

## Future extension points

Partitioning, retention tiers, event schema registry and cross-runtime bridging MAY be added. They cannot change committed event meaning or weaken access controls.

## Failure behaviour

Invalid envelope, duplicate conflict, unauthorised publication, unsupported version, delivery timeout and consumer poison event return typed results. Retries use back-off and limits; exhausted delivery enters dead letter with owner. Publication uncertainty requires reconciliation by event ID before reissue.

## Observability, security and privacy

Bus metrics expose lag, retries, dead letters and version errors. Payload references and redaction minimise personal or secret content in transport and audit records.

