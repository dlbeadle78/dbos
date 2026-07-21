# DBOS-ADR-010: Modular Monolith and Package Dependency Rules

| Field | Value |
|---|---|
| Status | Proposed for approval |
| Decision date | 2026-07-21 |
| Scope | Runtime topology, repository structure and module ownership |
| DBCA authority | ARC-001; ARC-005; ES-001; ES-006 |
| Supersedes | None |
| Depends on | DBOS-ADR-001; DBOS-ADR-009 |

## Context

DBOS defines sixteen cooperating Kernel subsystems with single-owner state, declared interfaces and contracted events. v0.2.0 needs enforceable boundaries without introducing distributed deployment, network failure or operational complexity before the Kernel semantics are proven.

## Problem Statement

Choose a topology and package structure that preserve subsystem ownership and contract-driven integration while keeping the initial runtime deployable and testable as one controlled unit.

## Decision

DBOS v0.2.0 SHALL be a single-process modular monolith in a private npm workspace repository.

The repository SHALL separate:

- canonical contracts and schemas;
- logical ports;
- one package per Kernel subsystem;
- storage and observability adapters;
- Kernel composition and lifecycle;
- a local conformance/administration entry point;
- test fixtures, testkit and build-time tooling.

Permitted import direction SHALL be `entry point -> kernel-runtime -> subsystem owners -> ports -> contracts`. Adapters import and implement ports and are selected only at the composition root. A subsystem MAY import contracts and declared ports. It MUST NOT import another subsystem's internal module, database representation or private adapter.

Only package-root exports declared through `exports` are public. The workspace root SHALL be private, use one lockfile and prevent accidental publication. Dependency-cycle and boundary checks SHALL be release gates.

The single process does not create shared ownership. Calls still pass through declared interfaces, and cross-owner facts still use contracted events where the v0.1.0 architecture requires them.

## Alternatives Considered

- **One undivided package:** simpler initially but cannot enforce subsystem ownership or prevent hidden imports.
- **Microservices:** strong process isolation but adds networking, distributed transactions and deployment complexity without a v0.2.0 need.
- **Independent repositories:** isolates teams but makes atomic contract evolution and conformance harder at this stage.
- **Framework-managed dependency injection:** convenient composition but obscures construction order and adds a broad runtime dependency.
- **Plugin architecture for every subsystem:** premature because Kernel subsystem identity and trust differ from future domain-engine extensibility.

## Consequences

- One process and one release unit reduce operational complexity.
- Package boundaries make ownership and dependency direction mechanically testable.
- A failure can still affect the whole process, so lifecycle containment is logical rather than process-level.
- Future extraction requires interface stability but not a redesign of domain ownership.
- The composition root becomes security-sensitive and deliberately small.

## Risks

- Developers may bypass boundaries through relative paths or shared database access.
- A large workspace may develop cyclic dependencies.
- Single-process faults may stop unrelated subsystems.
- Package granularity may create build overhead or false abstraction.

## Mitigations

- Enforce package exports, project references and dependency rules in CI.
- Give each persisted semantic record one repository owner.
- Use typed health, degradation and recovery contracts between packages.
- Keep common packages limited to genuine contracts and technical ports, never shared domain logic.
- Review package creation and dependency additions through architecture checks.

## Traceability back to DBCA

| DBCA obligation | DBOS realisation |
|---|---|
| ARC-001 mission-centred coordination | Mission Control coordinates through interfaces and does not absorb subsystem ownership |
| ARC-005 stable object ownership | Package and repository ownership align with canonical semantic owners |
| ES-001 explicit mission flow | Kernel Runtime is the sole composition root for lifecycle ordering |
| ES-006 contract-driven engineering | Public exports and ports are the only permitted integration surface |

## Affected Kernel Subsystems

All Kernel subsystems. Mission Control, State Manager, Event Bus, Permissions, Configuration and Audit Trail have the strongest boundary-enforcement role.

## Future Impact

Subsystems may later move into separate processes only after an ADR addresses transport, authentication, consistency and recovery. Package contracts are designed to make that possible, but v0.2.0 makes no distributed-runtime commitment. Domain engines use Engine Loader boundaries rather than becoming Kernel workspace internals.
