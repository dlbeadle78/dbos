# DBOS-ADR-015: Secret References, Data Classification and Content Minimisation

| Field | Value |
|---|---|
| Status | Accepted |
| Decision date | 2026-07-21 |
| Scope | Secret handling, data classification, logging, events, audit and persistence |
| DBCA authority | PRI-001 principle 3; ARC-008; ARC-009; ES-010; ES-011 |
| Supersedes | None |
| Depends on | DBOS-ADR-003; DBOS-ADR-006; DBOS-ADR-007; DBOS-ADR-008; DBOS-ADR-011 |

## Context

Kernel records may contain mission context, evidence, decisions, memory and operational diagnostics. DBCA requires minimum necessary context and observable decisions without exposing private reasoning. Configuration already prohibits ordinary secret values, but the runtime needs a uniform classification and redaction boundary.

## Problem Statement

Prevent credentials, sensitive evidence and unnecessary personal information from spreading through configuration, logs, events, fixtures, audit or backups while retaining sufficient accountability and recovery evidence.

## Decision

Every persisted or transmitted field SHALL have one data class:

- **Public:** safe for intentional public release;
- **Internal:** operational metadata with no sensitive content;
- **Confidential:** mission, evidence or personal content requiring scoped access;
- **Restricted:** credentials, authentication material or exceptionally sensitive content.

Unclassified fields are treated as Restricted until classified. Records SHALL contain the minimum data required by their owner and purpose.

Secret values SHALL never be ordinary configuration values. Configuration stores opaque secret references. A secret resolver port MAY resolve a reference only at the operation boundary authorised to use it. Resolved values SHALL not be persisted by DBOS, emitted in events, included in audit payloads, logged, placed in fixtures or returned through diagnostic interfaces.

Domain events SHOULD carry stable references and safe summaries instead of evidence bodies. Audit records capture actor, operation, authority, target, outcome, versions, timestamps and integrity references, not private reasoning or unnecessary source content.

The structured logger SHALL allow listed safe fields, redact before serialisation and reject arbitrary object logging. Stack and error detail SHALL be filtered according to classification. Backups inherit the highest classification of their content.

Retention, expiry and deletion SHALL follow an approved class-and-record-type matrix. Where immutable accountability prevents deletion, access restriction and cryptographic or reference-level tombstoning require explicit policy. No production-like personal or secret data is allowed in automated test fixtures.

## Alternatives Considered

- **Encrypt everything without classification:** protects storage but does not control overcollection, logs, events or access scope.
- **Rely on developer judgement:** produces inconsistent handling and silent disclosure risk.
- **Store secrets in environment variables as ordinary configuration:** makes provenance and accidental logging difficult to control.
- **Copy full content into events and audit:** simplifies queries but violates minimisation and multiplies exposure.
- **Redact after log output:** is too late once a sink receives the value.

## Consequences

- Schema design and reviews must classify every field.
- Some diagnostics use secure references instead of embedded content.
- Secret-dependent adapters remain unavailable until a resolver is configured and authorised.
- Retention and backup controls become part of release assurance.
- Search and replay may require authorised dereferencing of source records.

## Risks

- Misclassification may expose data or make operation impractical.
- Reference targets may expire while audit history remains.
- Redaction may remove information needed for diagnosis.
- Secret values may leak through dependency errors or stack traces.
- Immutable records may conflict with later deletion duties.

## Mitigations

- Default unknown fields to Restricted and require schema-level classification.
- Store integrity digests and safe metadata when source content expires.
- Test both leakage prevention and minimum diagnostic usefulness.
- Wrap dependency errors into typed safe failures before logging or return.
- Approve the retention matrix and legal/policy basis before production data use.
- Add automated secret-pattern and fixture scans as defence in depth.

## Traceability back to DBCA

| DBCA obligation | DBOS realisation |
|---|---|
| PRI-001 minimum necessary access and context | Field classification, reference-based transfer and data minimisation |
| ARC-008 and ARC-009 context and temporal boundaries | Scoped context, validity and retained source references |
| ES-010 safe failure | Typed sanitised failures do not disclose restricted content |
| ES-011 accountable decisions | Audit retains decision evidence without private reasoning or full source bodies |

## Affected Kernel Subsystems

Configuration, Context Manager, Memory Manager, Case File Manager, Decision Log, Event Bus, Notification System, Audit Trail, Engine Loader and observability/storage adapters. The controls apply to every subsystem schema.

## Future Impact

Production or regulated data requires an approved retention matrix, access model, breach response and encryption/key-management decision. External secret stores can implement the resolver port. New event, log, audit or engine contracts require classification review before acceptance.
