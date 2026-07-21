# Project Manager Specification

| Field | Value |
|---|---|
| Document ID | DBOS-KRN-004 |
| Status | Approved |
| Version | 0.1.0 |
| DBCA authority | ARC-010; WFL-006; ADR-008 |

## Purpose

Represent a durable outcome programme containing related missions, milestones, dependencies, risks and acceptance measures.

## Responsibilities

- Define project outcome, scope, owner, acceptance measures and governance.
- Link missions, milestones, tasks, case files, artefacts and decisions.
- Maintain dependency, risk, issue and change registers.
- Derive project status from owned records with evidence boundary and freshness.
- Baseline, pause, complete, cancel or supersede a project through guarded transitions.

## Non-responsibilities

Project Manager does not execute mission work, alter mission state, invent status from missing sources, replace portfolio judgement or override task ownership.

## Inputs

`ProjectRequest`, scope, outcomes, milestones, constraints, dependencies, risk/issue changes, object references, change request and authority.

## Outputs

`ProjectRecord`, `ProjectBaseline`, `MilestoneRecord`, dependency graph, risk/issue register, status projection, change result and project events.

## Interfaces

| Interface | Behaviour |
|---|---|
| `IF-PRJ-01 CreateProject` | Create proposed project identity and governance record |
| `IF-PRJ-02 BaselineProject` | Freeze an approved scope, outcome, milestone and acceptance version |
| `IF-PRJ-03 LinkMission` | Relate a mission and define contribution without changing it |
| `IF-PRJ-04 RecordRiskOrIssue` | Create or update versioned risk and issue entries |
| `IF-PRJ-05 ProposeChange` | Analyse and record impact before a new baseline |
| `IF-PRJ-06 GetProjectStatus` | Produce an as-of projection with sources, gaps and confidence |
| `IF-PRJ-07 TransitionProject` | Apply a guarded project lifecycle transition |

## State

States are `proposed`, `approved`, `active`, `paused`, `blocked`, `completed`, `cancelled` and `superseded`. Baselines are immutable. Project status is a derived projection, not a new source of child truth.

## Requirements and invariants

- `DBOS-KRN-004-R1`: every project MUST have owner, outcome, scope, acceptance measures and evidence boundary before approval.
- `DBOS-KRN-004-R2`: dependency graphs MUST reject cycles unless explicitly modelled as a resolved grouping outside execution order.
- `DBOS-KRN-004-R3`: baseline change MUST record reason, impact, authority and affected objects.
- `DBOS-KRN-004-R4`: status MUST distinguish verified state, user-declared state, inference and unknown.
- `DBOS-KRN-004-R5`: child mission or task state MUST be read from its owner and never overwritten.
- `DBOS-KRN-004-R6`: completion MUST require project acceptance evidence and resolution or explicit acceptance of remaining items.

## Dependencies

Requires State Manager, Permissions, Task Manager, Timeline, Event Bus and Audit Trail. References Workspace, Mission Control, Case File and Decision records.

## Future extension points

Programme grouping, resource forecasts, reusable templates and scenario planning MAY be added. Forecasts must expose assumptions and cannot imply unavailable employer data.

## Failure behaviour

Invalid scope, circular dependency, stale baseline, unauthorised change, missing child reference and inconsistent completion return typed failures. Derived-status failure returns `status-unavailable` with last known as-of view, never a fabricated current status.

## Observability, security and privacy

Baselines, changes, material risks, transitions and acceptance decisions are evented and audited. Views disclose inaccessible sources and stale records.

