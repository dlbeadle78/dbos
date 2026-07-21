# Mission Lifecycle Coordination

| Field | Value |
|---|---|
| Document ID | DBOS-DIA-003 |
| Version | 0.1.0 |
| Related | DBOS-ARC-002; DBOS-KRN-001; DBOS-KRN-010 |

```mermaid
stateDiagram-v2
    [*] --> Requested
    Requested --> Admitted: outcome and constitutional fit
    Admitted --> Planned: boundary, authority and acceptance
    Planned --> Ready: dependencies and capability validate
    Ready --> Executing: first step authorised
    Executing --> AwaitingHuman: defined decision required
    AwaitingHuman --> Planned: decision changes plan
    AwaitingHuman --> Executing: decision permits continuation
    Executing --> Verifying: planned work present
    Verifying --> Completed: mandatory acceptance passes
    Verifying --> Blocked: acceptance or evidence gap
    Executing --> Blocked: safe progress prevented
    Blocked --> Planned: plan revision required
    Blocked --> Ready: blocker removed
    Requested --> Cancelled: authorised cancellation
    Admitted --> Cancelled: authorised cancellation
    Planned --> Cancelled: authorised cancellation
    Ready --> Cancelled: authorised cancellation
    Executing --> Cancelled: effects reconciled
    Completed --> Superseded: material late evidence
```

Mission Control owns mission meaning; State Manager evaluates and records every transition guard.

