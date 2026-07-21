# DBOS-ADR-012: Two-Phase Bootstrap and Controlled Shutdown

| Field | Value |
|---|---|
| Status | Accepted |
| Decision date | 2026-07-21 |
| Scope | Kernel construction, recovery, readiness, degradation and shutdown |
| DBCA authority | ES-001; ES-007; ES-010; ES-011 |
| Supersedes | None |
| Depends on | DBOS-ADR-004; DBOS-ADR-006; DBOS-ADR-008; DBOS-ADR-010; DBOS-ADR-011 |

## Context

The v0.1.0 specifications contain valid runtime dependencies that form bootstrap cycles. Configuration requires Permissions, Timeline, Event Bus, State Manager and Audit Trail, while several of those services need safe boot settings. Treating Configuration as fully available before its dependencies would create hidden defaults or unaudited authority.

## Problem Statement

Define a deterministic boot and shutdown sequence that resolves dependency cycles without weakening configuration, permission, audit or recovery controls.

## Decision

Kernel Runtime SHALL implement two distinct bootstrap phases and a guarded process lifecycle:

`created -> bootstrapping -> recovering -> ready -> running -> draining -> stopped`.

`degraded`, `blocked` and `failed` are guarded exceptional states and never aliases for ready.

Phase 1 SHALL:

1. verify the DBCA/DBOS release manifest and runtime compatibility;
2. start an emergency-safe structured logger;
3. validate a minimal immutable bootstrap manifest;
4. open storage and verify schema and integrity;
5. start Audit Trail acceptance in restricted bootstrap mode;
6. start the clock and Timeline core;
7. start Permissions with deny-by-default bootstrap policy;
8. start the Event Journal and delivery control;
9. start State Manager and Kernel state models; and
10. activate governed Configuration.

The bootstrap manifest SHALL contain only adapter identities, data location reference, runtime mode, clock mode, log destination/level and integrity policy. It cannot grant authority, define mission behaviour or override DBCA/DBOS controls.

Phase 2 SHALL load the remaining owner subsystems in dependency order, then Engine Loader in manifest-validation-only mode, Notification System in in-system-only mode and Mission Control last.

The Kernel SHALL not enter `ready` until every mandatory service passes health and compatibility checks, Audit Trail accepts mandatory records, Permissions is fail-closed, storage recovery is complete and no unresolved migration or unknown outcome makes mission admission unsafe.

Shutdown SHALL stop admission, drain or block in-flight work, close engine sessions, persist delivery checkpoints, stop Event Bus delivery, finalise mandatory audit records and close storage last. Forced termination is recorded and reconciled at the next start.

## Alternatives Considered

- **Load Configuration first:** creates a cycle and risks unauthorised or unaudited bootstrap settings.
- **Hard-coded full configuration:** bypasses versioned governance and makes runtime behaviour irreproducible.
- **Lazy construction on first use:** makes dependency and failure order nondeterministic.
- **Start every subsystem concurrently:** shortens nominal boot but obscures readiness and recovery dependencies.
- **Best-effort shutdown:** risks lost checkpoints and unknown accepted work.

## Consequences

- Bootstrap mode is an explicit restricted capability, not a partially started normal runtime.
- Boot takes longer because integrity, recovery and compatibility checks are blocking.
- Mission Control cannot admit work until all mandatory dependencies are ready.
- Shutdown and restart behaviour become testable state machines.

## Risks

- Bootstrap-only paths could persist after ready and bypass full policy.
- A dependency may report healthy before recovery is complete.
- Shutdown may hang on a consumer or operation.
- Emergency logging or bootstrap configuration may leak sensitive information.

## Mitigations

- Use separate capability interfaces for bootstrap and full modes and revoke bootstrap capabilities on activation.
- Make readiness depend on evidence-bearing health results, not process existence.
- Bound drain periods and convert incomplete work into typed blocked or unknown outcomes.
- Apply redaction and classification controls from ADR-015 during bootstrap.
- Test every boot and shutdown interruption point.

## Traceability back to DBCA

| DBCA obligation | DBOS realisation |
|---|---|
| ES-001 mission-centred execution | Mission admission begins only after Kernel readiness |
| ES-007 lifecycle integrity | Explicit guarded process states and readiness evidence |
| ES-010 safe degradation and recovery | Recovery precedes readiness; shutdown preserves unknown outcomes |
| ES-011 accountability | Audit acceptance starts before material subsystem activation and closes last |

## Affected Kernel Subsystems

All sixteen subsystems. Kernel Runtime, Configuration, Permissions, Audit Trail, Timeline, Event Bus, State Manager and Mission Control define the critical loading path.

## Future Impact

Additional adapters or domain engines must declare lifecycle dependencies and health contracts. Multi-process deployment would require coordinated readiness, leader and shutdown decisions. New bootstrap settings require ADR review because expanding bootstrap scope can bypass governed Configuration.
