# DBOS v0.2.0 Core Runtime Implementation Roadmap

| Field | Value |
|---|---|
| Document ID | DBOS-ROAD-001 |
| Status | Proposed for approval |
| Target release | DBOS v0.2.0 Core Runtime |
| Depends on | DBOS-RDY-001; DBOS-ASR-005 |

## Objective

Implement the minimum reliable runtime that can boot, validate contracts, enforce authority, guard state, record audit, publish and recover events, coordinate a synthetic mission and shut down safely. Assessment Intelligence and all other domain engines remain excluded.

## Release acceptance

DBOS v0.2.0 is acceptable only when:

- the runtime uses the approved language, topology, persistence and security ADRs;
- the frozen v0.1.0 contracts remain traceable and semantically unchanged unless a separately approved versioned amendment exists;
- Kernel boot, recovery, ready, running, draining and stopped states are guarded and observable;
- Configuration, Audit Trail, Timeline, Permissions, Event Bus and State Manager operate through approved interfaces;
- a synthetic, non-domain mission completes through Mission Control with acceptance evidence;
- crash, replay, idempotency, stale state, revoked authority and unknown-side-effect tests pass;
- the conformance report distinguishes passed, failed, not implemented and approved exception;
- no Assessment Intelligence, employer-system access or autonomous external communication exists.

## Implementation principles

1. One behavioural slice per commit where practical.
2. Contracts and negative tests precede implementation.
3. Every state mutation is permissioned, version-guarded, evented and audited according to policy.
4. In-memory and durable adapters share the same contract suite.
5. No phase may claim success while its exit gate is incomplete.
6. Later subsystem work cannot weaken an earlier safety gate.
7. Failed experiments are not merged into production packages.

## Phase 0: approval and decision closure

### Deliverables

- Approve or amend DBOS-RDY-001.
- Create and accept the eight pre-code ADRs.
- Complete runtime threat model, data classification, retention matrix and recovery objectives.
- Define v0.2.0 scope exclusions and release evidence template.

### Exit gate

Dave approves the runtime boundary. No unresolved strategic choice remains hidden in implementation work.

## Phase 1: bounded technical spikes

### Deliverables

- SPK-01 TypeScript/JSON Schema contract-parity evidence.
- SPK-02 SQLite adapter comparison and recovery evidence.
- SPK-03 state/event/audit atomicity and crash-injection evidence.
- Final dependency and version selections recorded in ADRs.

### Exit gate

All three spikes pass or the affected decision returns for review. Disposable spike code is not promoted automatically.

## Phase 2: repository and toolchain foundation

### Deliverables

- Private npm workspace root and locked Node/npm/TypeScript version policy.
- Strict TypeScript project references and ESM package boundaries.
- Formatting, linting, type checking, test and build commands.
- Dependency inventory, licence policy, vulnerability checks and release manifest generation.
- CI gates for clean install, type check, tests, schemas and traceability.

### Exit gate

A clean environment reproduces the same build and empty test harness through `npm ci`; package-boundary violations fail CI.

## Phase 3: canonical contracts and conformance harness

### Deliverables

- Canonical records, component envelopes, events, permissions, transitions, failures, temporal boundaries and engine manifests as strict TypeScript and JSON Schema mirrors.
- Positive and negative fixtures for every DBOS-CTR-001–008 contract.
- Compatibility rules for supported major/minor versions.
- Behaviour-scenario runner retaining v0.1.0 IDs.
- Machine-generated traceability report.

### Exit gate

Type and schema validators agree on every fixture. Unsupported major versions, additional prohibited fields and malformed sensitive payloads fail before mutation.

## Phase 4: storage, transactions and integrity

### Deliverables

- Approved SQLite adapter and in-memory test adapter behind identical ports.
- Schema migration, transaction, backup, restore and integrity-check facilities.
- Append-only record and version semantics.
- Idempotency-key and consumer-checkpoint stores.
- Fault-injection points around begin, write, audit, event append, commit and acknowledgement.

### Exit gate

Both adapters pass the same repository tests. Crash recovery produces no false commit, semantic duplicate or lost accepted record.

## Phase 5: bootstrap core

### Deliverables

- Kernel process lifecycle and composition root.
- Immutable bootstrap manifest validation.
- Restricted bootstrap logger and full structured logging port.
- Audit acceptance in bootstrap and full modes.
- Clock/Timeline core and explicit timezone policy.
- Deny-by-default bootstrap Permissions.

### Exit gate

Invalid release, configuration, storage, audit or clock state prevents ready status with a typed, correlated and safe failure.

## Phase 6: event and state foundation

