# Dave Beadle Operating System (DBOS)

DBOS is the implementation specification and future runtime for the Dave Beadle Cognitive Architecture (DBCA).

This repository currently defines **DBOS v0.1.0 (Kernel)**. The release specifies the shared operating system services that future cognitive and professional-intelligence engines will use. It contains no application code and does not implement Assessment Intelligence.

## Architectural authority

- Architecture baseline: **DBCA v1.0.0**
- Baseline commit: `035377ca6e5b72bb732d59bc9b528bf337a0c274`
- DBCA is the architectural contract; DBOS is its implementation boundary.
- DBCA is referenced, never copied or modified here.

## v0.1.0 scope

The Kernel specifies Mission Control, workspace and case-file management, projects, context, memory, decisions, tasks, timelines, state, engine loading, permissions, configuration, events, notifications and audit.

The specification set includes:

- subsystem responsibilities, states, interfaces and failure behaviour;
- canonical contracts and interface definitions;
- architecture decision records;
- Mermaid architecture diagrams;
- technology-neutral behavioural scenarios;
- DBCA-to-DBOS traceability and release validation.

## Repository map

| Path | Purpose |
|---|---|
| `docs/00-governance/` | Release scope, conformance and specification rules |
| `docs/01-architecture/` | Kernel structure, ownership and lifecycle |
| `docs/02-subsystems/` | The 16 Kernel subsystem specifications |
| `docs/03-contracts/` | Canonical semantic contracts |
| `docs/04-interfaces/` | Cross-subsystem interface catalogue |
| `docs/05-behaviours/` | Behavioural conformance scenarios |
| `docs/06-adrs/` | DBOS implementation decisions |
| `docs/07-diagrams/` | Renderable architecture diagrams |
| `docs/08-assurance/` | Traceability, validation and release evidence |

## Normative language

`MUST`, `MUST NOT`, `SHOULD`, `SHOULD NOT` and `MAY` are normative. Markdown specifications are authoritative. Any future machine-readable mirror remains subordinate to these documents.

## Release boundary

No executable application code, live prompts, databases, automations, websites or external integrations form part of v0.1.0. Those require later implementation releases and conformance evidence.

