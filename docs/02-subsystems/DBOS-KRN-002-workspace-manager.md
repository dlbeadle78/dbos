# Workspace Manager Specification

| Field | Value |
|---|---|
| Document ID | DBOS-KRN-002 |
| Status | Approved |
| Version | 0.1.0 |
| DBCA authority | ARC-005; ARC-010; ADR-010 |

## Purpose

Provide a durable, access-controlled container that organises related missions, projects, case files and artefacts without becoming their source of truth.

## Responsibilities

- Create and version workspace identity, purpose, owner and membership.
- Link permitted projects, missions, case files and artefacts.
- Apply workspace-level defaults as inputs to Configuration and Permissions.
- Provide bounded listings and summaries with freshness and source references.
- Archive and restore workspace availability without deleting owned child records.

## Non-responsibilities

The subsystem does not own mission, case, project or artefact content; infer employer-system visibility; grant permissions beyond owner authority; or merge unrelated identities.

## Inputs

`WorkspaceRequest`, owner identity, authority grant, membership changes, object references, metadata, configuration-profile references and archive request.

## Outputs

`WorkspaceRecord`, `WorkspaceMembership`, `WorkspaceView`, link/unlink result, archive result and workspace events.

## Interfaces

| Interface | Behaviour |
|---|---|
| `IF-WS-01 CreateWorkspace` | Create a unique workspace within an authorised owner scope |
| `IF-WS-02 LinkObject` | Link an existing authorised object without copying its state |
| `IF-WS-03 ChangeMembership` | Add, change or revoke scoped membership |
| `IF-WS-04 GetWorkspaceView` | Return a permission-filtered, as-of projection |
| `IF-WS-05 ArchiveWorkspace` | Prevent new ordinary work while preserving records and recovery |
| `IF-WS-06 RestoreWorkspace` | Restore archived availability after authority and conflict checks |

## State

States are `proposed`, `active`, `restricted`, `archived` and `superseded`. Workspace Manager owns identity, metadata, membership and child references. Content remains owned by the referenced subsystem. Membership changes are versioned and effective-dated.

## Requirements and invariants

- `DBOS-KRN-002-R1`: workspace identity MUST be stable and unique.
- `DBOS-KRN-002-R2`: every link MUST identify object type, stable identifier, version policy and authority basis.
- `DBOS-KRN-002-R3`: a workspace view MUST state its `as_of` time and omit inaccessible objects without implying absence.
- `DBOS-KRN-002-R4`: archive MUST NOT delete or terminate child objects.
- `DBOS-KRN-002-R5`: membership revocation MUST affect new access immediately and trigger in-flight review.
- `DBOS-KRN-002-R6`: workspace defaults MUST NOT override narrower permissions or governing configuration.

## Dependencies

Requires Permissions, Configuration, Event Bus, State Manager and Audit Trail. References Mission Control, Project Manager, Case File Manager and artefact records.

## Future extension points

Templates, saved views, quotas and collaboration roles MAY be added. They cannot create implicit authority, duplicate child state or assume external-system access.

## Failure behaviour

Duplicate identity, inaccessible object, stale membership, link conflict, archive conflict and integrity failure return typed failures. Partial bulk linking records individual outcomes and never reports atomic success unless all requested links commit. Revoked access blocks rather than returns an empty authoritative view.

## Observability, security and privacy

Membership, restricted access, archive and link changes are audited. Listings minimise personal data and expose source and freshness for derived status.

