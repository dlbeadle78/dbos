# DBOS Architecture Decision Records

DBOS ADRs record durable implementation-boundary decisions made within the authority of DBCA v1.0.0. They do not amend DBCA.

The DBOS v0.2.0 approval cover sheet is `DBOS-ADR-PKG-001-v0.2.0-approval-package.md`.

| ADR | Decision | Status |
|---|---|---|
| DBOS-ADR-001 | Single-owner state with derived projections | Accepted |
| DBOS-ADR-002 | Contracted events for cross-subsystem facts | Accepted |
| DBOS-ADR-003 | Append-only semantic versioning and supersession | Accepted |
| DBOS-ADR-004 | Central permission evaluation with local enforcement | Accepted |
| DBOS-ADR-005 | Manifest-gated, isolated engine loading | Accepted |
| DBOS-ADR-006 | Layered, versioned configuration | Accepted |
| DBOS-ADR-007 | Notification separated from state and events | Accepted |
| DBOS-ADR-008 | Audit acceptance independent of Event Bus delivery | Accepted |
| DBOS-ADR-009 | TypeScript and Node.js runtime baseline | Accepted |
| DBOS-ADR-010 | Modular monolith and package dependency rules | Accepted |
| DBOS-ADR-011 | Embedded SQLite persistence and transaction boundaries | Accepted |
| DBOS-ADR-012 | Two-phase bootstrap and controlled shutdown | Accepted |
| DBOS-ADR-013 | Local single-operator identity boundary | Accepted |
| DBOS-ADR-014 | Durable Event Journal, transactional outbox and audit atomicity | Accepted |
| DBOS-ADR-015 | Secret references, data classification and content minimisation | Accepted |
| DBOS-ADR-016 | Local deployment boundary and external-I/O prohibition | Accepted |

The v0.2.0 ADR set was reviewed collectively in DBOS-ASR-006 and approved on 2026-07-21. Approval authorises bounded technical spikes only; it does not bypass DBOS-ASR-005 or authorise runtime implementation.
