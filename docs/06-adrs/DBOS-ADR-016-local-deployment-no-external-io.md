# DBOS-ADR-016: Local Deployment Boundary and External-I/O Prohibition

| Field | Value |
|---|---|
| Status | Accepted |
| Decision date | 2026-07-21 |
| Scope | v0.2.0 deployment, network, process and side-effect boundaries |
| DBCA authority | ES-004; ES-010; ES-011; ADR-004; ADR-010 |
| Supersedes | None |
| Depends on | DBOS-ADR-005; DBOS-ADR-007; DBOS-ADR-010; DBOS-ADR-013; DBOS-ADR-015 |

## Context

The Core Runtime release exists to prove Kernel coordination, contracts, state, authority, audit and recovery. Email, calendars, employer systems, remote users and domain engines introduce recipient resolution, authentication, trust, privacy and unknown-side-effect problems that are not required to validate the Kernel.

## Problem Statement

Define a deployment boundary that permits meaningful Core Runtime validation without implying authority, connectivity or safety for external actions.

## Decision

DBOS v0.2.0 SHALL run as one local Kernel process for development and conformance use. It SHALL bind no remote listener and SHALL contain no production adapter capable of external network communication, person-directed messaging, employer-system access, shell execution or arbitrary child-process execution.

The initial executable surface SHALL be a local conformance/administration entry point. Filesystem access SHALL be limited to explicitly configured, resolved runtime paths. Path traversal, symbolic-link escape and unrestricted environment discovery SHALL be rejected.

Notification System SHALL create only in-system notification records. It SHALL not send email, chat, calendar or other person-directed communications. Engine Loader SHALL validate manifests but SHALL not load Assessment Intelligence or untrusted executable engine code. A synthetic inert fixture may exercise session contracts without domain behaviour or external I/O.

Outbound network access SHALL be denied by deployment policy and absent from production dependencies where practical. Tests SHALL verify prohibited adapters and capabilities are unavailable, not merely disabled by a user preference.

No configuration, local identity or permission grant may override this release boundary. Adding any external side effect requires a new ADR covering authentication, recipient resolution, confirmation, idempotency, effect evidence and unknown-outcome recovery.

## Alternatives Considered

- **Enable network access but avoid using it:** weak because accidental or dependency-originated calls remain possible.
- **Add email/calendar adapters behind feature flags:** expands attack and assurance scope before Kernel semantics are proven.
- **Run as a local HTTP service:** creates a remote authentication and request boundary with no v0.2.0 need.
- **Load an assessment engine as a demonstration:** violates the release exclusion and confuses Kernel validation with assessment intelligence.
- **Use unrestricted shell adapters for extensibility:** creates an uncontrolled side-effect and privilege boundary.

## Consequences

- v0.2.0 can validate Kernel behaviour without causing real-world external effects.
- Integration and user-interface work is deferred.
- Local installation remains the only supported deployment.
- Synthetic fixtures must prove contracts without pretending to be domain engines.
- Permission success cannot authorise a capability absent from the release.

## Risks

- Transitive dependencies may initiate network activity.
- Local file operations may still affect data outside the runtime directory.
- Users may mistake a conformance runtime for a production deployment.
- A synthetic engine may accumulate unintended domain logic.
- Future external adapters may reuse inadequate local identity assumptions.

## Mitigations

- Review dependencies and test under denied-network conditions.
- Resolve and validate paths against explicit roots before access.
- Mark runtime mode and unsupported uses in manifests, logs and release notes.
- Keep synthetic fixtures in testkit with an explicit non-domain assertion.
- Require superseding identity, deployment, side-effect and threat-model decisions before external integration.

## Traceability back to DBCA

| DBCA obligation | DBOS realisation |
|---|---|
| ES-004 authority and least permission | Capabilities absent from the release cannot be created by configuration or grants |
| ES-010 safe failure and unknown effects | External side effects are excluded until their recovery model exists |
| ES-011 accountability | Local material operations remain audited without claiming external delivery evidence |
| ADR-004 and ADR-010 trust and separation | Engine validation does not imply trust, execution or domain authority |

## Affected Kernel Subsystems

Kernel Runtime, Engine Loader, Permissions, Configuration, Notification System, Audit Trail, Context Manager and every adapter boundary. Mission Control may coordinate synthetic operations only.

## Future Impact

Any server mode, remote client, cloud deployment, external connector, person-directed action or executable engine requires new architecture approval. Such work must add independently authenticated identity, network controls, recipient verification, side-effect ledgers and recovery tests without weakening this release's historical boundary.
