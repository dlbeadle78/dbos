# DBOS v0.2.0 Core Runtime Readiness Assessment

| Field | Value |
|---|---|
| Document ID | DBOS-RDY-001 |
| Status | Proposed for approval |
| Target release | DBOS v0.2.0 Core Runtime |
| Branch | `develop/runtime-v0.2.0` |
| Frozen predecessor | DBOS v0.1.0 at `d142b25c361e809c90edca74013d2bb13b6f5065` |
| Architectural authority | DBCA v1.0.0 at `035377ca6e5b72bb732d59bc9b528bf337a0c274` |
| Assessment date | 2026-07-21 |

## Executive decision

DBOS is **conditionally ready** to enter Core Runtime engineering. The architecture, subsystem contracts, interfaces, behavioural catalogue and traceability baseline are strong enough to implement. Runtime code MUST NOT begin until the pre-code ADR set and three bounded technical spikes in this assessment are approved and completed.

The recommended runtime is:

- **Language:** TypeScript with strict compiler settings.
- **Runtime:** Node.js 24 LTS.
- **Module system:** native ESM with TypeScript `NodeNext` resolution.
- **Repository model:** private npm workspace monorepo and modular-monolith runtime.
- **Contract format:** TypeScript types backed by JSON Schema 2020-12 mirrors.
- **Initial deployment:** one local Kernel process with no external side effects and no domain engines.
- **Persistence:** embedded SQLite architecture behind a port; exact driver chosen only after a compatibility and recovery spike.
- **Eventing:** durable in-process Event Bus with transactional outbox, at-least-once delivery and idempotent consumers; no external broker in v0.2.0.
- **Testing:** Node's stable test runner, `node:assert/strict`, contract fixtures and selective property-based testing.
- **Logging:** structured JSON through a logging port with a Pino adapter, mandatory redaction and strict separation from Audit Trail.

## Readiness status

| Area | Status | Decision or gap |
|---|---|---|
| DBCA and DBOS traceability | Ready | Exact immutable baselines declared |
| Runtime language | Ready for approval | TypeScript on Node.js 24 LTS recommended |
| Package boundaries | Ready for approval | npm workspaces with explicit dependency rules |
| Machine-readable contracts | Ready for spike | JSON Schema 2020-12 plus TypeScript parity proof required |
| Persistence | Conditional | SQLite selected as architecture; driver and transaction behaviour require spike |
| Bootstrap sequence | Conditional | Specification dependency cycles require two-phase bootstrap ADR |
| Event and audit atomicity | Conditional | Transactional outbox design requires failure-injection proof |
| Identity | Conditional | v0.2.0 needs an explicit local single-operator identity boundary |
| Security and data handling | Ready for threat modelling | Boundaries identified; threat model and retention policy still required |
| Test catalogue | Ready | 146 v0.1.0 scenarios available for executable conversion |
| Runtime implementation | Not yet authorised | Begins only after approval and entry gates |

## 1. Runtime language selection

### Options considered

| Criterion | TypeScript/Node.js | Python | Go |
|---|---|---|---|
| Versioned contract modelling | Strong discriminated unions, strict types and JSON tooling | Strong with typing, but runtime enforcement relies more heavily on libraries | Strong static types; less direct fit for evolving JSON contracts |
| Event-driven coordination | Native async runtime and mature event tooling | Mature async support, with more variation across frameworks | Excellent concurrency model |
| Future UI, CLI and service reuse | One language across Node, web and potential desktop surfaces | Additional frontend language normally required | Additional frontend language normally required |
| Future AI and tool integrations | Strong SDK and HTTP support | Strongest data/AI library access | Adequate, smaller AI integration surface |
| Build and deployment simplicity | Moderate; runtime and packages required | Moderate; interpreter and environment management required | Strong single-binary deployment |
| Contract evolution speed | High | High | Moderate |
| Fit with DBOS event envelopes | High | High | High |
| Overall fit for v0.2.0 | **Recommended** | Reserve for specialised future engine adapters | Reserve for later hardened services if evidence supports it |

### Recommendation

