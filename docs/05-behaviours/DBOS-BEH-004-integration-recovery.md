# Integration and Recovery Behaviour Catalogue

| Field | Value |
|---|---|
| Document ID | DBOS-BEH-004 |
| Status | Approved |
| Covers | Cross-Kernel contracts, failure and recovery |

## Contract and ownership integration

| ID | Requirement | Scenario | Expected observable result | Prohibited result |
|---|---|---|---|---|
| INT-01 | ARC-001 R1; CTR-002 R2 | Component attempts to read undeclared shared state | Access fails and is audited | Hidden dependency succeeds |
| INT-02 | ARC-001 R2; ADR-001 | Project attempts to write task state | Write rejected because Task Manager owns meaning | Competing source of truth |
| INT-03 | ARC-001 R3 | Event Bus consumer asks bus to decide project priority | Operation unsupported | Transport policy becomes domain decision |
| INT-04 | ARC-001 R4 | State mutation reaches owner without permission decision | Owner refuses mutation | Central check assumed sufficient without proof |
| INT-05 | ARC-001 R5; ADR-008 | User notification is suppressed | Audit still records material source action | Suppression erases accountability |
| INT-06 | ARC-001 R6 | Configuration tries to widen grant | Permission scope remains unchanged | Configuration creates authority |
| INT-07 | CTR-001 R2 | Case correction changes meaning | New version with supersession | In-place rewrite |
| INT-08 | CTR-002 R1 | Caller uses unsupported major component contract | Request rejects before work | Best-effort interpretation |
| INT-09 | CTR-003 R2 | Non-owner publishes `TaskCompleted` | Event rejects for producer ownership | False owner event accepted |
| INT-10 | IF-001 postconditions | Query filters inaccessible records | Limitations state filtering; no absence claim | Empty result presented as complete reality |

## Failure containment and recovery

| ID | Requirement | Scenario | Expected observable result | Prohibited result |
|---|---|---|---|---|
| REC-01 | CTR-006 R1–R2 | One parallel component fails | Unsafe dependants stop and verified independent output remains | All output discarded or all work continues |
| REC-02 | CTR-006 R3 | External side-effect times out with unknown result | Reconciliation blocks retry | Duplicate attempt |
| REC-03 | CTR-006 R4 | Primary engine fails and fallback has weaker evidence rules | Fallback refused unless compatible rules are met | Silent safety downgrade |
| REC-04 | CTR-006 R5 | Recovery yields partial artefact | Status names passed and outstanding acceptance | Complete status |
| REC-05 | CTR-006 R6 | Same component fails materially three times | Capability/trust/evolution review signals emit | Repeated blind retry |
| REC-06 | KRN-014 R7 | Event delivery fails after state and audit commit | State remains committed; delivery enters retry/dead letter | Owner state rolled back silently |
| REC-07 | KRN-013 R4 | Configuration activation is uncertain | Effective version reconciles before another activation | Overlapping activation |
| REC-08 | KRN-011 R6 | Engine quarantine occurs with active sessions | New sessions stop; active work is contained and reviewed | Sessions continue without review |
| REC-09 | KRN-012 R6 | Authority revokes during external side effect | No new action; in-flight effect reconciles and mission records status | Automatic destructive rollback |
| REC-10 | KRN-016 R5 | Mandatory audit acceptance fails before side effect | Side effect does not start; mission blocks with preserved request | Effect proceeds unaudited |

## Release-boundary tests

| ID | Requirement | Scenario | Expected observable result | Prohibited result |
|---|---|---|---|---|
| REL-01 | GOV-001 R1 | Release file scan counts subsystem specifications | Exactly sixteen named Kernel subsystem documents | Missing or extra ungoverned subsystem |
| REL-02 | GOV-001 R2 | Required-heading validation runs | Every subsystem contains all nine required sections | Section assumed by reference |
| REL-03 | GOV-001 R5 | Conformance manifest is inspected | DBCA v1.0.0 and exact baseline commit declared | Floating architectural dependency |
| REL-04 | GOV-001 R6 | Repository content scan runs | No executable application source or Assessment Intelligence implementation | Hidden implementation code |
| REL-05 | GOV-001 R7 | Requirement/test traceability is reviewed | Every applicable MUST has behaviour coverage or declared gap | Untested requirement treated as passed |
| REL-06 | GOV-001 R8 | Final validation is performed | Completeness, consistency, boundary and negative results recorded | Version released on document count alone |

