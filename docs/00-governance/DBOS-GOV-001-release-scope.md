# DBOS v0.1.0 Kernel Release Scope

| Field | Value |
|---|---|
| Document ID | DBOS-GOV-001 |
| Status | Approved for engineering |
| Version | 0.1.0 |
| Owner | Dave Beadle |
| Architectural authority | DBCA v1.0.0 |
| DBCA commit | `035377ca6e5b72bb732d59bc9b528bf337a0c274` |

## Purpose

Define the exact boundary and acceptance conditions for the first DBOS release.

## Included

DBOS v0.1.0 specifies the common kernel needed before any domain engine is implemented: Mission Control, Workspace Manager, Case File Manager, Project Manager, Context Manager, Memory Manager, Decision Log, Task Manager, Timeline, State Manager, Engine Loader, Permissions, Configuration, Event Bus, Notification System and Audit Trail.

It also specifies canonical objects, interface envelopes, failure semantics, security boundaries, event behaviour, architectural decisions, diagrams, tests and traceability.

## Excluded

- Assessment Intelligence, assessment criteria, assessment decisions and learner-evidence processing.
- Executable code, persistence schemas, infrastructure and vendor selection.
- Live application prompts, model selection and user-interface design.
- Employer-system, email, calendar or Aptem access.
- Autonomous external communication or side effects.
- Trust, delegation, reasoning and professional engines as runtime implementations.

Future engines MAY be described only as consumers of Kernel contracts. They MUST NOT be simulated or partially implemented by Kernel subsystems.

## Release requirements

- `DBOS-GOV-001-R1`: every named Kernel subsystem MUST have a normative specification.
- `DBOS-GOV-001-R2`: every subsystem specification MUST define purpose, responsibilities, inputs, outputs, interfaces, state, dependencies, extension points and failure behaviour.
- `DBOS-GOV-001-R3`: cross-subsystem communication MUST use versioned contracts and correlated events.
- `DBOS-GOV-001-R4`: all material mutations MUST be authorised, state-guarded and auditable.
- `DBOS-GOV-001-R5`: DBOS MUST declare and trace conformance to DBCA v1.0.0.
- `DBOS-GOV-001-R6`: v0.1.0 MUST contain no application code and no Assessment Intelligence behaviour.
- `DBOS-GOV-001-R7`: every applicable MUST requirement MUST trace to one or more behavioural scenarios.
- `DBOS-GOV-001-R8`: release acceptance MUST record completeness, consistency, boundary and negative-test results.

## Acceptance conditions

The release is complete when all sixteen subsystem specifications exist, required contracts and interfaces are coherent, architectural decisions are accepted, diagrams render semantically, behavioural coverage is complete, DBCA traceability contains no unexplained gaps and the repository contains no application implementation.

## Failure behaviour

Any unexplained DBCA conflict, missing subsystem section, untested MUST, assessment behaviour or executable implementation blocks release. A blocker MUST be recorded with the affected requirement and preserved work.

