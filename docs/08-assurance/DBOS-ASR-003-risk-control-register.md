# Kernel Architecture Risk and Control Register

| Field | Value |
|---|---|
| Document ID | DBOS-ASR-003 |
| Status | Accepted |
| Version | 0.1.0 |

| ID | Risk | Preventive control | Detection | Recovery owner |
|---|---|---|---|---|
| RSK-01 | Competing sources of truth | ADR-001; canonical ownership table | INT-02; projection version checks | Owning subsystem |
| RSK-02 | State-guard bypass | State Manager sole transition authority | STA-02–04; audit alerts | State Manager |
| RSK-03 | Access mistaken for authority | Central permission contract; local enforcement | PER-01–08 | Permissions and state owner |
| RSK-04 | Stale or over-broad context | Versioned context packages and evidence boundaries | CTX-03–07 | Context Manager |
| RSK-05 | Duplicate external side effect | Idempotency and reconciliation contract | REC-02; unknown-effect status | Task owner and Mission Control |
| RSK-06 | Engine trust leakage | Versioned manifest, session isolation and trust reset | ENG-04–06 | Engine Loader |
| RSK-07 | Silent contract downgrade | Major-version rejection | ENG-02; INT-08; INT-18 | Interface owner |
| RSK-08 | Event loss or duplicate processing | Immutable IDs, local sequence, at-least-once idempotency | EVT-02–07 | Event Bus and consumer |
| RSK-09 | Notification noise or wrong recipient | Deduplication, recipient resolution and channel authority | NOT-01–07 | Notification System |
| RSK-10 | Audit gap during high-impact action | Independent mandatory audit acceptance | AUD-04; REC-10 | Audit Trail and action owner |
| RSK-11 | Sensitive content copied into logs | References, redaction and sensitivity contracts | AUD-03; INT-16 | Record owner and Audit Trail |
| RSK-12 | Assessment logic enters Kernel | Explicit release exclusion and no domain engine | GOV-04; ENG-07; REL-04 | Release owner |
| RSK-13 | Configuration weakens governance | Typed definitions and governing precedence | CFG-02; INT-06 | Configuration and Permissions |
| RSK-14 | False completion | Acceptance evidence and side-effect reconciliation | MC-04; TSK-04–05; PRJ-06 | Mission Control |
| RSK-15 | Historical truth overwritten | Append-only versions and supersession | CF-04; TIM-07; INT-07 | Record owner |
| RSK-16 | Incomplete external visibility presented as current | Source freshness and inaccessible-source declarations | GOV-01; PRJ-04; TIM-06 | Projection owner |

## Residual risk

Technology-specific concurrency, storage, authentication, cryptographic integrity, deployment and operational-availability risks remain unassessed because v0.1.0 deliberately selects no implementation stack. DBOS-ASR-005 prevents runtime work from treating this specification review as technology assurance.

