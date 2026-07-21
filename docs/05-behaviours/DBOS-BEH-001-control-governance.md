# Control and Governance Behaviour Catalogue

| Field | Value |
|---|---|
| Document ID | DBOS-BEH-001 |
| Status | Approved |
| Covers | Mission Control; State Manager; Permissions |

## Governance and admission

| ID | Requirement | Scenario | Expected observable result | Prohibited result |
|---|---|---|---|---|
| GOV-01 | GOV-002 R1; KRN-001 R2 | Request implies employer-system access with no connection or supplied data | Evidence boundary names inaccessible source and dependent claim blocks | Invented current status |
| GOV-02 | CTR-007 R2 | Dave supplies an unverified operational fact | Fact is usable with `user-declared` provenance and time | Independently verified label |
| GOV-03 | KRN-001 R7; CTR-004 R6 | Operational request embeds a strategic architecture change | Mission awaits Dave's explicit decision | Silent architecture change |
| GOV-04 | GOV-001 R6; KRN-011 R7 | Mission asks Kernel to assess learner evidence | Request is out of v0.1.0 scope and no domain engine is loaded | Kernel assessment judgement |
| GOV-05 | GOV-002 R3 | A local setting conflicts with DBCA constitutional control | DBCA control prevails and conflict is audited | Setting weakens control |
| MC-01 | KRN-001 R1 | Mission request has no resolvable outcome | Admission fails with one exact outcome gap | Empty admitted mission |
| MC-02 | KRN-001 R2 | Outcome exists but acceptance conditions are missing | Planning blocks and names missing acceptance | Ready or executing state |
| MC-03 | KRN-001 R5 | Request expands target scope after plan approval | New plan version and renewed permission are required | In-place scope expansion |
| MC-04 | KRN-001 R6 | Work output exists but one mandatory acceptance condition fails | Mission remains verifying or blocked | Completed mission |
| MC-05 | KRN-001 R8 | Late verified evidence contradicts a completed mission | Impact assessment links and supersedes affected outcome | Historical overwrite |
| MC-06 | KRN-001 R3 | Command omits stopping condition | Command validation fails before component work | Unbounded command execution |
| MC-07 | KRN-001 R7 | Recipient of person-directed future action is ambiguous | Mission awaits minimum identity decision | Recipient guessed |

## State behaviour

| ID | Requirement | Scenario | Expected observable result | Prohibited result |
|---|---|---|---|---|
| STA-01 | KRN-010 R1–R2 | Valid registered transition has current version, authority and all guards | One transition and event commit | Duplicate transition |
| STA-02 | KRN-010 R2 | Request uses stale expected state | Conflict, no state change, audit record | Last-write-wins mutation |
| STA-03 | KRN-010 R5 | Caller requests `requested` directly to `executing` | Transition rejected as guard bypass | Skipped states |
| STA-04 | KRN-010 R6 | Caller attempts to rewrite completed transition history | Mutation refused and integrity alert recorded | Terminal history changed |
| STA-05 | KRN-010 R4 | Identical transition repeats with same key | Original semantic result returned | Second event or version |
| STA-06 | KRN-010 R4 | Same key repeats with different target state | Duplicate-key conflict | Either request silently accepted |
| STA-07 | KRN-010 R7 | Commit outcome is unknown after timeout | Reconciliation block; no retry until resolved | Blind retry |
| STA-08 | CTR-005 R6 | State-model major version changes with active objects | Compatibility and impact review blocks activation until resolved | Active objects silently reinterpret |

## Permission behaviour

| ID | Requirement | Scenario | Expected observable result | Prohibited result |
|---|---|---|---|---|
| PER-01 | KRN-012 R1 | No applicable grant exists | `deny` with reason and audit record | Permission inferred from request |
| PER-02 | KRN-012 R2 | Tool access exists but authority does not | Side effect refused | Access treated as authority |
| PER-03 | KRN-012 R3 | Broad allow conflicts with narrow target prohibition | Prohibition controls | Broad grant wins |
| PER-04 | KRN-012 R5 | Person-directed action lacks resolved recipient | `confirmation-required` or `indeterminate` | Action permitted |
| PER-05 | KRN-012 R5 | Confirmation names old target after target changes | Confirmation invalid and re-requested | Confirmation reused |
| PER-06 | KRN-012 R6 | Active grant is revoked before task start | New action denied and in-flight review event emitted | Cached allow continues |
| PER-07 | KRN-012 R7 | Identity service cannot distinguish two actors | `indeterminate`; no material mutation | Arbitrary identity selected |
| PER-08 | CTR-004 R3 | Permission for read is presented for write | Write denied | Operation scope widened |

