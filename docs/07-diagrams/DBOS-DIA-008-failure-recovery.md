# Failure Containment and Recovery

| Field | Value |
|---|---|
| Document ID | DBOS-DIA-008 |
| Version | 0.1.0 |
| Related | DBOS-CTR-006; DBOS-ARC-002 |

```mermaid
flowchart TD
    Failure["Typed failure<br/>partial effects recorded"]
    Contain["Contain unsafe dependants<br/>preserve verified work"]
    Effects{"Side-effect state known?"}
    Reconcile["Reconcile external or<br/>uncertain outcome"]
    Recover["Authorised recovery<br/>correct, refresh, retry or compensate"]
    Verify["Verify acceptance and<br/>residual risk"]
    Resume["Resume, block or cancel"]

    Failure --> Contain
    Contain --> Effects
    Effects -->|"no"| Reconcile
    Effects -->|"yes"| Recover
    Reconcile --> Recover
    Recover --> Verify
    Verify --> Resume
```

Blind retry is prohibited for non-idempotent or unknown side effects. Recovery failure creates a linked failure record.

