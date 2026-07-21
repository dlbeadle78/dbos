# Runtime and Infrastructure Behaviour Catalogue

| Field | Value |
|---|---|
| Document ID | DBOS-BEH-003 |
| Status | Approved |
| Covers | Engine Loader; Configuration; Event Bus; Notification; Audit Trail |

## Engine Loader

| ID | Requirement | Scenario | Expected observable result | Prohibited result |
|---|---|---|---|---|
| ENG-01 | KRN-011 R1 | Manifest omits failure semantics | Registration rejected | Available engine |
| ENG-02 | KRN-011 R2 | Engine requires unsupported interface major version | Load blocked with compatibility failure | Silent downgrade |
| ENG-03 | KRN-011 R3 | Session requests context outside mission step | Excess context denied; session remains bounded or fails | Broad context access |
| ENG-04 | KRN-011 R4 | Compatible engine has no trust evidence | Catalogue says available and unvalidated separately | Trusted label |
| ENG-05 | KRN-011 R5 | Engine tool version materially changes | New registration and trust-revalidation signal | Prior trust inherited |
| ENG-06 | KRN-011 R6 | Engine fails during task | Session isolates; task fails typed; Kernel state remains consistent | Kernel corruption |
| ENG-07 | KRN-011 R7 | Assessment engine manifest is submitted for v0.1.0 | Release-boundary validation rejects inclusion | Assessment engine registered |

## Configuration

| ID | Requirement | Scenario | Expected observable result | Prohibited result |
|---|---|---|---|---|
| CFG-01 | KRN-013 R1 | Definition lacks owner or safe default | Definition rejected | Unowned setting |
| CFG-02 | KRN-013 R2 | Workspace setting attempts to disable permission checks | Governing control prevails and proposal rejects | Permission bypass |
| CFG-03 | KRN-013 R3 | Material retry policy changes | Impact, authority, effective time and rollback recorded | Silent activation |
| CFG-04 | KRN-013 R4 | One value in a configuration set fails validation | No values in set activate | Partial mixed activation |
| CFG-05 | KRN-013 R5 | Secret reference is resolved | Event and audit show reference only | Secret value logged |
| CFG-06 | KRN-013 R6 | Operator rolls back to prior value | New rollback version activates; intervening history remains | Versions deleted |
| CFG-07 | KRN-013 R7 | Mandatory value is unavailable | Dependant operation safely blocks or declares degradation | Unsafe default invented |

## Event Bus

| ID | Requirement | Scenario | Expected observable result | Prohibited result |
|---|---|---|---|---|
| EVT-01 | KRN-014 R1 | Event lacks producer version | Publication rejected | Anonymous accepted fact |
| EVT-02 | KRN-014 R2 | Same event ID arrives with altered payload | Duplicate conflict and audit alert | Accepted overwrite |
| EVT-03 | KRN-014 R3 | Events from two producers have close timestamps | No global order inferred beyond source sequences | Total ordering claim |
| EVT-04 | KRN-014 R4 | Consumer receives duplicate delivery | Consumer idempotency gives one semantic result | Duplicate state change |
| EVT-05 | KRN-014 R5 | Authorised replay runs | Original IDs retained with replay session context | New domain facts created |
| EVT-06 | KRN-014 R6 | Subscriber lacks sensitivity permission | Payload is not delivered and denial is audited | Metadata leaks protected content |
| EVT-07 | KRN-014 R7 | Consumer delivery exhausts retries | Dead letter with recovery owner; owner state remains committed | Domain mutation reversed |

## Notification System

| ID | Requirement | Scenario | Expected observable result | Prohibited result |
|---|---|---|---|---|
| NOT-01 | KRN-015 R1 | Person-directed candidate has ambiguous recipient | Candidate blocks for recipient resolution | Name guessed |
| NOT-02 | KRN-015 R2 | In-system record is created in v0.1.0 | Status reports created/queued only | Email or Teams delivery claimed |
| NOT-03 | KRN-015 R3 | Same overdue fact repeats within deduplication window | One grouped notification | Repeated attention records |
| NOT-04 | KRN-015 R4 | Recipient acknowledges a task-blocked notice | Notice acknowledges; task remains blocked | Task completes or unblocks |
| NOT-05 | KRN-015 R5 | Escalation time arrives after source is resolved | Freshness check suppresses escalation | Stale escalation sent |
| NOT-06 | KRN-015 R6 | Source event says status is user-declared | Notification preserves that limitation | Verified wording |
| NOT-07 | KRN-015 R7 | Quiet-period configuration is unavailable | Declared safe route applies or notification defers | Unrestricted external route |

## Audit Trail

| ID | Requirement | Scenario | Expected observable result | Prohibited result |
|---|---|---|---|---|
| AUD-01 | KRN-016 R1–R2 | Permissioned state change commits | Audit record identifies actor, action, target, authority, time, correlation and outcome | Material fields absent |
| AUD-02 | KRN-016 R3 | Accepted audit record is edited in place | Integrity verification fails and alert records | Silent edit |
| AUD-03 | KRN-016 R4 | Source command contains sensitive evidence | Audit stores references and safe summary | Full source copied |
| AUD-04 | KRN-016 R5 | Mandatory audit service unavailable for high-impact mutation | Mutation blocks before effect | Best-effort continuation |
| AUD-05 | KRN-016 R6 | Auditor queries protected records | Query itself creates an audit record | Unlogged audit access |
| AUD-06 | KRN-016 R7 | Retention expires but legal hold is active | Disposal blocks | Held content removed |
| AUD-07 | KRN-016 R3 | Sequence gap is detected | Integrity state degrades and recovery alert emits | Healthy status |

