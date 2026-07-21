# DBOS-SPK-002: SQLite Transaction and Recovery Evaluation

| Field | Value |
|---|---|
| Status | Completed |
| Result | Pass with controlled maturity risk |
| Execution date | 2026-07-21 |
| DBOS baseline | v0.1.0 at `d142b25c361e809c90edca74013d2bb13b6f5065` |
| Governing decisions | DBOS-ADR-011; DBOS-ADR-012; DBOS-ADR-015; DBOS-ADR-016 |
| Environment | Node.js 24.14.0; `node:sqlite`; SQLite 3.51.2 |
| Repository impact | Documentation only; disposable databases and harness excluded |

## Objective

Evaluate SQLite transaction behaviour, recovery, locking, migrations, integrity and backup for the local single-process Core Runtime. Select a v0.2.0 driver and define the controls required before implementation.

## Candidate evaluation

| Candidate | Evidence | Decision |
|---|---|---|
| Node.js `node:sqlite` | Executed all 13 spike scenarios on the approved Node major; built-in defensive mode, foreign-key option and backup API available | Recommended for the first v0.2.0 implementation slice with pinned Node.js 24.14.0 and explicit maturity risk |
| `better-sqlite3` 13.0.1 | Current package metadata supports Node.js 22 or later; installation attempted but the sandbox could not complete native build extraction | Reserve adapter; not selected without reproducible install and recovery evidence on supported target platforms |
| `sqlite3` 6.0.1 | Upstream repository is deprecated and currently unmaintained | Rejected |

The recommendation is based on executed compatibility and recovery evidence, not merely on avoiding a dependency. `node:sqlite` remains documented by Node.js 24.14.0 as Stability 1.1, active development, and emitted an experimental warning during the spike. This is a real residual risk.

Primary sources:

