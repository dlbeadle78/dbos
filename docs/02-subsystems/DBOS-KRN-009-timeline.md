# Timeline Specification

| Field | Value |
|---|---|
| Document ID | DBOS-KRN-009 |
| Status | Approved |
| Version | 0.1.0 |
| DBCA authority | ARC-009; ARC-010 |

## Purpose

Provide consistent temporal semantics, event chronology, deadlines, validity intervals and schedule projections across the Kernel.

## Responsibilities

- Normalise event, effective, recorded, verified and expiry times.
- Resolve relative expressions against an explicit date and timezone.
- Register deadlines, windows, dependencies, recurrence definitions and clock sources.
- Produce historical, current and planned projections as of a stated time.
- Detect expiry, temporal conflict and late-arriving evidence overlap.
- Emit due, overdue, expired and review-trigger events without deciding consequence.

## Non-responsibilities

Timeline does not own domain events, alter task priority, imply calendar access, decide that work is complete or silently convert plans into current facts.

## Inputs

`TemporalEntry`, object reference, temporal type, timestamp or interval, timezone, source, confidence, recurrence rule, dependency, validity policy and `as_of` query.

## Outputs

`TemporalRecord`, normalised instant/interval, timeline projection, due/expiry signal, conflict set, late-evidence overlap and temporal events.

## Interfaces

| Interface | Behaviour |
|---|---|
| `IF-TIM-01 RegisterTemporalEntry` | Create a sourced and typed temporal record |
| `IF-TIM-02 ResolveRelativeTime` | Resolve expression using an explicit base date and timezone |
| `IF-TIM-03 GetTimeline` | Return an authorised as-of chronology or schedule projection |
| `IF-TIM-04 AssessValidity` | Determine current, future, expired, superseded or unknown validity |
| `IF-TIM-05 DetectOverlap` | Identify late evidence affecting validity intervals |
| `IF-TIM-06 EvaluateTriggers` | Emit due, overdue, expiry or review facts idempotently |

## State

Temporal records are append-only and may be `planned`, `effective`, `expired`, `cancelled`, `superseded` or `unknown`. Derived schedules are versioned projections. Clock-source and timezone metadata are part of the result.

## Requirements and invariants

- `DBOS-KRN-009-R1`: material time MUST identify its temporal type and timezone or explicitly state unknown.
- `DBOS-KRN-009-R2`: future commitments MUST NOT appear as current state.
- `DBOS-KRN-009-R3`: relative time MUST resolve against an explicit base instant and timezone.
- `DBOS-KRN-009-R4`: correction MUST preserve the previously recorded temporal assertion.
- `DBOS-KRN-009-R5`: late evidence MUST identify decisions and state views whose validity intervals overlap it.
- `DBOS-KRN-009-R6`: trigger emission MUST be idempotent for the same object, rule and due instant.
- `DBOS-KRN-009-R7`: absence of an external calendar source MUST appear as an evidence-boundary limitation.

## Dependencies

Requires Configuration, Permissions, Event Bus and Audit Trail. Supplies temporal services to all state-owning subsystems.

## Future extension points

Calendar adapters, business calendars, forecasting and recurrence profiles MAY be added. They must declare source, freshness and authority and cannot create external actions through Timeline.

## Failure behaviour

Ambiguous timezone, invalid interval, recurrence explosion, stale clock, source conflict and permission denial return typed failures. Unknown time lowers confidence and blocks time-critical reliance where the caller declares it mandatory.

## Observability, security and privacy

Normalisation, corrections and triggers are evented. Timeline views minimise descriptive content and rely on authorised object references.

