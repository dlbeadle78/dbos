# DBOS-SPK-003: Event, Audit and Transactional Outbox Atomicity

| Field | Value |
|---|---|
| Status | Completed |
| Result | Pass |
| Execution date | 2026-07-21 |
| DBOS baseline | v0.1.0 at `d142b25c361e809c90edca74013d2bb13b6f5065` |
| Governing decisions | DBOS-ADR-002; DBOS-ADR-008; DBOS-ADR-011; DBOS-ADR-014 |
| Environment | Node.js 24.14.0; `node:sqlite`; SQLite 3.51.2; WAL/FULL |
| Repository impact | Documentation only; disposable database and harness excluded |

## Objective

Validate that a local transactional outbox can preserve owner state, the required domain event, mandatory Audit Trail acceptance and delivery intent as one semantic outcome across failure, crash, duplicate delivery, replay and ordering scenarios.

## Proposed transactional design

One material mutation uses a single local SQLite transaction containing:

1. a stable operation/idempotency record;
2. the owner state mutation or append-only successor;
3. the immutable domain event;
4. the mandatory Audit Trail acceptance record; and
5. one pending outbox record referencing the event.

Database relationships require every accepted material operation to identify its event and audit record. The event identifies its owner source and mandatory audit record. The outbox identifies the committed event. Deferred foreign-key constraints permit these mutually linked records to be assembled inside one transaction while rejecting an incomplete set at commit.

Event delivery, consumer execution, notifications and any future external effect occur only after commit and outside this transaction.

## Logical ownership

Shared transaction timing does not merge subsystem meaning:

- the domain subsystem owns the source record;
- Event Bus owns journal and delivery state;
- Audit Trail owns accountability records and access semantics;
- the operation coordinator owns only transaction orchestration, not domain meaning; and
- consumers own their projection or reaction outcome.

Audit acceptance uses the Audit Trail logical interface. It is not produced later by an ordinary Event Bus consumer. This preserves DBOS-ADR-008.

## Executed scenarios

| Scenario | Expected behaviour | Result |
|---|---|---|
| Normal material mutation | State, operation, event, audit and outbox commit | Pass |
| Post-commit completeness | All four cross-record sets present | Pass |
| Failure after owner state write | Entire transaction rolls back | Pass |
| Failure after event write | Entire transaction rolls back | Pass |
| Failure after audit write | Entire transaction rolls back | Pass |
| Failure after outbox write | Entire transaction rolls back | Pass |
| Process crash before commit | No accepted operation remains | Pass |
| Crash-before state protection | Prior owner state remains | Pass |
| Process crash after commit | Complete semantic outcome remains | Pass |
| Duplicate idempotency identity | Original event outcome retained | Pass |
| Conflicting idempotency reuse | No conflicting event accepted | Pass |
| Duplicate event delivery | One semantic consumer effect | Pass |
| Duplicate delivery observability | Both attempts counted | Pass |
| Duplicate producer sequence | Rejected atomically | Pass |
| Producer event ordering | Source sequence strictly monotonic | Pass |
| Replay | Original event remains singular; replay context separate | Pass |
| Delivery exhaustion | Event retained with explicit dead letter | Pass |
| Dead-lettered event | Mandatory audit remains present | Pass |
| Cross-record foreign keys | No violations | Pass |
| Database integrity | Returns `ok` after all scenarios | Pass |

Total: **20 passed of 20 executed scenarios**.

Final committed counts were three operations, three events, three audit records and three outbox records: genesis, normal success and crash-after-commit. Every deliberately failed or conflicting operation left zero accepted semantic records.

Disposable evidence digests:

| Artefact | SHA-256 |
|---|---|
| Atomicity result record | `cece278f0459f8e86b1f2cbf77a0fb9d0bbc71a17ab26119c43b041071496418` |
| Atomicity test database | `ddcda2f92d3525022c578a244d76a141b97c19f29b0ca0055ed2f67d5ae4b0fb` |

## Audit guarantees

