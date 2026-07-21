# DBOS v0.2.0 ADR Consistency and Approval Review

| Field | Value |
|---|---|
| Document ID | DBOS-ASR-006 |
| Status | Completed, awaiting architecture approval |
| Review date | 2026-07-21 |
| Package reviewed | DBOS-ADR-009–016 |
| Prior decisions checked | DBOS-ADR-001–008 |
| Architectural authority | DBCA v1.0.0 at `035377ca6e5b72bb732d59bc9b528bf337a0c274` |
| Frozen implementation baseline | DBOS v0.1.0 at `d142b25c361e809c90edca74013d2bb13b6f5065` |

## Purpose

Determine whether the proposed v0.2.0 Architecture Decision Records are complete, mutually consistent, compatible with accepted v0.1.0 decisions and traceable to DBCA. This review is an architecture gate, not executable implementation evidence.

## Package completeness

| ADR | Decision boundary | Required sections | Result |
|---|---|---|---|
| ADR-009 | Language, runtime, ESM and compiler posture | Complete | Pass |
| ADR-010 | Modular-monolith topology and package rules | Complete | Pass |
| ADR-011 | SQLite architecture, migrations, backup and transactions | Complete | Pass |
| ADR-012 | Bootstrap, readiness, recovery and shutdown | Complete | Pass |
| ADR-013 | Local operator identity and assurance limit | Complete | Pass |
| ADR-014 | Event journal, outbox, delivery and audit atomicity | Complete | Pass |
| ADR-015 | Secrets, classification, minimisation and retention boundary | Complete | Pass |
| ADR-016 | Local deployment and external-I/O prohibition | Complete | Pass |

Each ADR contains Context, Problem Statement, Decision, Alternatives Considered, Consequences, Risks, Mitigations, Traceability back to DBCA, Affected Kernel Subsystems and Future Impact.

## Governing precedence

The collective interpretation is:

1. DBCA v1.0.0 remains the architectural authority.
2. Frozen DBOS v0.1.0 requirements and ADR-001–008 define Kernel semantics.
3. ADR-009–016 specialise implementation boundaries for v0.2.0.
4. Runtime configuration selects only options explicitly permitted by those decisions.
5. Code, schemas, storage layouts, dependencies and deployment settings are subordinate implementation artefacts.

No lower level may weaken or silently reinterpret a higher level. An inconsistency resolves in favour of the higher authority and blocks implementation until reviewed.

## Cross-decision invariants

The package is consistent only when all implementations preserve these combined rules:

1. One process does not mean shared domain ownership.
2. One database does not permit cross-subsystem direct writes.
3. TypeScript acceptance does not replace runtime contract validation.
4. Local process attribution does not create permission or strong authentication.
5. Bootstrap capability is narrower than governed runtime capability.
6. Configuration cannot override identity, permission, DBCA, contract, deployment or data-classification boundaries.
7. Owner mutation, required event and mandatory audit acceptance form one semantic commit where policy requires all three.
8. Audit acceptance remains logically independent of ordinary Event Bus delivery even when records share a local database transaction.
9. At-least-once delivery requires idempotent consumers and never implies exactly-once external effect.
10. Notification delivery and acknowledgement do not determine domain state.
11. Secret values and full sensitive content do not propagate through configuration, events, logs or audit payloads.
12. v0.2.0 has no domain engines, remote users or external side effects.

## Conflict review

| Decision interaction | Apparent tension | Resolution | Result |
|---|---|---|---|
| ADR-001 with ADR-010/011 | One process and database could imply shared ownership | Package exports, owner repositories and prohibited direct SQL preserve one semantic owner | Pass |
| ADR-002 with ADR-014 | Contracted events do not select storage, while v0.2.0 does | ADR-014 is a compatible implementation specialisation and preserves event semantics | Pass |
| ADR-003 with ADR-015 | Append-only history may conflict with retention and deletion | Preserve minimum authorised fact/integrity evidence; content disposal follows approved policy | Pass with policy gate |
| ADR-004 with ADR-013 | Single local operator may appear universally authorised | Identity is only an attributed actor input; Permissions remains default-deny and operation-specific | Pass |
| ADR-005 with ADR-016 | Engine Loader exists while executable engines are prohibited | v0.2.0 validates manifests only; synthetic inert fixtures remain non-domain and test-only | Pass |
| ADR-006 with ADR-012 | Configuration depends on services that require boot settings | Minimal immutable bootstrap manifest is narrower; governed Configuration activates after dependencies | Pass |
| ADR-006 with ADR-013/015/016 | Configuration might widen identity, secrets or deployment capability | These are governing prohibitions outside configurable scope | Pass |
| ADR-007 with ADR-014/016 | Notifications consume events but external delivery is prohibited | Notification System owns only in-system records; delivery cannot affect source state | Pass |
| ADR-008 with ADR-011/014 | Independent audit acceptance shares a transaction/store | Independence is logical and delivery-independent, not a requirement for a separate database | Pass |
| ADR-009 with ADR-015 | Diagnostic tooling may expose arbitrary JavaScript objects | Logger uses safe-field allow lists and pre-serialisation redaction | Pass |
| ADR-010 with ADR-012 | Package dependency direction may conflict with boot order | Static import direction and runtime activation order are separate and both controlled at composition root | Pass |
| ADR-011 with ADR-014 | Database transactions could include asynchronous work | Only owner, event and required audit writes are in transaction; delivery and external work are excluded | Pass |
| ADR-013 with ADR-016 | Local identity might later be reused remotely | Remote and multi-user modes are rejected and require superseding decisions | Pass |
| ADR-014 with ADR-016 | Future effects cannot be part of local atomic commit | Future side effects require effect evidence and unknown-outcome recovery, not distributed transaction claims | Pass |

