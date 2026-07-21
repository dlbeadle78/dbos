# Permission Contract

| Field | Value |
|---|---|
| Document ID | DBOS-CTR-004 |
| Status | Approved |
| Contract version | 1.0.0 |
| DBCA authority | DBCA ES-004 |

## Purpose

Define authority grants and operation-specific permission decisions without confusing access, trust or request with permission.

## Authority grant

Required fields are `grant_id`, `grantor`, `grantee`, `capability`, `action_class`, `target_scope`, `delegation_level`, `permitted_side_effects`, `prohibited_actions`, `effective_interval`, `confirmation_rule`, `evidence_of_grant`, `state`, `supersedes` and `revocation_reason` where applicable.

## Permission request

Required fields are actor identity, component/capability, mission/step, exact operation, target, input and output scopes, proposed side effects, impact, reversibility, recipient certainty, relevant grants, confirmation evidence, evaluation time and idempotency key.

## Permission decision

Required fields are `decision_id`, outcome (`allow`, `deny`, `confirmation-required`, `indeterminate`), controlling grants/prohibitions, permitted operation and target, obligations, validity, evaluation policy version, reason and audit reference.

## Invariants

- `DBOS-CTR-004-R1`: undeclared authority is denied by default.
- `DBOS-CTR-004-R2`: the narrowest grant and strongest prohibition control.
- `DBOS-CTR-004-R3`: permission is bound to exact operation, target and side effects.
- `DBOS-CTR-004-R4`: confirmation is not transferable after material change.
- `DBOS-CTR-004-R5`: a revoked or expired grant cannot authorise new work.
- `DBOS-CTR-004-R6`: strategic and constitutional authority remains with Dave.

## Failure behaviour

Ambiguity or unavailable controlling policy returns `indeterminate` with no implied authority. Permission-service failure blocks material mutation unless a separately approved emergency policy applies.

