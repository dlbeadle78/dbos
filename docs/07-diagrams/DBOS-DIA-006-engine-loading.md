# Engine Registration and Bounded Loading

| Field | Value |
|---|---|
| Document ID | DBOS-DIA-006 |
| Version | 0.1.0 |
| Related | DBOS-ADR-005; DBOS-CTR-008 |

```mermaid
flowchart TD
    Manifest["Engine manifest<br/>identity and contracts"]
    Validate["Compatibility and<br/>integrity validation"]
    Catalogue["Capability catalogue<br/>availability only"]
    Session["Mission-step session<br/>bounded context and authority"]
    Close["Close and reconcile<br/>revoke scoped access"]

    Manifest --> Validate
    Validate -->|"compatible"| Catalogue
    Validate -->|"invalid"| Quarantine["Quarantine"]
    Catalogue -->|"authorised selection"| Session
    Session --> Close
    Session -->|"failure or revocation"| Quarantine
```

Trust and delegation are evaluated outside availability. DBOS v0.1.0 contains no registered domain engine.

