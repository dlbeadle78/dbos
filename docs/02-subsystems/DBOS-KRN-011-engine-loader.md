# Engine Loader Specification

| Field | Value |
|---|---|
| Document ID | DBOS-KRN-011 |
| Status | Approved |
| Version | 0.1.0 |
| DBCA authority | ARC-002; ES-006; ADR-004; ADR-010 |

## Purpose

Admit, describe, isolate and release compatible future engines without allowing them to bypass Kernel contracts or inherit undeclared trust.

## Responsibilities

- Register signed or otherwise verifiable engine manifests and capability contracts.
- Check DBCA/DBOS compatibility, interface versions, dependencies and declared permissions.
- Create isolated load sessions scoped to one mission or permitted shared service.
- Provide capability discovery and health status without equating availability with trust.
- Quarantine, unload or suspend engines after incompatibility, integrity failure or revocation.

## Non-responsibilities

Engine Loader does not implement engines, choose professional answers, grant authority, assert capability trust or allow engines to read undeclared Kernel state.

## Inputs

`EngineManifest`, engine identity/version, capability keys, required/provided contracts, DBCA/DBOS compatibility range, integrity evidence, permission requirements, configuration schema, health policy and load/unload request.

## Outputs

`EngineRegistration`, compatibility result, capability catalogue entry, scoped `LoadSession`, health status, quarantine record and engine lifecycle events.

## Interfaces

| Interface | Behaviour |
|---|---|
| `IF-ENG-01 RegisterEngine` | Validate manifest, identity, integrity and compatibility |
| `IF-ENG-02 DiscoverCapability` | Return compatible candidates and limitations without choosing trust |
| `IF-ENG-03 OpenLoadSession` | Create a permission- and context-bounded session |
| `IF-ENG-04 CheckHealth` | Report contract readiness and runtime-independent health semantics |
| `IF-ENG-05 CloseLoadSession` | Reconcile work and revoke session-scoped access |
| `IF-ENG-06 QuarantineEngine` | Prevent new sessions and trigger affected mission review |

## State

Registration states are `submitted`, `validated`, `available`, `degraded`, `suspended`, `quarantined`, `retired` and `superseded`. Load sessions are `opening`, `active`, `closing`, `closed` or `failed`. Version change creates a distinct registration and trust key.

## Requirements and invariants

- `DBOS-KRN-011-R1`: every engine MUST declare identity, version, capability, contracts, compatibility, permissions and failure semantics.
- `DBOS-KRN-011-R2`: unsupported DBCA, DBOS or interface versions MUST be rejected before loading.
- `DBOS-KRN-011-R3`: a load session MUST receive only declared context, authority and configuration.
- `DBOS-KRN-011-R4`: availability MUST remain separate from trust, authority and delegation.
- `DBOS-KRN-011-R5`: material engine, model, tool, method or data-source change MUST trigger trust revalidation.
- `DBOS-KRN-011-R6`: engine failure MUST not corrupt Kernel state or suppress audit evidence.
- `DBOS-KRN-011-R7`: v0.1.0 MUST register no Assessment Intelligence implementation.

## Dependencies

Requires Permissions, Configuration, State Manager, Event Bus, Timeline and Audit Trail. Supplies capability readiness to Mission Control and Task Manager.

## Future extension points

Engine package verification, sandbox profiles, resource controls, hot replacement and capability routing MAY be added. All remain subordinate to declared contracts and capability-specific trust.

## Failure behaviour

Invalid manifest, integrity failure, version mismatch, missing dependency, denied permission, health failure and session leakage return typed failures. Failed engines are isolated; dependent tasks block or use an explicitly approved compatible fallback. Silent downgrade is prohibited.

## Observability, security and privacy

Registration, compatibility, session scope, health, quarantine and unload are audited. Secrets and sensitive context are never written into manifests or general event payloads.

