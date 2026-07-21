# DBOS-ADR-011: Embedded SQLite Persistence and Transaction Boundaries

| Field | Value |
|---|---|
| Status | Accepted |
| Decision date | 2026-07-21 |
| Scope | Durable storage, migrations, integrity, backup and transaction ownership |
| DBCA authority | ARC-005; ES-007; ES-010; ES-011 |
| Supersedes | None |
| Depends on | DBOS-ADR-001; DBOS-ADR-003; DBOS-ADR-008; DBOS-ADR-010 |

## Context

The Core Runtime must preserve canonical state, append-only history, events, audit acceptance and recovery checkpoints across process failure. v0.2.0 is a single local process, so an external database service would add operational cost without a demonstrated requirement.

Node's built-in SQLite API is currently documented at release-candidate stability. The architecture can select SQLite without prematurely selecting a driver.

## Problem Statement

Select a durable persistence architecture and define transaction ownership, migrations, integrity and recovery without allowing storage layout to become a competing domain contract.

## Decision

DBOS v0.2.0 SHALL use one embedded SQLite database per runtime deployment behind DBOS-owned storage ports. SPK-02 SHALL select the exact maintained driver after testing Node.js 24 compatibility, transactions, crash recovery, backup, migration, portability and supply-chain risk.

The database SHALL use:

- foreign-key enforcement and an explicitly tested journalling/synchronisation policy;
- prepared statements and parameter binding;
- versioned, forward-only schema migrations with checksums;
- startup integrity and schema-compatibility checks;
- atomic backup with verified restore evidence;
- append-only records or supersession where DBOS prohibits destructive history changes; and
- optimistic version checks for mutable owner records.

Each semantic record has one owning repository. Other subsystems access it through the owner's public interface, not direct SQL. Storage tables and migrations are private implementation details.

Transactions SHALL be short and owned by an application operation coordinator. They MAY span owner mutation, mandatory audit acceptance and event/outbox append only where ADR-014 requires semantic atomicity. External side effects, notification delivery and event-consumer execution MUST NOT occur inside a database transaction.

Unknown commit outcomes SHALL reconcile using operation, idempotency and event identifiers before retry. Destructive down-migration is not an operational rollback mechanism; application rollback uses a compatible release and forward repair.

Source consulted: [Node.js SQLite stability](https://nodejs.org/api/sqlite.html).

## Alternatives Considered

- **In-memory persistence:** useful for tests but cannot satisfy durable recovery.
- **PostgreSQL:** mature and scalable but introduces a service and network boundary not needed by the local v0.2.0 deployment.
- **Filesystem JSON records:** simple but weak for atomic multi-record operations, indexing, concurrency and migrations.
- **Event sourcing as the only store:** conflicts with DBOS owner records and would make replay semantics define domain truth.
- **Select `node:sqlite` immediately:** avoided until its stability and recovery characteristics pass SPK-02.

## Consequences

- Local installation and backup are straightforward.
- Cross-record atomicity is possible inside one store.
- Write concurrency is intentionally bounded and monitored.
- Storage portability depends on ports and conformance tests, not SQL compatibility alone.
- Schema migration becomes a release-critical operation.

## Risks

- Driver instability or native-module supply-chain risk.
- Corruption, disk exhaustion or unsafe filesystem placement.
- Long transactions causing lock contention.
- Shared database access bypassing subsystem ownership.
- Backup files exposing sensitive data.

## Mitigations

- Complete SPK-02 and pin the approved driver.
- Use restrictive filesystem permissions, safe resolved paths and startup integrity checks.
- Enforce transaction duration budgets and single-writer expectations.
- Restrict database handles to storage adapters and package-private repositories.
- Apply the same classification, retention and access controls to backups.
- Exercise crash, corruption, backup and restore in release validation.

## Traceability back to DBCA

| DBCA obligation | DBOS realisation |
|---|---|
| ARC-005 stable object architecture | Owner repositories preserve canonical identifiers, versions and provenance |
| ES-007 guarded lifecycle state | Optimistic versions and transaction boundaries prevent stale transitions |
| ES-010 safe failure and recovery | Integrity checks, idempotency and unknown-commit reconciliation |
| ES-011 observable accountability | Durable audit acceptance and append-only history within controlled transactions |

## Affected Kernel Subsystems

All state-owning subsystems. State Manager, Event Bus, Audit Trail, Configuration, Timeline, Permissions and Kernel Runtime are directly involved in transaction and recovery controls.

## Future Impact

Higher concurrency, remote deployment or multiple Kernel processes may require a server database and a replacement ADR. Ports and shared adapter tests are mandatory to preserve that option. Data migration, retention and cryptographic protection may become separate decisions as classification and deployment expand.
