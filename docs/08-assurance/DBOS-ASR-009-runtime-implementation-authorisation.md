# DBOS v0.2.0 Runtime Implementation Authorisation Report

| Field | Value |
|---|---|
| Document ID | DBOS-ASR-009 |
| Decision | **AUTHORISED** |
| Decision date | 2026-07-21 |
| Applies to | DBOS v0.2.0 Core Runtime only |
| Activation | Requires a separate explicit user instruction before the first runtime code |
| Runtime baseline | Runtime Baseline v0.2.0 |
| Baseline Git ref | `runtime-baseline-v0.2.0` |

## AUTHORISED

DBOS v0.2.0 Core Runtime implementation is architecturally and technically authorised within the scope and gates defined below.

This decision records readiness. It does not instruct implementation to begin. The documentation is frozen at Runtime Baseline v0.2.0, and the first runtime code requires a separate explicit user approval.

## Decision basis

| Gate | Evidence | Result |
|---|---|---|
| DBCA authority | DBCA v1.0.0 at `035377ca6e5b72bb732d59bc9b528bf337a0c274` | Preserved |
| Frozen Kernel semantics | DBOS v0.1.0 at `d142b25c361e809c90edca74013d2bb13b6f5065` | Preserved |
| Runtime architecture | DBOS-ADR-009–016 | Accepted |
| ADR consistency | DBOS-ASR-006 | Pass |
| Contract parity | DBOS-SPK-001 | Pass |
| SQLite recovery | DBOS-SPK-002 | Pass with accepted bounded risk |
| Event/audit atomicity | DBOS-SPK-003 | Pass |
| Post-spike review | DBOS-ASR-007 | Open blockers identified |
| Assurance closure | DBOS-ASR-008 | All seven blockers closed |
| Implementation entry criteria | DBOS-ASR-005 | Satisfied through approved sequencing and gates |

## Authorised scope

The authority covers the dependency-ordered DBOS-ROAD-001 Core Runtime implementation:

- private npm workspace and pinned Node.js/TypeScript toolchain;
- package-boundary enforcement and reproducible build gates;
- deterministic contract model, TypeScript and JSON Schema generation;
- synthetic positive and negative fixtures and conformance reporting;
- storage ports, in-memory adapter and isolated `node:sqlite` adapter;
- Kernel boot, readiness, recovery, degradation and shutdown;
- Configuration, Permissions, Audit Trail, Timeline, Event Bus and State Manager;
- remaining v0.1.0 Kernel subsystem owners;
- Engine Loader manifest validation without domain-engine execution;
- in-system notifications only; and
- a synthetic, non-domain Mission Control vertical slice.

Implementation must follow the roadmap exit gates. Passing this report cannot turn a later failed gate into success.

## First implementation sequence

When separately instructed to begin, the first runtime work is restricted to:

1. repository and pinned toolchain foundation;
2. package-boundary enforcement;
3. canonical contract model and deterministic generation;
4. positive and negative contract fixtures; and
5. status-aware conformance reporting.

Storage and subsystem behaviour cannot precede those controls.

## Binding exclusions

This authority excludes:

- Assessment Intelligence or any other domain engine;
- real learner, employer, health, care, assessment or other production data;
- remote or multi-user access;
- email, calendar, chat or other person-directed delivery;
- employer-system or third-party integration;
- external network side effects;
- shell or arbitrary child-process execution;
- external brokers or distributed deployment;
- publication, release tagging or deployment; and
- any amendment to DBCA v1.0.0 or DBOS v0.1.0.

An excluded capability requires explicit new architecture and implementation authority.

## Binding conditions

- Node.js is pinned to 24.14.0 for the initial `node:sqlite` adapter.
- TypeScript is pinned to 7.0.2 and Ajv to 8.20.0 for the initial contract pipeline.
- All test and runtime data is synthetic.
- Contract Markdown remains authoritative over generated artefacts.
- Every applicable behaviour reports `passed`, `failed`, `not-implemented` or `approved-exception`.
- Mandatory audit cannot be deferred to ordinary Event Bus delivery.
- Every material mutation remains permissioned, version-guarded, evented and audited according to policy.
- Cross-platform, disk-full, corruption and restore tests remain release-candidate gates.
- Documentation-baseline changes require controlled impact review and a new baseline identity.

## Final decision

**AUTHORISED**

The architecture, spike evidence and assurance closures are sufficient to permit DBOS v0.2.0 Core Runtime implementation under the stated controls. Execution is paused at the frozen documentation baseline until the user explicitly directs that the first runtime code may be written.
