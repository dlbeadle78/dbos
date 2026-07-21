# Kernel Behaviour Test Standard

| Field | Value |
|---|---|
| Document ID | DBOS-BEH-000 |
| Status | Approved |
| Version | 0.1.0 |
| DBCA authority | ES-000; ES-009; STD-009 |

## Purpose

Define technology-neutral scenarios that a future DBOS implementation must pass before claiming Kernel conformance.

## Scenario structure

Every scenario has a stable ID, requirement references, initial state, stimulus, expected observable result and prohibited result. A future executable test must retain these semantics even if fixture wording, ordering and irrelevant details vary.

## Test classes

Every applicable subsystem MUST be tested for:

- normal permitted behaviour;
- boundary and missing mandatory input;
- stale version or expired evidence;
- insufficient or revoked authority;
- negative finding as well as positive finding;
- duplicate request and idempotency conflict;
- dependency and delivery failure;
- unknown side-effect reconciliation;
- material component or contract version change;
- privacy and minimum-necessary output;
- recovery, cancellation and supersession.

## Fixture rules

Fixtures MUST contain synthetic data and no real personal information, secrets or employer-system credentials. A fixture declares clock, timezone, actor, authority grants, accessible sources and unavailable sources. Absence is never assumed unless explicitly part of the fixture.

## Pass rules

- `DBOS-BEH-000-R1`: all applicable MUST requirements require at least one passing positive or negative scenario.
- `DBOS-BEH-000-R2`: a pass requires expected observable state, event and audit outcome, not merely an interface response.
- `DBOS-BEH-000-R3`: prohibited outcomes are asserted explicitly for high-risk controls.
- `DBOS-BEH-000-R4`: tests MUST vary irrelevant context to detect brittle interpretation.
- `DBOS-BEH-000-R5`: unavailable implementation technology may defer execution but cannot count as a pass.
- `DBOS-BEH-000-R6`: an approved exception must identify owner, rationale, expiry and constitutional compatibility.

## v0.1.0 status

The scenarios in this release are specification-level acceptance criteria. No application runtime exists, so v0.1.0 validates scenario completeness and traceability rather than claiming executable test passes.

