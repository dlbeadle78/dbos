# Mutation, Event, Notification and Audit Flow

| Field | Value |
|---|---|
| Document ID | DBOS-DIA-005 |
| Version | 0.1.0 |
| Related | DBOS-ADR-002; DBOS-ADR-007; DBOS-ADR-008 |

```mermaid
sequenceDiagram
    participant Caller
    participant Owner as State Owner
    participant Audit as Audit Trail
    participant Bus as Event Bus
    participant Notice as Notification

    Caller->>Owner: authorised versioned command
    Owner->>Audit: mandatory material record
    Audit-->>Owner: audit receipt
    Owner->>Bus: committed domain event
    Bus-->>Owner: publication receipt
    Bus->>Notice: eligible event delivery
    Notice->>Notice: recipient, authority and deduplication
    Notice-->>Bus: consumer acknowledgement
```

Audit acceptance and domain event commitment are both required according to action policy, but notification delivery never determines the owner's state.