### Deliverables

- Durable Event Journal and in-process Event Bus.
- Transactional outbox delivery, acknowledgement, retry, dead letter and replay.
- Full Permissions grant, decision, confirmation and revocation behaviour.
- State Manager models, guards, optimistic version checks and reconciliation.
- Governed Configuration activation, impact analysis and rollback-as-new-version.

### Exit gate

Applicable CFG, EVT, PER, STA, INT and REC behaviour scenarios pass. Mandatory audit cannot be bypassed through Event Bus or configuration failure.

## Phase 7: work and knowledge primitives

### Deliverables

- Workspace Manager and membership references.
- Case File Manager with provenance, conflict and correction.
- Project and Task Managers with acyclic dependencies and acceptance.
- Decision Log, Memory Manager and Context Manager.
- Timeline projections, validity, expiry and late-evidence overlap.

### Exit gate

Single-owner state is enforced. Cross-owner writes fail. As-of projections expose source version, filtering and limitations.

## Phase 8: runtime governance and attention

### Deliverables

- Engine Loader manifest registration, compatibility and quarantine.
- No domain-engine execution; a synthetic inert test engine may exercise session boundaries only.
- Notification System for in-system records, deduplication and acknowledgement.
- External notification and employer-system adapters remain absent.

### Exit gate

Engine availability remains separate from trust and authority. Notification delivery never changes domain state. Assessment engine registration remains rejected.

## Phase 9: Mission Control vertical slice

### Deliverables

- Mission request and admission.
- Evidence boundary, authority envelope, risk and acceptance capture.
- Plan and task creation.
- Guarded execution using synthetic operations only.
- Verification, completion, blocking, cancellation and late-evidence supersession.
- Controlled Kernel drain and restart recovery during active and blocked missions.

### Exit gate

A synthetic mission traverses the full Kernel lifecycle with correlated events, audit, state history and acceptance evidence. Negative routes prove missing outcome, authority, evidence and acceptance cannot produce false readiness or completion.

## Phase 10: hardening and release candidate

### Deliverables

- Full applicable v0.1.0 behaviour catalogue executed.
- Property tests for state models, idempotency, ordering and replay.
- Security boundary, path, redaction and malicious-manifest tests.
- Concurrency and fault-injection suite.
- Backup/restore and corruption-recovery exercise.
- Performance budgets for boot, state transition, event delivery and audit append.
- Dependency inventory, SBOM, licence and vulnerability review.
- DBCA-to-runtime conformance matrix and residual-risk report.

### Exit gate

No critical release blocker remains: invented evidence, assumed access, unauthorised side effect, state-guard bypass, missing mandatory audit, untraceable decision, duplicate semantic effect, false completion or domain intelligence inside the Kernel.

## Phase 11: v0.2.0 release decision

### Deliverables

- Final validation report.
- Clean repository and reproducible build evidence.
- Versioned release notes and migration statement from specification-only v0.1.0.
- Verified bundle and source archive.
- Explicit approval before tagging or public release.

### Exit gate

Dave approves the release. Tagging and publication use the validated commit without amendment or history recreation.

## Proposed incremental commit sequence

| Order | Commit scope |
|---:|---|
| 1 | Record approved runtime ADRs and security model |
| 2 | Establish workspace and strict toolchain |
| 3 | Add canonical schema mirrors and fixture harness |
| 4 | Implement storage ports and in-memory adapter |
| 5 | Implement approved SQLite adapter and migrations |
| 6 | Implement Kernel boot, logger, audit and clock |
| 7 | Implement Permissions and governed Configuration |
| 8 | Implement Event Journal, delivery and recovery |
| 9 | Implement State Manager and model guards |
| 10 | Implement work and knowledge subsystem owners |
| 11 | Implement Engine Loader and in-system notifications |
| 12 | Implement Mission Control synthetic vertical slice |
| 13 | Complete fault, security and conformance hardening |
| 14 | Validate and prepare v0.2.0 release candidate |

Each commit MUST be independently understandable, preserve passing earlier gates and avoid combining unrelated subsystem ownership changes.

## Approval requested

Approve, amend or reject:

1. TypeScript on Node.js 24 LTS.
2. npm workspace modular monolith.
3. JSON Schema 2020-12 contract mirrors.
4. Embedded SQLite architecture with driver selected by spike.
5. Two-phase bootstrap sequence.
6. Durable in-process Event Bus and transactional outbox.
7. Node test runner plus selective fast-check properties.
8. Pino behind a redacting logging port.
9. Single local operator and no external side effects for v0.2.0.
10. The eleven-phase implementation roadmap and release gates.
