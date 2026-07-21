# Audit Trail Specification

| Field | Value |
|---|---|
| Document ID | DBOS-KRN-016 |
| Status | Approved |
| Version | 0.1.0 |
| DBCA authority | Constitution Article 9; ES-011; ES-010 |

## Purpose

Preserve proportionate, tamper-evident evidence of material Kernel actions, decisions, authority, state, failures and recovery.

## Responsibilities

- Accept required audit records independently of ordinary user notification.
- Validate actor, action, target, correlation, authority, time and outcome semantics.
- preserve append-only sequence and integrity linkage.
- Provide permission-filtered audit searches, evidence packages and integrity verification.
- Apply retention, legal hold, redaction and authorised disposal policy.
- Detect gaps, tampering, clock anomalies and required-record failure.

## Non-responsibilities

Audit Trail does not store every content item, record private hidden reasoning, authorise surveillance, replace domain events or make a failed action successful.

## Inputs

`AuditRecord`, actor/component identity and version, action, target reference, mission/correlation, authority decision, input/output references, state change, side-effect status, failure/recovery, event/recorded time, sensitivity and retention class.

## Outputs

Audit receipt, ordered audit view, integrity verification, gap alert, evidence package, retention outcome and disposal certificate.

## Interfaces

| Interface | Behaviour |
|---|---|
| `IF-AUD-01 AppendAuditRecord` | Validate and append a required material record |
| `IF-AUD-02 VerifyIntegrity` | Check sequence, linkage, time and referenced-record consistency |
| `IF-AUD-03 QueryAuditTrail` | Return a minimum-necessary authorised view |
| `IF-AUD-04 BuildEvidencePackage` | Produce a bounded export manifest with integrity evidence |
| `IF-AUD-05 PlaceRetentionHold` | Prevent disposal under authorised hold |
| `IF-AUD-06 ApplyRetentionOutcome` | Redact or dispose content under policy while preserving required proof |

## State

Audit records are append-only and may be `active`, `restricted`, `retention-hold`, `redacted` or `disposed-content`. Integrity chain state is `healthy`, `degraded`, `gap-detected`, `verification-failed` or `recovering`. Redaction never rewrites the fact that a record existed.

## Requirements and invariants

- `DBOS-KRN-016-R1`: material permission, state, decision, configuration, engine, side-effect, security and recovery actions MUST create an audit record.
- `DBOS-KRN-016-R2`: records MUST identify actor/component version, action, target, authority, time, correlation and outcome.
- `DBOS-KRN-016-R3`: audit records MUST be immutable in meaning and integrity-linked in append order.
- `DBOS-KRN-016-R4`: audit payloads MUST minimise personal data, secrets, source content and private reasoning.
- `DBOS-KRN-016-R5`: audit failure for a mandatory high-impact action MUST block that action unless an approved emergency policy says otherwise and records recovery evidence.
- `DBOS-KRN-016-R6`: access to the audit trail itself MUST be audited.
- `DBOS-KRN-016-R7`: retention and disposal MUST preserve applicable legal, contractual and integrity obligations.

## Dependencies

Requires Configuration, Permissions and Timeline. Audit Trail is a terminal assurance dependency: it MUST NOT depend on Event Bus availability to accept mandatory records, though it MAY publish health alerts through Event Bus.

## Future extension points

External integrity anchors, formal evidence exports, anomaly detection and independent review roles MAY be added. They cannot expand retention or surveillance without explicit purpose and authority.

## Failure behaviour

Invalid record, integrity mismatch, storage unavailability, sequence gap, unauthorised query and retention conflict return typed failures. Mandatory-record failure blocks the initiating high-impact mutation. Degraded operation queues bounded records only under approved policy and raises an immediate integrity alert.

## Observability, security and privacy

Health exposes append latency, gaps, failed verification, retention backlog and unauthorised access attempts without revealing protected content. Audit access follows least privilege and purpose limitation.