- [Node.js 24.14.0 SQLite API and stability](https://nodejs.org/download/release/v24.14.0/docs/api/sqlite.html)
- [SQLite transaction behaviour](https://www.sqlite.org/lang_transaction.html)
- [SQLite atomic commit](https://www.sqlite.org/atomiccommit.html)
- [SQLite write-ahead logging](https://www.sqlite.org/wal.html)
- [SQLite backup API](https://www.sqlite.org/backup.html)
- [`better-sqlite3` upstream repository](https://github.com/WiseLibs/better-sqlite3)
- [`node-sqlite3` upstream repository](https://github.com/TryGhost/node-sqlite3)

## Test configuration

| Setting | Tested value | Decision |
|---|---|---|
| Journal mode | WAL | Use for v0.2.0 local runtime |
| Synchronous | FULL, reported as `2` | Mandatory for durable mode |
| Foreign keys | ON, reported as `1` | Mandatory on every connection |
| Defensive mode | Enabled | Mandatory; extension loading remains disabled |
| Write transaction | `BEGIN IMMEDIATE` | Use for material mutations to acquire the writer boundary predictably |
| Busy handling | Bounded timeout | Return typed dependency/busy failure after the approved bound |
| Schema | STRICT tables | Use where supported for all Kernel-owned tables |
| Checkpoint | Explicit checkpoint available | Run through storage lifecycle policy, never by arbitrary subsystem code |

SQLite permits concurrent readers but only one simultaneous writer. The Kernel therefore requires one controlled write coordinator per database, short transactions and no network or consumer work inside a transaction.

## Executed scenarios

| Scenario | Expected behaviour | Result |
|---|---|---|
| Explicit commit | All transaction writes persist | Pass |
| Explicit rollback | No transaction write persists | Pass |
| Foreign-key violation | Invalid relation rejected | Pass |
| Failed migration | DDL and schema-version write roll back together | Pass |
| Process termination before commit | Uncommitted write absent after reopen | Pass |
| Process termination after commit | Complete committed write present after reopen | Pass |
| Quick check after crash | Returns `ok` | Pass |
| Full integrity check after crash | Returns `ok` | Pass |
| Concurrent second writer | Bounded busy failure | Pass |
| Retry after writer release | New transaction succeeds | Pass |
| Online backup | Committed data copied | Pass |
| Restored backup | Integrity check returns `ok` | Pass |
| WAL truncate checkpoint | Completes with no busy reader | Pass |

Total: **13 passed of 13 executed scenarios**.

Disposable evidence digests:

| Artefact | SHA-256 |
|---|---|
| Recovery result record | `a81743dc101c580ff671c8aedfd2d7e3e51017812c4fe8e413af16dc93a49595` |
| Test database | `61af02753506611b73028987eb54d3cae10b78a09783732ebad5b66c100596e7` |
| Verified backup | `1ed4868ea9f03a33da7cc4ea3fa351573cd2abc8359d59fbd84b8a425cd56860` |

## Transaction recommendation

Material writes SHALL follow this boundary:

1. Validate input, contract version and permission before opening the transaction where possible.
2. Start `BEGIN IMMEDIATE` through the storage transaction coordinator.
3. Revalidate expected owner version inside the transaction.
4. Write only the owner mutation, mandatory audit acceptance, event/outbox records and operation/idempotency record required for the semantic outcome.
5. Commit once.
6. Treat a returned commit as accepted, but reconcile any interrupted or unknown result by stable operation identifiers before retry.
7. Begin event delivery only after commit.

All caught transaction failures SHALL issue an explicit rollback. SQLite documentation notes that some I/O, full-disk, interrupt and memory failures may roll back a statement or the whole transaction, so the adapter must normalise state through explicit rollback and connection-health checks.

## Recovery strategy

### Normal startup

1. Resolve and validate the configured database path.
2. Open with defensive mode, foreign keys and bounded timeout.
3. Verify application ID, schema version and migration checksums.
4. Run `quick_check` and foreign-key checks.
5. Recover WAL state through normal SQLite open semantics.
6. Reconcile operations with unknown caller outcomes using operation, event and audit identifiers.
7. Rehydrate pending outbox and dead-letter state.
8. Refuse Kernel readiness if integrity, migration or reconciliation remains unsafe.

### Suspected corruption or unclean infrastructure failure

- Stop mission admission and open no writable recovery session until the database and accompanying WAL state are preserved.
- Run full `integrity_check` and foreign-key checks on a protected copy where possible.
- Restore only from a backup whose integrity and application identity pass.
- Record recovery evidence and residual data loss against approved recovery objectives.
- Never delete, rename or copy only part of a live WAL database as a repair shortcut.

### Backup

Use the driver backup API to a controlled temporary target, complete atomically into the approved backup location, then open the backup read-only and run integrity and identity checks. Backup content inherits the source database's highest data classification.

## Failure behaviour

| Failure | Required response |
|---|---|
| `SQLITE_BUSY` | Bounded retry only where operation remains idempotent; otherwise typed blocked result |
| Constraint violation | Roll back and return typed input, state or consistency failure |
| Disk full or I/O error | Explicit rollback attempt, mark connection uncertain, block new work and reconcile |
| Failed migration | Preserve prior compatible schema, block readiness and require reviewed forward repair |
| Integrity failure | Readiness blocked; preserve evidence and invoke recovery procedure |
| Unknown commit result | Query operation/idempotency record before any retry |
| Backup failure | Source remains authoritative; failed target is not an accepted backup |

## Limitations

- Process termination was tested; physical power loss, controller-cache failure and broken filesystem flush behaviour were not reproducible in this environment.
- Disk-full, torn-write and deliberate byte-corruption injection remain mandatory hardening tests.
- Only the Linux x64 execution environment was exercised. Windows and macOS compatibility remain release-matrix work.
- `node:sqlite` is still in active development and can change within the Node 24 line.
- The native `better-sqlite3` candidate could not be installed reproducibly in this sandbox and therefore did not receive comparative runtime tests.

## Recommendation

Select `node:sqlite` from pinned Node.js 24.14.0 as the initial v0.2.0 SQLite adapter, entirely behind the DBOS storage port. Pinning the exact Node patch is required because the SQLite API is not stable. Do not allow direct `node:sqlite` imports outside the adapter.

Before release candidate status:

- rerun the complete adapter suite on Linux, Windows and macOS;
- rerun it against every proposed Node patch update;
- complete disk-full, corruption and backup/restore exercises;
- compare a reproducibly installable `better-sqlite3` adapter if `node:sqlite` changes incompatibly; and
- obtain explicit acceptance of the active-development API risk.

SPK-02 satisfies the transaction and recovery pass condition for a local development runtime. It does not establish suitability for production data or multi-process deployment.
