# Configuration Specification

| Field | Value |
|---|---|
| Document ID | DBOS-KRN-013 |
| Status | Approved |
| Version | 0.1.0 |
| DBCA authority | ADR-007; ADR-009; STD-009 |

## Purpose

Resolve validated, versioned and auditable Kernel settings without permitting configuration to amend governing contracts or authority.

## Responsibilities

- Register configuration definitions, types, constraints, defaults and sensitivity.
- Resolve effective values across approved scopes and precedence.
- Validate proposed configuration sets before activation.
- preserve version, origin, effective time and rollback reference.
- notify affected subsystems of material change and trigger revalidation where required.
- separate secret references from ordinary configuration content.

## Non-responsibilities

Configuration does not store secret values in specifications, override DBCA, create permission, silently change contract semantics or decide mission outcomes.

## Inputs

`ConfigurationDefinition`, proposed value/reference, scope, owner, authority, validation rules, effective interval, reason, impact declaration and activation/rollback request.

## Outputs

`ConfigurationVersion`, validation result, effective `ConfigurationView`, impact set, activation/rollback result and configuration events.

## Interfaces

| Interface | Behaviour |
|---|---|
| `IF-CFG-01 RegisterDefinition` | Admit a typed definition with safe default and constraints |
| `IF-CFG-02 ProposeConfiguration` | Validate a new inactive version and calculate impact |
| `IF-CFG-03 ActivateConfiguration` | Apply authorised effective-dated version atomically |
| `IF-CFG-04 ResolveConfiguration` | Return source-labelled effective values for a declared scope |
| `IF-CFG-05 RollBackConfiguration` | Activate a compatible prior value as a new version |
| `IF-CFG-06 GetConfigurationHistory` | Return authorised version and source history |

## State

Versions are `draft`, `validated`, `scheduled`, `active`, `superseded`, `rolled-back`, `rejected` or `expired`. Effective configuration is a deterministic projection of active definitions and scope precedence.

## Requirements and invariants

- `DBOS-KRN-013-R1`: every definition MUST specify type, allowed scope, validation, safe default, owner and sensitivity.
- `DBOS-KRN-013-R2`: precedence MUST be deterministic and MUST NOT override a narrower prohibition or governing rule.
- `DBOS-KRN-013-R3`: material change MUST record impact, authority, effective time and rollback plan.
- `DBOS-KRN-013-R4`: activation MUST be atomic for one configuration set.
- `DBOS-KRN-013-R5`: secret values MUST be represented by protected references and excluded from events and audit payloads.
- `DBOS-KRN-013-R6`: rollback MUST create a new version rather than delete change history.
- `DBOS-KRN-013-R7`: unknown or invalid mandatory configuration MUST produce safe degradation or block the dependant operation.

## Dependencies

Requires Permissions, Timeline, Event Bus, State Manager and Audit Trail. All Kernel subsystems may read effective configuration through `IF-CFG-04`.

## Future extension points

Environment overlays, feature controls, schema migration and staged rollout MAY be added. Feature controls cannot bypass contracts, tests, authority or version compatibility.

## Failure behaviour

Type error, invalid range, scope conflict, unauthorised proposal, failed impact check, partial activation and unavailable secret reference return typed failures. Partial activation triggers rollback or a blocked inconsistent state; silent mixed configuration is prohibited.

## Observability, security and privacy

Definition, proposal, activation and rollback are audited with redacted values where sensitive. Effective views expose source version and evaluation time.

