# Event Envelope Contract

| Field | Value |
|---|---|
| Document ID | DBOS-CTR-003 |
| Status | Approved |
| Contract version | 1.0.0 |
| DBCA authority | ES-006; ES-011 |

## Purpose

Define an immutable statement that a material fact occurred within a named source and version.

## Required fields

`event_id`, `event_type`, `event_version`, `producer`, `producer_version`, `source_record_id`, `source_record_version`, `source_sequence`, `event_time`, `recorded_time`, `correlation_id`, `causation_id`, `mission_id` where applicable, `actor_ref`, `permission_decision_ref` where applicable, `payload_or_refs`, `sensitivity` and `integrity_ref`.

Event names use stable past-tense facts, for example `MissionAdmitted`, `TaskBlocked`, `PermissionDenied` and `ConfigurationActivated`.

## Invariants

- `DBOS-CTR-003-R1`: an accepted event MUST be immutable and globally unique within DBOS.
- `DBOS-CTR-003-R2`: the producer MUST own the source fact it publishes.
- `DBOS-CTR-003-R3`: an event MUST distinguish event time from recorded time.
- `DBOS-CTR-003-R4`: source sequence MUST establish local order; no global order is implied.
- `DBOS-CTR-003-R5`: replay MUST preserve original identity and meaning.
- `DBOS-CTR-003-R6`: payloads SHOULD reference sensitive records rather than copy them.
- `DBOS-CTR-003-R7`: event compatibility follows major/minor semantic versioning.

## Delivery semantics

Acceptance by Event Bus proves publication, not consumer processing. A consumer records its own idempotent outcome. A failed delivery cannot reverse the producer's committed fact.

## Failure behaviour

Producer mismatch, unsupported version, duplicate ID with changed content, sequence conflict or invalid sensitivity rejects publication and creates an audit failure record.

