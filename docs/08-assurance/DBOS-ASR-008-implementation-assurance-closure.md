# DBOS v0.2.0 Implementation Assurance Closure

| Field | Value |
|---|---|
| Document ID | DBOS-ASR-008 |
| Status | Approved closure decisions |
| Decision date | 2026-07-21 |
| Applies to | DBOS v0.2.0 Core Runtime |
| Architectural authority | DBCA v1.0.0 at `035377ca6e5b72bb732d59bc9b528bf337a0c274` |
| Frozen predecessor | DBOS v0.1.0 at `d142b25c361e809c90edca74013d2bb13b6f5065` |
| Evidence | DBOS-ASR-005–007; DBOS-SPK-001–003; DBOS-ADR-009–016 |

## Purpose

Close the remaining pre-implementation blockers identified by DBOS-ASR-007. Each decision is binding for v0.2.0. A change to these boundaries requires impact review and, where material, a new or superseding ADR.

## Closure 1: runtime threat model

**Decision:** Mitigate within the local-development boundary.

The protected assets are Kernel contracts and code, the SQLite database and backups, event and audit integrity, bootstrap configuration, dependency integrity and local operator attribution. The permitted actors are one local operator, the Kernel process, reviewed Kernel packages and synthetic test fixtures.

The trust boundaries are the local command entry point, configured data directory, bootstrap manifest, storage adapter, package exports, Event/Audit interfaces and Engine Loader manifest boundary.

| Threat | Mandatory control |
|---|---|
| Unauthorised local process or user | Restrictive data-directory permissions, local-process-attested identity and default-deny Permissions |
| Path traversal or symbolic-link escape | Resolve canonical paths against explicit roots before access; reject escape or unsafe link targets |
| SQL injection or cross-owner write | Prepared statements, storage ports, owner repositories and package-boundary tests |
| State/event/audit tampering | Transactions, foreign keys, append-only semantics, integrity checks and reconciliation |
| Malicious or incompatible engine manifest | Schema, version, integrity and capability validation; no executable engine loading |
| Secret or content disclosure | Secret references, safe-field logging, pre-serialisation redaction and synthetic-only data |
| Dependency compromise | Lockfile, disabled unreviewed install scripts, licence/vulnerability review and release inventory |
| Resource exhaustion or writer starvation | One bounded write coordinator, transaction budgets, busy timeout and health degradation |
| Backup disclosure or substitution | Classified backup storage, restrictive permissions, digest/application identity and restore verification |

Residual risk from compromise of the host operating-system account is **accepted only for local development with synthetic data**. The approach is rejected for remote, multi-user, production-data or external-side-effect use without a new threat model and identity/deployment ADR.

**Rationale:** The controls match ADR-013 and ADR-016 and keep the attack surface proportionate to the approved runtime. Pretending to provide strong remote authentication would create false assurance.

**Closure:** Closed by mitigation and bounded residual-risk acceptance.

## Closure 2: data classification and retention

**Decision:** Mitigate through synthetic-only operation and fixed default retention.

DBOS v0.2.0 SHALL NOT ingest real learner, employer, care, health, assessment, email, calendar or other production personal data. Test identities and records must be synthetic and clearly marked.

The ADR-015 classes remain Public, Internal, Confidential and Restricted. Unclassified fields are Restricted. The default retention matrix is:

| Record | Maximum default retention | Disposal rule |
|---|---:|---|
| Versioned source, schemas and synthetic fixtures | Git history life | Repository retention policy |
| Synthetic owner state, events, decisions and audit | 90 days or workspace deletion, whichever is earlier | Controlled whole-workspace purge with deletion audit outside the deleted store |
| Operational JSON logs | 30 days | Rotation and secure deletion |
| Failure diagnostics without restricted content | 14 days | Rotation and secure deletion |
| Verified database backups | 30 days and maximum three generations | Delete oldest verified generation after replacement succeeds |
| Disposable test databases and generated spike output | End of test execution | Remove from test workspace; never commit |
| Secret values | Zero DBOS retention | Never persist, log, emit, fixture or audit |

Versioned accountability records are not edited in place. Disposal removes authorised content or the complete synthetic workspace while preserving only non-sensitive release/conformance evidence where required.

Any proposal to process real or production data is **rejected** until a new data-protection assessment, lawful-purpose decision, retention schedule, access model, encryption/key-management decision and breach procedure are approved.

**Rationale:** Synthetic-only data is sufficient to implement and validate the Kernel. It avoids introducing professional or personal-data duties before the runtime has production security controls.

**Closure:** Closed by mitigation; production-data use rejected.

## Closure 3: recovery objectives

**Decision:** Mitigate through explicit objectives and release tests.

| Failure class | Recovery point objective | Recovery time objective | Acceptance evidence |
|---|---:|---:|---|
| Process crash with intact storage | Zero committed transactions lost | Kernel ready or explicitly blocked within 5 minutes | Crash-before/after-commit and reconciliation tests |
| Failed migration | Zero accepted pre-migration data lost | Prior compatible state or blocked diagnosis within 15 minutes | Transactional migration rollback test |
| Database corruption or database-file loss | Maximum 24 hours from last verified backup | Verified restore or explicit unrecoverable status within 60 minutes | Backup, restore, integrity and application-identity checks |
| Configuration corruption | Last accepted configuration version | Governed rollback or blocked state within 15 minutes | Configuration activation/rollback tests |
| Event consumer failure | Zero producer facts lost | Pending or dead-letter status exposed within 5 minutes | Retry, checkpoint and dead-letter tests |

