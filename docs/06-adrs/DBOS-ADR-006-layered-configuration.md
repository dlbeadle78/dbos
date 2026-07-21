# DBOS-ADR-006: Layered, Versioned Configuration

| Field | Value |
|---|---|
| Status | Accepted |
| Decision date | 2026-07-21 |
| Scope | Kernel configuration resolution |
| DBCA authority | ADR-007; ADR-009; STD-009 |

## Context

Kernel settings must vary by approved scope, but uncontrolled overrides can weaken safety, produce irreproducible behaviour or expose secrets.

## Decision

Configuration definitions are typed, owned and versioned. Effective values are resolved through deterministic scope precedence, with governing controls and explicit prohibitions outside configuration. Activation is atomic for a declared set, impact-analysed and reversible through a new version.

Secrets are protected references, never ordinary configuration values in specifications, events or audit payloads.

## Consequences

Effective behaviour can be reconstructed and rolled back. Definitions require safe defaults and dependant subsystems must handle invalid or unavailable mandatory values explicitly.

## Alternatives rejected

- Unstructured per-component settings: rejected because validation and traceability drift.
- Configuration overriding permissions or contracts: rejected because lower authority cannot amend governing rules.
- Deleting old values on rollback: rejected because it loses operational history.

## Failure controls

Partial activation creates an inconsistent blocked state and attempts authorised rollback. Silent mixed configuration is prohibited.

