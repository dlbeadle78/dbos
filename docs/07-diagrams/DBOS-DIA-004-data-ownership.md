# Source-of-Truth Ownership and Projections

| Field | Value |
|---|---|
| Document ID | DBOS-DIA-004 |
| Version | 0.1.0 |
| Related | DBOS-ADR-001; DBOS-CTR-001 |

```mermaid
flowchart TD
    Owner["Owning subsystem<br/>canonical versioned record"]
    Events["Event Bus<br/>immutable fact transport"]
    Projections["Derived views<br/>source versions and as-of time"]
    Consumers["Authorised consumers<br/>read-only reference use"]
    Audit["Audit Trail<br/>material accountability"]

    Owner -->|"committed domain event"| Events
    Owner -->|"versioned query"| Projections
    Events -->|"idempotent updates"| Projections
    Projections --> Consumers
    Owner -->|"mandatory audit record"| Audit
    Consumers -.->|"new authorised command"| Owner
```

A projection cannot write back inferred truth. Any change returns as a new authorised command to the owner.

