# Kernel Contract Register

These contracts define the canonical semantics shared by DBOS Kernel subsystems. They specialise DBCA v1.0.0 without prescribing programming languages, storage schemas or transport.

| Contract | Purpose |
|---|---|
| `DBOS-CTR-001` | Canonical record identity, version and provenance |
| `DBOS-CTR-002` | Component command, query and response envelopes |
| `DBOS-CTR-003` | Immutable domain event envelope |
| `DBOS-CTR-004` | Permission request, grant and decision |
| `DBOS-CTR-005` | State model and transition semantics |
| `DBOS-CTR-006` | Typed failure, containment and recovery |
| `DBOS-CTR-007` | Temporal and evidence-boundary semantics |
| `DBOS-CTR-008` | Engine manifest and load session |

Contract versions are independent but compatible with DBOS v0.1.0. A consumer MUST reject an unsupported major contract version and MAY accept compatible minor additions when unknown optional fields are safely ignored.

