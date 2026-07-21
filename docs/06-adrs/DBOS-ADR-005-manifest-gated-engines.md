# DBOS-ADR-005: Manifest-Gated, Isolated Engine Loading

| Field | Value |
|---|---|
| Status | Accepted |
| Decision date | 2026-07-21 |
| Scope | Future cognitive and professional engines |
| DBCA authority | ARC-002; ADR-004; ADR-010 |

## Context

Future engines will change at different rates and may require distinct models, tools, methods, data and permissions. Directly embedding them into Kernel services would collapse DBCA/DBOS boundaries and allow trust to leak.

## Decision

Every engine version requires an immutable manifest declaring capability, DBCA/DBOS and interface compatibility, integrity evidence, permissions, data handling and failure behaviour. Engine Loader creates a mission/step-bounded session exposing only declared interfaces, context, configuration and authority.

Engine availability remains separate from capability-specific trust, authority and delegation. DBOS v0.1.0 registers no domain engine.

## Consequences

Engines can be replaced and tested independently. Manifest maintenance, compatibility evaluation, session reconciliation and revalidation after material change are required.

## Alternatives rejected

- Kernel-embedded domain logic: rejected because v0.1.0 must not implement Assessment Intelligence and would create coupling.
- Blanket engine access: rejected because it violates minimum context and least authority.
- Trust inherited by engine name: rejected because trust keys include version and context.

## Failure controls

Integrity, compatibility, health or permission failure prevents loading. Quarantine blocks new sessions and triggers affected mission review.

