# Work and Knowledge Behaviour Catalogue

| Field | Value |
|---|---|
| Document ID | DBOS-BEH-002 |
| Status | Approved |
| Covers | Workspace; Case File; Project; Context; Memory; Decision; Task; Timeline |

## Workspace and case files

| ID | Requirement | Scenario | Expected observable result | Prohibited result |
|---|---|---|---|---|
| WS-01 | KRN-002 R2 | Authorised case is linked to a workspace | Link stores stable reference and version policy only | Case content copied into workspace |
| WS-02 | KRN-002 R3 | Member queries workspace containing one inaccessible case | View omits protected case and states filtering limitation | Omission stated as non-existence |
| WS-03 | KRN-002 R4 | Active child mission exists when workspace is archived | Workspace archives; mission state is unchanged | Child mission cancelled |
| WS-04 | KRN-002 R5 | Membership is revoked during an active view session | New reads stop and in-flight access review is emitted | Access continues to expiry without review |
| CF-01 | KRN-003 R1–R2 | User-declared case entry is registered | Provenance and temporal fields persist | Entry labelled verified |
| CF-02 | KRN-003 R3 | Two sources assert incompatible current status | Both versions remain and dispute surfaces | Later record silently overwrites earlier one |
| CF-03 | KRN-003 R4 | No case entry mentions a condition | View reports no record found, not condition absent | Absence claim |
| CF-04 | KRN-003 R5 | Source corrects a material date | New version supersedes old with reason | Original date deleted |
| CF-05 | KRN-003 R6 | Disposal requested during retention hold | Disposal blocked and hold owner identified | Content removed |
| CF-06 | KRN-003 R7 | Broad case requested for narrow mission purpose | View contains only necessary authorised entries | Full file disclosure |

## Projects and tasks

| ID | Requirement | Scenario | Expected observable result | Prohibited result |
|---|---|---|---|---|
| PRJ-01 | KRN-004 R1 | Project lacks owner and acceptance measures | Approval blocked with exact gaps | Active project |
| PRJ-02 | KRN-004 R2 | New dependency closes a cycle | Change rejected and cycle reported | Cyclic executable plan |
| PRJ-03 | KRN-004 R3 | Approved scope changes | Impact and authorised new baseline recorded | Original baseline rewritten |
| PRJ-04 | KRN-004 R4 | Child status is old and external source inaccessible | Projection states stale source and unknown current status | Current status asserted |
| PRJ-05 | KRN-004 R5 | Project view receives task completion event | Projection updates; task owner record remains unchanged | Project writes task state |
| TSK-01 | KRN-008 R1 | Task has no acceptance condition | Creation or readiness blocks | Executable task |
| TSK-02 | KRN-008 R2 | Mandatory predecessor is blocked | Dependant task remains planned/blocked | Ready state |
| TSK-03 | KRN-008 R3 | Non-idempotent side effect lacks reconciliation rule | Readiness fails | Task starts |
| TSK-04 | KRN-008 R4 | Progress report says 100% without result evidence | Progress records claim but completion does not occur | Accepted completion |
| TSK-05 | KRN-008 R5 | Output is present and all acceptance passes | Task completes with result, event and audit references | Completion before side-effect check |
| TSK-06 | KRN-008 R6 | One independent parallel task fails | Dependants stop; unrelated verified task remains | All work discarded or all work continues |
| TSK-07 | KRN-008 R7 | Action target changes after readiness | Task definition superseded and revalidated | Old ready task executes new target |

## Context, memory and decisions

| ID | Requirement | Scenario | Expected observable result | Prohibited result |
|---|---|---|---|---|
| CTX-01 | KRN-005 R1 | Context package includes mixed evidence types | Every item retains class, source, time and verification | Types collapsed into facts |
| CTX-02 | KRN-005 R2 | Relevant preference conflicts with constitutional prohibition | Prohibition retains protected priority and conflict surfaces | Preference displaces governance |
| CTX-03 | KRN-005 R3 | Engine requests undeclared case context | Read denied and attempt audited | Hidden context read |
| CTX-04 | KRN-005 R4 | Two current sources conflict | Package becomes conflicted/limited | Rank silently resolves truth |
| CTX-05 | KRN-005 R5 | Summary budget is small | Constraints, exclusions and unknowns remain even if topics compress | Decisive negative constraint omitted |
| CTX-06 | KRN-005 R6 | Source version changes materially | Existing package invalidates and refresh creates new version | Old package remains valid for new work |
| MEM-01 | KRN-006 R1–R2 | One user edit is proposed as durable preference | Candidate retains local scope pending evidence | Global rule automatically created |
| MEM-02 | KRN-006 R3 | Retrieved memory says a deadline but has expired | Result labels expired and requires verification | Current deadline asserted |
| MEM-03 | KRN-006 R5 | Active memory conflicts with new verified source | Conflict reduces reliance and informs Context Manager | Memory wins by age or convenience |
| MEM-04 | KRN-006 R6 | Forget request conflicts with legal hold | Content remains restricted and reason is recorded | Destructive forgetting |
| DEC-01 | KRN-007 R1–R2 | System recommendation exists without Dave's confirmation | State remains awaiting-owner | Recommendation recorded as Dave's decision |
| DEC-02 | KRN-007 R3 | Decision rationale source is unavailable | Record states unavailable rationale reference; no invention | Fabricated reasoning |
| DEC-03 | KRN-007 R5 | Query asks decision as of time before supersession | Historical applicable decision returned | Current decision retroactively applied |
| DEC-04 | KRN-007 R6 | Late evidence overlaps decision validity | Decision enters review and affected missions are identified | No impact action |

## Timeline

| ID | Requirement | Scenario | Expected observable result | Prohibited result |
|---|---|---|---|---|
| TIM-01 | KRN-009 R1 | Material deadline has no timezone | Time remains explicitly ambiguous and critical reliance blocks | Local timezone guessed |
| TIM-02 | KRN-009 R2 | Planned milestone is next week | Projection labels planned/future | Current milestone state |
| TIM-03 | KRN-009 R3 | Request says ‘tomorrow’ with base 21 July 2026 Europe/London | Resolves to 22 July 2026 in that timezone | Server-local interpretation |
| TIM-04 | KRN-009 R5 | Evidence recorded late overlaps completed decision interval | Overlap event identifies decision | Retroactive overwrite |
| TIM-05 | KRN-009 R6 | Due-trigger evaluation repeats | One semantic due event for rule and instant | Duplicate notification cascade |
| TIM-06 | KRN-009 R7 | Report asks for calendar commitments with no calendar adapter | View states inaccessible source | Complete-calendar claim |