No direct contradiction, circular authority or competing source of truth remains in the proposed decisions.

## Dependency and loading consistency

| Order | Architecture dependency | Reason |
|---:|---|---|
| 1 | ADR-009 and ADR-010 | Establish execution and package boundaries |
| 2 | ADR-015 and ADR-016 | Establish data and deployment prohibitions before adapters |
| 3 | ADR-013 | Identity is explicitly bounded by local deployment |
| 4 | ADR-011 | Persistence is selected within package, data and deployment controls |
| 5 | ADR-014 | Atomicity specialises the approved local persistence boundary |
| 6 | ADR-012 | Bootstrap composes all preceding services without weakening them |

This decision-dependency order is compatible with the two-phase runtime loading order. It does not require the Configuration subsystem to precede its own security and accountability dependencies.

## DBCA consistency review

| DBCA concern | ADR coverage | Review result |
|---|---|---|
| DBCA/DBOS separation and contract authority | ADR-009; ADR-010 | No implementation artefact becomes normative over DBCA/DBOS |
| Mission-centred, guarded state | ADR-010; ADR-011; ADR-012; ADR-014 | Mission admission and mutation remain guarded |
| Least authority and progressive trust | ADR-013; ADR-016 | Local access, identity, permission and engine trust remain separate |
| Minimum necessary context and privacy | ADR-015; ADR-016 | Classification, references and external-I/O prohibition minimise exposure |
| Safe degradation and recovery | ADR-011; ADR-012; ADR-014 | Integrity, recovery, idempotency and readiness are explicit |
| Observable accountability | ADR-013; ADR-014; ADR-015 | Actor, operation and outcome remain observable without private reasoning |
| Quality by design | ADR-009; ADR-010; all spike gates | Compiler, schemas, boundaries and failure tests are mandatory |

No DBCA conflict or untraceable specialisation was identified.

## Residual risks and mandatory evidence

Internal consistency does not prove the selected technologies. The following remain implementation-entry blockers:

| Gate | Required evidence |
|---|---|
| SPK-01 | TypeScript and JSON Schema parity across canonical positive and negative fixtures |
| SPK-02 | SQLite driver comparison, integrity, migration, backup, restore and crash-recovery evidence |
| SPK-03 | State/event/audit atomicity at every defined failure point |
| Threat model | Approved local runtime assets, actors, trust boundaries, abuse cases and controls |
| Data governance | Approved classification details, retention matrix and content-disposal rules |
| Recovery objectives | Approved loss, restore and restart objectives with validation method |
| Acceptance plan | Executable scenario mapping and release evidence format required by DBOS-ASR-005 |

## Collective review conclusion

**Internal consistency: PASS.** ADR-009–016 are complete, mutually consistent and compatible with DBCA v1.0.0 and frozen DBOS v0.1.0. The package may proceed to explicit architecture approval without amendment.

**Implementation authorisation: WITHHELD.** This review cannot grant its own approval. In accordance with DBOS-ASR-005, production runtime code remains prohibited until:

1. the user explicitly accepts ADR-009–016;
2. SPK-01, SPK-02 and SPK-03 pass and their selected details are recorded without changing the approved semantics;
3. the threat model, data classification/retention controls and recovery objectives are approved; and
4. the implementation scope and acceptance-test mapping are approved.

If any spike contradicts an ADR assumption, the affected ADR returns to `Proposed` and the consistency review must be repeated. No partial or conditional technology result authorises production implementation.
