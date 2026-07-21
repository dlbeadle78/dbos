# Kernel Component Architecture

| Field | Value |
|---|---|
| Document ID | DBOS-DIA-002 |
| Version | 0.1.0 |
| Related | DBOS-ARC-001; DBOS-ADR-001 |

```mermaid
flowchart TD
    MC["Mission Control"]
    State["State Manager"]

    subgraph Work["Work organisation"]
      WS["Workspace Manager"]
      CF["Case File Manager"]
      PRJ["Project Manager"]
      TSK["Task Manager"]
      TIM["Timeline"]
    end

    subgraph Knowledge["Knowledge support"]
      CTX["Context Manager"]
      MEM["Memory Manager"]
      DEC["Decision Log"]
    end

    subgraph Runtime["Runtime governance"]
      ENG["Engine Loader"]
      PER["Permissions"]
      CFG["Configuration"]
    end

    subgraph Infrastructure["Infrastructure"]
      EVT["Event Bus"]
      NOT["Notification System"]
      AUD["Audit Trail"]
    end

    MC --> State
    MC --> Work
    MC --> Knowledge
    MC --> Runtime
    Work --> Infrastructure
    Knowledge --> Infrastructure
    Runtime --> Infrastructure
    State --> Infrastructure
```

Arrows show contract use, not state ownership. Infrastructure services never acquire domain decision authority.

