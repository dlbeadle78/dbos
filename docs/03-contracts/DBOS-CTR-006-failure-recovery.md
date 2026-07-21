# Failure and Recovery Contract

| Field | Value |
|---|---|
| Document ID | DBOS-CTR-006 |
| Status | Approved |
| Contract version | 1.0.0 |
| DBCA authority | ES-010 |

## Purpose

Define truthful failure, containment, retry and recovery semantics shared by every subsystem.

## Failure record

Required fields are `failure_id`, category, code, safe summary, source component/version, operation, mission/correlation, affected object references, event/recorded time, partial outputs, side-effect state, evidence preserved, retry safety, containment applied, recovery owner, permitted recovery actions and sensitivity.

Categories are `input`, `evidence`, `authority`, `capability`, `dependency`, `state`, `verification`, `side-effect`, `acceptance`, `security`, `consistency` and `unknown`.

Side-effect state is `none`, `not-started`, `confirmed-complete`, `confirmed-partial`, `confirmed-failed` or `unknown`.

## Recovery record

A recovery records failure reference, chosen action, authority, preconditions, attempt, result, residual risk, preserved evidence and whether normal work may resume.

## Invariants

- `DBOS-CTR-006-R1`: contain unsafe dependant work before retry or fallback.
- `DBOS-CTR-006-R2`: preserve partial verified output and diagnostic correlation.
- `DBOS-CTR-006-R3`: never blind-retry an unknown or non-idempotent side effect.
- `DBOS-CTR-006-R4`: fallback MUST NOT lower evidence, authority or contract rules silently.
- `DBOS-CTR-006-R5`: degraded output MUST state limitations and unpassed acceptance conditions.
- `DBOS-CTR-006-R6`: repeated or material failure MUST create review signals.

## Recovery actions

Permitted actions are correct input, refresh evidence, obtain authority, resolve recipient, wait for dependency, select approved compatible fallback, retry idempotently, compensate a reversible effect, reconcile external state, cancel safely or escalate for the minimum decision.

## Failure behaviour

Recovery failure creates a new linked failure; it never overwrites the original. Unknown recovery outcome remains blocked until reconciled.

