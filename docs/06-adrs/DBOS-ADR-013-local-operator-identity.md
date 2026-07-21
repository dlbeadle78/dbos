# DBOS-ADR-013: Local Single-Operator Identity Boundary

| Field | Value |
|---|---|
| Status | Accepted |
| Decision date | 2026-07-21 |
| Scope | v0.2.0 identity, authentication boundary and actor attribution |
| DBCA authority | ES-004; ES-010; ES-011; ADR-003; ADR-005 |
| Supersedes | None |
| Depends on | DBOS-ADR-004; DBOS-ADR-010; DBOS-ADR-016 |

## Context

Permissions requires an actor, authority source and operation-specific decision. The initial Core Runtime is a local, single-user development runtime with no remote clients and no external side effects. Claiming full authentication without an identity provider would create false assurance.

## Problem Statement

Provide consistent attribution and permission evaluation for local development while clearly bounding what the identity assertion proves and preventing its reuse in remote or consequential deployments.

## Decision

DBOS v0.2.0 SHALL support exactly one configured local operator profile per runtime deployment. The actor is classified as `local-process-attested`, not independently authenticated.

At startup, Kernel Runtime SHALL derive the operator profile from a locally provisioned identifier and validate its format and deployment binding. Operating-system account or process possession may support local attribution but SHALL NOT be represented as strong personal identity proof.

Every material request SHALL carry actor ID, identity-assurance class, runtime instance, correlation and authority context. Permissions SHALL still issue an operation-specific, target-specific, short-lived decision immediately before mutation. Local identity does not create a grant, expand scope or satisfy confirmation requirements.

The runtime SHALL reject:

- remote identity assertions;
- multiple active operators;
- delegation or impersonation;
- anonymous material mutation;
- external recipient or side-effect authority; and
- any configuration claiming a stronger assurance class.

Identity data SHALL be minimised. Secret credentials SHALL not be stored in actor records, events or audit payloads.

## Alternatives Considered

- **No identity model:** cannot support permission evaluation or accountable audit.
- **Operating-system username as authenticated identity:** overstates assurance and is environment-dependent.
- **Embedded username/password database:** creates credential lifecycle and recovery duties beyond the local runtime need.
- **OAuth/OIDC now:** appropriate for remote or multi-user use but introduces network, provider and token-management boundaries.
- **Shared administrator identity:** destroys individual attribution and conflicts with least authority.

## Consequences

- Local development has stable actor attribution without pretending to provide remote authentication.
- v0.2.0 cannot safely serve multiple users or accept remote requests.
- Permission checks remain mandatory even for the sole operator.
- Audit records expose the limited assurance class for later review.

## Risks

- Consumers may interpret `local-process-attested` as verified personal identity.
- Local machine compromise permits use of the operator context.
- Copied data directories may retain an identity bound to another deployment.
- Future adapters may accidentally bypass the single-user restriction.

## Mitigations

- Include assurance class in every decision and audit record.
- Bind the operator profile to a runtime/deployment identifier and validate it at boot.
- Use restrictive local file permissions and the deployment constraints in ADR-016.
- Fail closed on remote transport, unknown actor or identity mismatch.
- Require a new threat model and ADR before multi-user, remote or consequential operation.

## Traceability back to DBCA

| DBCA obligation | DBOS realisation |
|---|---|
| ES-004 human authority and least permission | Identity is input to, not a substitute for, a scoped permission decision |
| ES-010 safe failure | Unknown or unsupported identity blocks material work |
| ES-011 accountability | Actor and assurance class are retained in material audit records |
| ADR-003 and ADR-005 authority/trust separation | Technical access and local process possession do not imply broad authority or trust |

## Affected Kernel Subsystems

Permissions, Audit Trail, Mission Control, Workspace Manager, Configuration, Notification System, Engine Loader and every subsystem accepting material mutation requests.

## Future Impact

Remote access, multiple users, service identities, delegated authority or external actions require a superseding identity/authentication ADR, credential lifecycle, session controls and revised threat model. Existing actor records retain their original limited assurance class and are never upgraded retrospectively.