The tested design supports these guarantees for local SQLite transactions:

- no policy-mandated material mutation is accepted without its audit record;
- audit acceptance is committed at the same boundary as owner state and the event;
- ordinary delivery failure cannot remove or defer mandatory audit acceptance;
- audit identity and event identity are mutually traceable but remain distinct;
- dead-letter or replay operations do not alter the original audit outcome; and
- failed pre-commit attempts create no false accepted audit record.

An attempted action that fails before acceptance may still require a separate failure/security audit record. That record is a new accountability fact and must not be inserted into the rolled-back domain transaction as if the mutation succeeded.

## Ordering guarantees

The design SHALL guarantee:

- a unique, monotonic `source_sequence` per producer;
- no two events from one producer with the same sequence;
- delivery selection ordered by producer and source sequence where a consumer requires local order;
- independent ordering and checkpoints per consumer; and
- original event identity, event time and source sequence during replay.

The design SHALL NOT claim:

- one global order across producers;
- exactly-once delivery;
- exactly-once external side effects; or
- that delivery order can repair invalid owner state.

Where a consumer observes a sequence gap, it pauses that producer stream, records the gap and reconciles before applying later order-dependent events. Order-independent consumers may continue only where their declared contract permits it.

## Delivery and idempotency

Each consumer maintains a unique `(consumer_id, event_id)` semantic-effect key. Delivery may occur more than once, but repeating the same event cannot create a second semantic effect. Attempt count, last failure, next retry and acknowledgement remain independently observable.

The dispatcher SHALL:

1. select committed pending records after the owning transaction closes;
2. validate event version and consumer authority;
3. invoke the consumer with event and delivery context;
4. commit consumer effect and acknowledgement atomically where both share the local database;
5. retain pending state after transient failure;
6. move exhausted delivery to an owned dead letter; and
7. never reverse the producer's committed domain fact because delivery failed.

## Recovery behaviour

### Unknown mutation result

Query the stable operation ID. If its operation, event, audit and outbox links all exist and pass integrity constraints, return the original accepted outcome. If none exists, the operation may be retried under the original idempotency key. Any partial set is an integrity failure that blocks mission admission.

### Pending delivery after restart

Reload committed outbox records in `pending` state and resume from consumer checkpoints. A consumer must re-check its idempotency record before applying an effect.

### Crash during consumer processing

If consumer effect and acknowledgement share one local transaction, both persist or neither does. If a future consumer performs an external effect, it requires a separate effect ledger, confirmation evidence and unknown-outcome reconciliation; the outbox transaction cannot span that external system.

### Dead letter

Retain the immutable event, mandatory audit and attempt history. Assign a recovery owner. Replay uses a distinct replay-session identifier and cannot modify the original occurrence.

## Failure and integrity controls

- Use stable operation, event, audit and consumer identifiers with unique constraints.
- Use deferred foreign keys for the required operation/event/audit cycle.
- Validate owner version and permission immediately before mutation.
- Use one source-sequence allocator inside the producer's write transaction.
- Bound retry and make retry policy consumer-specific.
- Keep dead-letter ownership separate from source-domain ownership.
- Run cross-record reconciliation before Kernel readiness after unclean shutdown.
- Treat any accepted owner record without its required event or audit link as a critical integrity blocker.

## Limitations

- The spike used one process and one SQLite database, matching ADR-010 and ADR-016.
- It did not test a network broker, multiple databases or distributed transactions.
- It did not execute external side effects, which remain prohibited for v0.2.0.
- High-volume throughput, long-running consumers and starvation require later performance tests.
- Physical power-loss limitations from SPK-02 also apply.

## Recommendation

Adopt the tested local transaction boundary and durable in-process outbox design. Require relational integrity between operation, owner, event, audit and outbox records; at-least-once delivery; idempotent consumers; per-producer ordering; explicit dead letters; and restart reconciliation.

SPK-03 satisfies its pass condition. This proves the design is viable under the tested local failure model. It does not authorise runtime implementation or any external-effect adapter.
