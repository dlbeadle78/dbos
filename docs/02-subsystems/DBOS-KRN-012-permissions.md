# Permissions Specification

| Field | Value |
|---|---|
| Document ID | DBOS-KRN-012 |
| Status | Approved |
| Version | 0.1.0 |
| DBCA authority | ES-004; ADR-003; ADR-005 |

## Purpose

Enforce least authority by evaluating identity, grants, scope, action, target, context, time and confirmation independently of technical access or trust.

## Responsibilities

- Register and version authority grants, denials, delegation limits and revocations.
- Authenticate the asserted actor through a referenced identity result.
- Evaluate the narrowest applicable grant and explicit prohibitions.
- Enforce confirmation for applicable destructive, irreversible, person-directed or externally consequential actions.
- Issue short-lived, scoped permission decisions for one operation.
- Revoke new action immediately and flag affected in-flight work.

## Non-responsibilities

Permissions does not provide authentication technology, create legal authority, decide trust, grant itself permission or infer consent from a task request or available access.

## Inputs

`PermissionRequest`, actor identity reference, capability, action class, target, mission/step, proposed side effects, impact, reversibility, recipient certainty, grant references, confirmation evidence and evaluation time.

## Outputs

`PermissionDecision` (`allow`, `deny`, `confirmation-required` or `indeterminate`), controlling grant, obligations, prohibitions, expiry, decision reason and permission events.

## Interfaces

| Interface | Behaviour |
|---|---|
| `IF-PER-01 RegisterGrant` | Record an authorised, scoped and effective-dated grant |
| `IF-PER-02 EvaluatePermission` | Return a one-operation decision under current policy |
| `IF-PER-03 ConfirmAction` | Bind valid human confirmation to the exact proposed action |
| `IF-PER-04 RevokeGrant` | Stop new reliance and identify in-flight decisions for review |
| `IF-PER-05 GetEffectiveAuthority` | Return a permission-filtered authority view as of time |
| `IF-PER-06 RevalidateDecision` | Reassess an unexpired decision after material context change |

## State

Grants are `proposed`, `active`, `suspended`, `revoked`, `expired` or `superseded`. Permission decisions are immutable point-in-time evaluations with short validity. Confirmation is single-action, bounded and cannot be reused after material target or side-effect change.

## Requirements and invariants

- `DBOS-KRN-012-R1`: authority MUST be denied by default outside declared scope.
- `DBOS-KRN-012-R2`: access, trust, urgency and user outcome MUST NOT substitute for a grant.
- `DBOS-KRN-012-R3`: the narrowest applicable grant and strongest applicable prohibition MUST control.
- `DBOS-KRN-012-R4`: strategic and constitutional decisions MUST remain with Dave.
- `DBOS-KRN-012-R5`: destructive, irreversible, person-directed or externally consequential actions MUST satisfy applicable confirmation and recipient certainty.
- `DBOS-KRN-012-R6`: revocation MUST block new action immediately and trigger in-flight review.
- `DBOS-KRN-012-R7`: indeterminate identity, scope or policy MUST fail safely without becoming denial of an unrelated right.

## Dependencies

Requires Configuration, Timeline, Event Bus and Audit Trail. All mutating Kernel subsystems and Engine Loader depend on Permissions.

## Future extension points

Reusable authority profiles, delegated administration and policy simulation MAY be added. Profiles must remain inspectable, effective-dated and subordinate to constitutional and third-party rights.

## Failure behaviour

Missing identity, ambiguous action class, conflicting grants, stale confirmation, policy error and unavailable authority source return `indeterminate` or `deny` according to safety policy with a precise reason. No partial permission is implied. In-flight effects enter reconciliation after revocation.

## Observability, security and privacy

Grants, evaluations, confirmation and revocation are audited. Logs state policy and identifiers while minimising sensitive target content.

