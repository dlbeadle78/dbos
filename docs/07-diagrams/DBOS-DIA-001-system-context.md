# System Context

| Field | Value |
|---|---|
| Document ID | DBOS-DIA-001 |
| Version | 0.1.0 |
| Related | DBOS-GOV-002; DBOS-ARC-001 |

```mermaid
flowchart TD
    Dave["Dave Beadle<br/>final authority"]
    DBCA["DBCA v1.0.0<br/>architectural contract"]
    DBOS["DBOS v0.1.0<br/>Kernel specification"]
    Engines["Future engines<br/>outside v0.1.0"]
    External["External systems<br/>no assumed access"]

    Dave -->|"authority and decisions"| DBOS
    DBCA -->|"governs"| DBOS
    DBOS -->|"versioned contracts"| Engines
    Engines -->|"bounded results"| DBOS
    DBOS -.->|"future authorised adapters"| External
```

DBCA never depends on DBOS. External access exists only when a future adapter, permission and evidence boundary explicitly establish it.

