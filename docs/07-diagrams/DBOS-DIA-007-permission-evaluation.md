# Permission Evaluation

| Field | Value |
|---|---|
| Document ID | DBOS-DIA-007 |
| Version | 0.1.0 |
| Related | DBOS-ADR-004; DBOS-CTR-004 |

```mermaid
flowchart TD
    Request["Exact operation<br/>actor, target and effects"]
    Resolve["Resolve grants,<br/>prohibitions and validity"]
    Risk["Check impact, reversibility,<br/>recipient and confirmation"]
    Decision{"Permission outcome"}
    Allow["Allow<br/>short-lived obligations"]
    Confirm["Confirmation required"]
    Deny["Deny or indeterminate"]

    Request --> Resolve
    Resolve --> Risk
    Risk --> Decision
    Decision --> Allow
    Decision --> Confirm
    Decision --> Deny
```

The state owner rechecks the decision immediately before mutation. Access, trust and urgency do not enter as substitute grants.

