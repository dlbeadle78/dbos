# DBOS Kernel Architecture

| Field | Value |
|---|---|
| Document ID | DBOS-ARC-001 |
| Status | Approved |
| Version | 0.1.0 |
| Scope | Whole DBOS Kernel |
| Dependencies | DBOS-GOV-001–003; DBCA ARC-001; DBCA ES-001 |

## Purpose

Define the stable operating structure that admits work, coordinates it and preserves reliable state for future engines.

## Architectural model

The Kernel is organised into five logical groups:

| Group | Subsystems | Responsibility |
|---|---|---|
| Control | Mission Control, State Manager | Mission admission, guarded lifecycle and coordination authority |
| Work organisation | Workspace, Case File, Project, Task and Timeline Managers | Durable boundaries, hierarchy, work planning and temporal projections |
| Knowledge support | Context Manager, Memory Manager, Decision Log | Mission-relevant context, governed retained memory and accountable decisions |
| Runtime governance | Engine Loader, Permissions, Configuration | Compatible engine admission, least authority and effective settings |
| Infrastructure | Event Bus, Notification System, Audit Trail | Decoupled facts, attention routing and tamper-evident accountability |

Mission Control owns mission coordination. State Manager is the only authority for guarded lifecycle mutations. Domain engines remain outside the Kernel and interact through Engine Loader and versioned component envelopes.

## Dependency rules

- `DBOS-ARC-001-R1`: subsystems MUST communicate through declared logical interfaces, not hidden shared state.
- `DBOS-ARC-001-R2`: State Manager MUST own lifecycle mutation; projections MUST NOT become competing sources of truth.
- `DBOS-ARC-001-R3`: Event Bus transports facts but MUST NOT decide policy or own domain state.
- `DBOS-ARC-001-R4`: Permissions MUST authorise every material mutation and side effect before execution.
- `DBOS-ARC-001-R5`: Audit Trail MUST receive security, authority, decision, state and side-effect evidence independently of user notification.
- `DBOS-ARC-001-R6`: Configuration MUST NOT override constitutional, contractual or permission controls.
- `DBOS-ARC-001-R7`: a subsystem failure MUST contain dependent work, preserve accepted state and expose recovery status.
- `DBOS-ARC-001-R8`: all cross-subsystem records MUST retain mission, correlation, version, provenance and temporal identifiers where applicable.

## Source-of-truth ownership

| State | Owner |
|---|---|
| Mission definition and coordination record | Mission Control |
| Lifecycle transitions | State Manager |
| Workspace membership | Workspace Manager |
| Case-file contents and versions | Case File Manager |
| Project structure and dependencies | Project Manager |
| Mission context packages | Context Manager |
| Retained memory records | Memory Manager |
| Decision records | Decision Log |
| Task definitions and dependencies | Task Manager |
| Temporal entries and derived schedules | Timeline |
| Engine registration and load sessions | Engine Loader |
| Grants and permission decisions | Permissions |
| Effective configuration | Configuration |
| Published event stream | Event Bus |
| Notification lifecycle | Notification System |
| Audit records and integrity chain | Audit Trail |

## Kernel boundary

The Kernel coordinates and records. It does not perform professional judgement, evidence assessment, reasoning or domain delivery. A future engine may consume Kernel contracts but cannot bypass mission, authority, state, audit or event requirements.

