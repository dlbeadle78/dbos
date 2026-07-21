# DBCA to DBOS Traceability Matrix

| Field | Value |
|---|---|
| Document ID | DBOS-ASR-001 |
| Status | Validated |
| DBOS version | 0.1.0 |
| DBCA baseline | v1.0.0 at `035377ca6e5b72bb732d59bc9b528bf337a0c274` |

## Purpose

Demonstrate that controlling DBCA obligations have enforceable DBOS Kernel specifications and observable behavioural scenarios.

| DBCA obligation | DBOS design and decision | Contract or subsystem control | Behaviour evidence |
|---|---|---|---|
| Constitution first and DBCA/DBOS separation | GOV-001–003; ADR-005 | ARC-001; KRN-011 R7 | GOV-04–05; ENG-07; REL-03–04 |
| User-declared operational reality | ARC-002 lifecycle; ADR-003 | CTR-007 R2; KRN-003 R2; KRN-006 R2 | GOV-02; CF-01; MEM-01 |
| Evidence boundary and no assumed access | ARC-002; ADR-001 | CTR-007; KRN-001 R2; KRN-005 | GOV-01; MC-02; TIM-06 |
| Mission-centred architecture | ARC-001–002 | KRN-001; CTR-002; KRN-010 | MC-01–07; STA-01–08 |
| Human authority and least permission | ADR-004 | CTR-004; KRN-012 | GOV-03; PER-01–08 |
| Progressive, capability-specific trust | ADR-005 | CTR-008; KRN-011 R4–R5 | ENG-04–05; REC-08 |
| Immutable meaning and temporal truth | ADR-003 | CTR-001; CTR-005; CTR-007; KRN-009 | CF-04; DEC-03; TIM-01–07; INT-07 |
| Contract-driven, loose coupling | ADR-001–002 | CTR-001–008; IF-001–002 | INT-01–18; EVT-01–07 |
| Quality by design and dual-error checks | ARC-002 | CTR-006; BEH-000 | MC-04–05; REC-01–10; REL-05–06 |
| Safe degradation and recovery | ADR-002; ADR-008 | CTR-006; KRN-010; KRN-014; KRN-016 | STA-07; EVT-07; AUD-04; REC-01–10 |
| Observable decisions without private reasoning | ADR-008 | KRN-007; KRN-016; IF-002 | DEC-01–05; AUD-01–07 |
| Minimum necessary context and privacy | ADR-001; ADR-007 | KRN-003 R7; KRN-005 R7; KRN-006 R7; KRN-016 R4 | CF-06; CTX-07; MEM-05; AUD-03 |
| Portfolio status within known evidence | ADR-001 | KRN-004 R4–R5; KRN-009 R7 | PRJ-04–05; TIM-06 |
| Assessment professional integrity | GOV-001 exclusion; ADR-005 | KRN-011 R7 | GOV-04; ENG-07; REL-04 |

## Traceability decision

No DBCA architectural obligation applicable to the Kernel is intentionally weakened or left without a DBOS control. Assessment-specific DBCA requirements are outside v0.1.0 and protected by explicit exclusion tests rather than partially implemented.