Uncommitted transactions may be lost and are never reported as accepted. Unknown caller outcomes must reconcile by operation ID before retry. External-effect recovery has no objective because external effects remain prohibited.

Physical disk-full, byte-corruption, backup-restore and cross-platform tests are mandatory before release-candidate status. Failure to meet an objective blocks release; it does not silently weaken the objective.

**Rationale:** These objectives are achievable for a local development runtime and are consistent with SPK-02 and SPK-03. Stronger production availability is outside scope.

**Closure:** Closed by mitigation and measurable acceptance gates.

## Closure 4: machine-readable contract governance

**Decision:** Mitigate structural drift through deterministic single-source generation.

DBOS Markdown remains authoritative. The first implementation stage SHALL create one reviewed machine-readable contract model containing explicit DBOS document, field and invariant trace identifiers. One deterministic command generates strict TypeScript and JSON Schema 2020-12 outputs from that model.

Generated files SHALL be clearly marked, committed with their source model and never edited manually. CI SHALL regenerate into a clean workspace and fail on any difference. Unsupported major versions fail before processing. Semantic invariants that cannot be expressed as field schemas map to named executable validators and tests rather than being marked passed by shape validation.

**Rationale:** SPK-01 proved that one-source generation prevents TypeScript/JSON Schema disagreement while preserving Markdown authority.

**Closure:** Closed by mitigation and mandatory CI drift control.

## Closure 5: fixtures and conformance reporting

**Decision:** Mitigate false conformance through test-first sequencing and status-aware reporting.

The implementation sequence SHALL create contract fixtures and the conformance harness before domain subsystem behaviour. Every generated model requires positive, missing-field, additional-field, wrong-type and invalid-enum fixtures where applicable. Fixtures use synthetic data only.

Every applicable DBOS behaviour ID maps to an executable test or an explicit status. The only report statuses are `passed`, `failed`, `not-implemented` and `approved-exception`. Missing, skipped or unmapped evidence cannot become `passed`. A failed MUST or negative safety scenario blocks the relevant implementation gate.

The first code commit may establish the toolchain. The next implementation commit must establish contract generation, fixtures and conformance reporting before storage or subsystem behaviour is added.

**Rationale:** This converts the successful disposable parity method into a governed implementation sequence without treating document or test counts as conformance.

**Closure:** Closed by mitigation and enforced dependency order.

## Closure 6: `node:sqlite` maturity

**Decision:** Accept the residual risk for v0.2.0 within strict controls.

`node:sqlite` from exactly Node.js 24.14.0 is selected for the first SQLite adapter. Its Stability 1.1 active-development status is accepted because SPK-02 passed 13 transaction and recovery scenarios on that exact runtime and v0.2.0 is local, synthetic-only and non-production.

Controls are:

- exact Node.js 24.14.0 pin, with no automatic patch movement;
- all imports confined to one storage adapter;
- DBOS-owned ports and identical in-memory/SQLite adapter tests;
- no production or personal data;
- Linux, Windows and macOS test matrix before release candidate;
- full revalidation before any Node patch change; and
- fallback comparison with a maintained adapter if the API changes or cross-platform tests fail.

The approach is rejected for production-data or multi-process deployment while the API remains non-stable. An incompatible change, failed recovery test or inability to reproduce the pinned runtime automatically withdraws this acceptance and blocks release.

**Rationale:** The tested built-in adapter has stronger current evidence than alternatives in the spike environment, and isolation limits replacement cost.

**Closure:** Closed by explicit bounded risk acceptance and mitigation.

## Closure 7: implementation scope and exclusions

**Decision:** Authorise only the DBOS v0.2.0 Core Runtime roadmap under gated sequencing.

The authorised implementation boundary comprises repository/toolchain foundation, generated contract mirrors, fixtures and conformance harness, storage ports/adapters, Kernel lifecycle, Configuration, Permissions, Audit Trail, Timeline, Event Bus, State Manager, remaining Kernel owners and a synthetic Mission Control vertical slice.

The first implementation slice is limited to:

1. private npm workspace and pinned toolchain;
2. package-boundary and clean-build gates;
3. canonical contract model and deterministic generation;
4. positive and negative fixtures; and
5. status-aware conformance reporting.

Explicitly excluded are Assessment Intelligence, other domain engines, remote listeners, multi-user identity, production data, external systems, person-directed communication, shell execution, arbitrary child processes, network brokers, distributed deployment and external side effects.

Later roadmap phases may proceed only when their existing exit gates pass. A prohibited capability cannot be enabled by configuration, dependency or permission.

**Rationale:** This is the minimum sequence that satisfies DBOS-ASR-005 and prevents domain behaviour from preceding its contracts and safety evidence.

**Closure:** Closed by scope limitation and explicit exclusions.

## Collective closure result

| Blocker | Disposition | Status |
|---|---|---|
| Runtime threat model | Mitigated; host-account risk accepted for synthetic local use | Closed |
| Data classification and retention | Mitigated; production data rejected | Closed |
| Recovery objectives | Mitigated with measurable RPO/RTO gates | Closed |
| Contract governance | Mitigated by deterministic generation and CI drift failure | Closed |
| Fixtures and conformance reporting | Mitigated by test-first sequence and closed statuses | Closed |
| `node:sqlite` maturity | Residual risk accepted within pinned adapter boundary | Closed |
| Implementation scope | Limited to Core Runtime; domain/external capabilities rejected | Closed |

All blockers identified by DBOS-ASR-007 are closed for the constrained v0.2.0 Core Runtime. These decisions do not permit production deployment and do not themselves instruct the creation of runtime code.