Use TypeScript on Node.js 24 LTS. Node's official release channel currently identifies v24 as LTS while v26 is Current, so v24 is the safer baseline for a release intended to stabilise Kernel behaviour. TypeScript supplies compile-time structure for the heavily versioned objects, state results and failure unions defined by DBOS. Modern Node projects should use `NodeNext` module resolution according to the TypeScript configuration guidance.

The exact TypeScript compiler version MUST be pinned after a short compatibility spike. The spike should start with the current supported stable compiler and reject any option that weakens strictness or creates unstable declaration output. Runtime code MUST target platform APIs available in Node.js 24 LTS.

### Required compiler posture

`strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noImplicitOverride`, `noFallthroughCasesInSwitch`, `useUnknownInCatchVariables`, explicit Node types and project references are required. `any` requires a local documented exception. Exhaustive handling is mandatory for state, permission, failure and response-status unions.

### Sources checked

- [Node.js download and release status](https://nodejs.org/en/download)
- [TypeScript module configuration](https://www.typescriptlang.org/tsconfig/module)
- [TypeScript 6.0 transition and strict configuration notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html)

## 2. Project and package structure

### Recommended structure

```text
dbos/
├── docs/                         existing architecture and runtime decisions
├── packages/
│   ├── contracts/                canonical types, schemas and compatibility rules
│   ├── kernel-runtime/           composition root, boot and controlled shutdown
│   ├── storage/                  transaction, journal and repository ports
│   ├── observability/            logging, metrics and correlation ports
│   ├── testkit/                  clocks, fixtures, fault injection and scenario runner
│   └── subsystems/
│       ├── configuration/
│       ├── audit-trail/
│       ├── timeline/
│       ├── permissions/
│       ├── event-bus/
│       ├── state-manager/
│       └── ...remaining Kernel owners
├── apps/
│   └── kernel-cli/               local development and conformance entry point
├── fixtures/
│   ├── contracts/
│   └── behaviours/
└── tooling/                      build-time validation only
```

This is a modular monolith: one process, explicit package contracts and one composition root. It avoids distributed-system overhead while protecting single-owner state. A package may import `contracts` and declared ports, but it MUST NOT import another subsystem's internal modules or persistence representation.

The npm workspace root MUST be private to prevent accidental package publication. npm workspaces provide linked local packages under one root and one lockfile. Package exports expose public interfaces explicitly; internal paths remain unexported.

### Dependency direction

```text
contracts <- ports <- subsystem owners <- kernel-runtime <- kernel-cli
                 ^          |
                 |          v
              adapters <- testkit
```

`contracts` has no runtime dependency on subsystem packages. Adapters implement ports; they do not define domain meaning. The composition root is the only location allowed to assemble concrete implementations.

### Source checked

- [npm package workspaces](https://docs.npmjs.com/cli/v10/configuring-npm/package-json/#workspaces)

## 3. Dependency strategy

### Policy

1. Prefer Node.js standard modules and small internal ports.
2. Add a production dependency only when it removes a material security, correctness or maintenance risk.
3. Pin the Node major, package-manager major and direct dependency versions; commit the lockfile.
4. Use `npm ci` for reproducible builds and reject unreviewed lockfile drift.
5. Keep runtime and development dependencies separate.
6. Record purpose, licence, transitive risk, update owner, removal path and affected DBOS requirements for every direct dependency.
7. Generate a dependency inventory and software bill of materials for release candidates.
8. Run vulnerability, licence and abandoned-package review before each dependency update.
9. No install scripts are permitted without explicit review.
10. No framework or dependency-injection container is recommended for v0.2.0.

### Candidate direct dependencies

| Dependency | Purpose | Decision |
|---|---|---|
| TypeScript compiler | Type checking and emit | Required; exact version pinned after compiler spike |
| Ajv | JSON Schema 2020-12 validation | Recommended after schema parity spike |
| Pino | Structured JSON logging adapter | Recommended behind DBOS logging port |
| fast-check | Property-based state, idempotency and replay tests | Recommended as development-only |
| SQLite driver | Durable embedded storage | Undecided pending spike |

Vitest is not recommended initially. Node.js has a stable built-in test runner, so adding Vite's transformation stack is unnecessary until evidence shows that the native runner obstructs delivery.

JSON Schema 2020-12 is the current published JSON Schema version, and Ajv documents support for it. The schema remains an implementation mirror; DBOS Markdown remains authoritative.

### Sources checked

- [JSON Schema 2020-12 specification](https://json-schema.org/specification)
- [Ajv schema support](https://ajv.js.org/)
- [Pino repository](https://github.com/pinojs/pino)
- [fast-check property-based testing](https://fast-check.dev/docs/introduction/what-is-property-based-testing/)

## 4. Configuration system

Configuration requires a two-stage implementation because KRN-013 depends on services that themselves need boot settings.

### Stage A: immutable bootstrap manifest

The process starts with a minimal, local, read-only bootstrap manifest containing only runtime mode, data location reference, clock mode, log destination/level, integrity policy and selected adapter identities. It cannot contain mission, workspace or permission decisions. It is validated before any mutable subsystem starts.

### Stage B: governed Configuration subsystem

After Audit Trail, Timeline, Permissions, Event Bus and State Manager are available, Configuration activates full versioned definitions, proposals, effective intervals, impact analysis and rollback under KRN-013.

### Precedence

1. DBCA and DBOS governing controls, outside configuration and never overrideable.
2. Release-safe defaults.
3. Deployment profile.
4. Workspace configuration.
5. Mission configuration.

The narrowest valid value applies only within the scopes its definition permits. Prohibitions and permission decisions always override configuration convenience. Secrets are references resolved by an adapter; secret values never enter configuration records, events, logs or fixtures.

### Required properties

- JSON Schema 2020-12 validation before use.
- Immutable configuration snapshots identified by content digest and version.
- Deterministic resolution with source and evaluation time.
- Fail-closed behaviour for missing mandatory security settings.
- Atomic activation and rollback-as-new-version.
- Material-change events and affected-subsystem revalidation.

## 5. Subsystem loading sequence

The v0.1.0 specifications contain intentional logical dependencies but create runtime bootstrap cycles: Configuration references Permissions, Timeline, Event Bus, State Manager and Audit Trail; Permissions and Event Bus reference each other. A two-phase loader is therefore mandatory.

### Phase 1: bootstrap services

1. Validate process and release compatibility against DBCA/DBOS manifests.
2. Start the minimal emergency-safe structured logger.
3. Load and validate the immutable bootstrap manifest.
4. Open storage and verify schema/integrity compatibility.
5. Start append-only Audit acceptance in restricted bootstrap mode.
6. Start the Clock/Timeline core.
7. Start Permissions with deny-by-default bootstrap policy.
8. Start Event Journal and Event Bus delivery control.
9. Start State Manager and registered Kernel state models.
10. Activate governed Configuration and replace bootstrap decisions with versioned effective configuration.

### Phase 2: Kernel services

11. Start Workspace Manager, Case File Manager, Project Manager, Task Manager and Timeline projections.
12. Start Decision Log, Memory Manager and Context Manager.
13. Start Engine Loader in manifest-validation-only mode; no domain engine loads in the initial slice.
14. Start Notification System in in-system-record-only mode.
15. Start Mission Control last, after dependency health and contract versions pass.
16. Publish `KernelReady` only when every mandatory service is ready, audit is accepting, no migration is unresolved and the effective evidence/authority limits are known.

Shutdown runs in reverse dependency order. Mission admission stops first. In-flight work is drained or blocked, engine sessions close, delivery checkpoints persist, Event Bus stops delivery, audit finalises material records and storage closes last.

The distinction between bootstrap mode and full subsystem mode requires an accepted Runtime Bootstrap ADR before implementation.

## 6. Event Bus implementation

### Recommended topology

Use one durable in-process Event Bus for v0.2.0. Owner state mutation, domain event append and required audit acceptance participate in one storage transaction where policy requires all three. Event delivery begins only after commit through a transactional outbox/journal reader.

This preserves:

- owner state as the source of truth;
- immutable event identity and producer sequence;
- at-least-once consumer delivery;
- idempotent consumer outcomes;
- dead-letter ownership and bounded retry;
- replay using original event identity plus replay-session context;
- audit acceptance independent of ordinary Event Bus delivery.

### Event store responsibilities

The journal records envelope, producer sequence, integrity digest, commit time and delivery checkpoints. Consumer state records pending, delivered, acknowledged, retrying, dead-lettered or expired. It does not own the source domain record.

### Explicit exclusions

- No external broker, network queue or distributed consensus.
- No global ordering claim.
- No global exactly-once claim.
- No user notification as an event-delivery substitute.
- No event payload containing secrets or unnecessary personal information.

### Required spike

Prove atomic owner-state/event/audit writes; process termination between commit and delivery; duplicate delivery; poison consumer; replay; dead-letter recovery; sequence conflict; and unknown commit reconciliation using both in-memory and SQLite-backed adapters.

## 7. Kernel lifecycle

### Process lifecycle

`created -> bootstrapping -> recovering -> ready -> running -> draining -> stopped`, with `degraded`, `blocked` and `failed` as guarded exceptional states.

### Ready gate

The Kernel is ready only when:

- DBCA and DBOS versions are compatible;
- bootstrap configuration validates;
- storage and integrity checks pass;
- Audit Trail accepts mandatory records;
- clock and timezone policy are explicit;
- Permissions is fail-closed;
- Event Bus journal and delivery control are healthy;
- State Manager models validate;
- every mandatory subsystem reports compatible interfaces;
- outstanding recovery or migration does not make new mission admission unsafe.

### Mission lifecycle

The runtime implements the v0.1.0 sequence unchanged: request, admission, organisation, planning, readiness, execution, attention, verification, closure and assurance. Mission Control coordinates but cannot mutate lifecycle state directly. State Manager evaluates guards and writes transitions. Late evidence creates impact analysis and supersession rather than historical overwrite.

### Crash recovery

On restart, the Kernel verifies integrity, loads last committed state, reconciles incomplete transactions and unknown side effects, rehydrates delivery checkpoints, expires invalid permission/configuration decisions and refuses new mission admission until recovery status is safe.

## 8. Logging

### Decision

Define a DBOS `Logger` port and use a Pino JSON adapter. Logs are operational diagnostics only. Audit Trail remains the accountability record, and domain events remain cross-subsystem facts.

### Required log fields

`timestamp`, `level`, `message`, `component`, `component_version`, `runtime_instance_id`, `correlation_id`, `causation_id`, `mission_id`, `step_id`, `operation`, `outcome`, `failure_code` and `duration_ms` where applicable.

### Controls

- Default deny for arbitrary object logging.
- Redaction before serialisation, not after output.
- Never log secret values, full context packages, evidence bodies, memory content, private reasoning or unrestricted stack data.
- Stable safe failure codes; detailed sensitive diagnostics remain behind authorised references.
- Development formatting occurs outside the runtime stream.
- Log level cannot disable mandatory audit or security alerts.
- Retention and rotation belong to the deployment adapter and require policy.

## 9. Testing framework

Use Node's stable `node:test` runner with `node:assert/strict`. Compile/type-check before runtime tests. Add fast-check only for properties where generated sequences materially improve coverage.

### Test layers

| Layer | Purpose |
|---|---|
| Type and schema tests | Prove TypeScript and JSON Schema mirrors accept/reject the same fixtures |
| Unit tests | Pure guards, reducers, resolution and policy decisions |
| Contract tests | Every public interface and envelope version |
| State-model tests | Permitted and prohibited transitions, terminal immutability and stale versions |
| Property tests | Idempotency, sequence monotonicity, replay and dependency-graph invariants |
| Adapter tests | In-memory and SQLite implementations pass the same port suite |
| Integration tests | Boot, mission path, event/audit atomicity and controlled shutdown |
| Fault-injection tests | Crash points, dependency failure, poison event and unknown side effect |
| Security tests | Scope isolation, redaction, path safety, grant revocation and malicious manifests |
| Conformance tests | Map executable results to all applicable DBOS behaviour IDs |

Coverage percentage is informative, not acceptance. Release requires all applicable MUST requirements and negative scenarios, including false acceptance and false rejection checks.

### Source checked

- [Node.js test runner](https://nodejs.org/docs/latest-v24.x/api/test.html)
- [fast-check with the Node.js test runner](https://fast-check.dev/docs/tutorials/setting-up-your-test-environment/property-based-testing-with-nodejs-test-runner/)

## 10. Security boundaries

| Boundary | v0.2.0 control |
|---|---|
| Governance | Exact DBCA/DBOS manifest, immutable release identity and no lower-order override |
| Process | One local Kernel process; fail closed on incompatible runtime or storage |
| Identity | One local operator profile, explicitly marked local-process-attested rather than independently authenticated |
| Permissions | Default deny, operation-specific decisions, exact target and short validity |
| Subsystems | Public package exports only; no cross-owner internal imports or direct state writes |
| Persistence | Prepared statements, transaction boundaries, restrictive file access and integrity verification |
| Configuration | Validated snapshots; immutable bootstrap; no secret values |
| Logging | Structured safe fields, pre-output redaction and content minimisation |
| Eventing | Authorised producer/subscriber, version validation, payload references and replay controls |
| Engine loading | Manifest validation only initially; no untrusted code loading before isolation design is proven |
| External I/O | Disabled by default; no email, calendar, employer-system or person-directed adapter in v0.2.0 |
| Supply chain | Lockfile, dependency review, licence policy, vulnerability scan and release inventory |

The local operator identity is adequate only for a single-user development runtime with no external side effects. Multi-user, remote or externally consequential deployment requires a new identity/authentication ADR and threat-model update.

`node:sqlite` is currently documented as release-candidate stability rather than stable. It MUST NOT be chosen solely to avoid a dependency. The persistence spike must compare it with a maintained alternative against transaction, integrity, backup, portability and supply-chain criteria.

### Source checked

- [Node.js SQLite stability](https://nodejs.org/api/sqlite.html)

## 11. Traceability back to DBCA

### Trace chain

```text
DBCA obligation
  -> DBOS v0.1.0 requirement
    -> v0.2.0 package/module
      -> public interface/schema
        -> executable behaviour ID
          -> test result and release evidence
```

### Required controls

- Every package manifest declares implemented DBOS document IDs and DBCA authorities.
- Every public interface maps to one `IF-*` identifier and contract version.
- Every state model maps transitions and guards to `KRN-*` and `CTR-*` requirements.
- Executable tests retain the existing behaviour IDs such as `STA-03`, `PER-02` and `REC-10`.
- A generated conformance matrix reports `passed`, `failed`, `not-implemented` or `approved-exception`; missing is never treated as passed.
- DBCA Markdown and DBOS v0.1.0 Markdown remain authoritative over schemas, types and generated reports.
- CI fails for an implemented MUST without a mapped test, unsupported contract version or unexplained traceability break.

## 12. Pre-code decisions and spikes

### ADRs required before runtime code

1. Runtime language, Node/TypeScript version policy and ESM posture.
2. Modular-monolith topology and package dependency rules.
3. Persistence technology, migration, backup and transaction boundary.
4. Two-phase bootstrap and controlled shutdown.
5. Local operator identity and authentication limits.
6. Event journal, transactional outbox and audit atomicity.
7. Secret-reference handling and data classification.
8. Deployment boundary and external-I/O prohibition.

### Technical spikes

| Spike | Question | Pass condition |
|---|---|---|
| SPK-01 Contract parity | Can strict TypeScript types and JSON Schema 2020-12 accept/reject identical fixtures? | All canonical positive and negative fixtures agree; drift is detected automatically |
| SPK-02 Persistence | Which SQLite adapter meets transaction, integrity, backup, migration and supported-runtime needs? | Crash/failure tests pass; driver risk and recovery are documented |
| SPK-03 Atomicity | Can owner state, event append and mandatory audit acceptance survive every defined crash point? | No false commit, missing mandatory audit or duplicate semantic effect across injected failures |

Spikes produce evidence and ADR input, not production code. Their code, if any, stays disposable and outside the release implementation path until an option is approved.

## Approval recommendation

Approve the proposed stack and roadmap **for ADR and spike preparation only**. Do not authorise production runtime code until the eight ADRs are accepted, the three spikes pass and the threat model, data classification, retention and recovery objectives are approved.
