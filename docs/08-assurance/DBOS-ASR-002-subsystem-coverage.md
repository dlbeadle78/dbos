# Subsystem Completeness and Coverage Matrix

| Field | Value |
|---|---|
| Document ID | DBOS-ASR-002 |
| Status | Validated |
| Version | 0.1.0 |

## Required-section result

Every subsystem contains purpose, responsibilities, inputs, outputs, interfaces, state, dependencies, future extension points and failure behaviour. Each also defines non-responsibilities, requirements/invariants and observability/security/privacy.

| ID | Subsystem | Main contracts | Interfaces | Principal behaviours | Result |
|---|---|---|---|---|---|
| KRN-001 | Mission Control | CTR-002, CTR-004, CTR-006, CTR-007 | IF-MC-01–07 | GOV-01–05; MC-01–07 | Complete |
| KRN-002 | Workspace Manager | CTR-001, CTR-004 | IF-WS-01–06 | WS-01–06 | Complete |
| KRN-003 | Case File Manager | CTR-001, CTR-007 | IF-CF-01–07 | CF-01–06 | Complete |
| KRN-004 | Project Manager | CTR-001, CTR-005, CTR-007 | IF-PRJ-01–07 | PRJ-01–06 | Complete |
| KRN-005 | Context Manager | CTR-001, CTR-007 | IF-CTX-01–05 | CTX-01–07 | Complete |
| KRN-006 | Memory Manager | CTR-001, CTR-007 | IF-MEM-01–06 | MEM-01–05 | Complete |
| KRN-007 | Decision Log | CTR-001, CTR-004, CTR-007 | IF-DEC-01–06 | DEC-01–05 | Complete |
| KRN-008 | Task Manager | CTR-002, CTR-004, CTR-005, CTR-006 | IF-TSK-01–07 | TSK-01–07 | Complete |
| KRN-009 | Timeline | CTR-001, CTR-003, CTR-007 | IF-TIM-01–06 | TIM-01–07 | Complete |
| KRN-010 | State Manager | CTR-004, CTR-005, CTR-006 | IF-STA-01–06 | STA-01–08 | Complete |
| KRN-011 | Engine Loader | CTR-002, CTR-004, CTR-008 | IF-ENG-01–06 | ENG-01–07 | Complete |
| KRN-012 | Permissions | CTR-004 | IF-PER-01–06 | PER-01–08 | Complete |
| KRN-013 | Configuration | CTR-001, CTR-004, CTR-005 | IF-CFG-01–06 | CFG-01–07 | Complete |
| KRN-014 | Event Bus | CTR-003, CTR-006 | IF-EVT-01–06 | EVT-01–07 | Complete |
| KRN-015 | Notification System | CTR-003, CTR-004, CTR-006 | IF-NOT-01–06 | NOT-01–07 | Complete |
| KRN-016 | Audit Trail | CTR-001, CTR-004, CTR-006, CTR-007 | IF-AUD-01–06 | AUD-01–07 | Complete |

## Cross-cutting coverage

Integration ownership and contract behaviour is covered by INT-01–18. Failure containment and recovery is covered by REC-01–10. Release-boundary and completeness behaviour is covered by REL-01–06.

## Decision

All sixteen requested Kernel subsystems meet the DBOS-GOV-001 R2 documentation obligation and have positive, negative and failure-path behavioural coverage suitable for future executable implementation.

