# DBOS Runtime Baseline v0.2.0

| Field | Value |
|---|---|
| Document ID | DBOS-GOV-004 |
| Baseline name | Runtime Baseline v0.2.0 |
| Status | Frozen |
| Freeze date | 2026-07-21 |
| Git ref | `runtime-baseline-v0.2.0` |
| Development branch | `develop/runtime-v0.2.0` |
| Architectural authority | DBCA v1.0.0 at `035377ca6e5b72bb732d59bc9b528bf337a0c274` |
| Kernel predecessor | DBOS v0.1.0 at `d142b25c361e809c90edca74013d2bb13b6f5065` |
| Authorisation | DBOS-ASR-009 |

## Baseline declaration

Runtime Baseline v0.2.0 freezes the approved documentation governing implementation of the DBOS Core Runtime. It includes the complete inherited DBOS v0.1.0 Kernel specification and the v0.2.0 readiness, ADR, spike and assurance decisions present at the immutable Git ref.

This is an implementation documentation baseline, not the DBOS v0.2.0 software release. The release version and release tag remain unavailable until implementation, conformance, validation and explicit release approval are complete.

## Included authority chain

1. DBCA v1.0.0 remains the architectural contract.
2. DBOS v0.1.0 remains the frozen Kernel semantic specification.
3. DBOS-ADR-009–016 define the accepted v0.2.0 implementation boundaries.
4. DBOS-SPK-001–003 provide bounded technical evidence.
5. DBOS-ASR-008 closes the pre-implementation assurance risks.
6. DBOS-ASR-009 records the runtime implementation authorisation decision.
7. DBOS-ROAD-001 controls implementation order and exit gates.

## Freeze rules

- The `runtime-baseline-v0.2.0` tag is immutable and must never be moved or recreated.
- DBCA v1.0.0 and DBOS v0.1.0 commits and tags remain unchanged.
- Implementation may add code and generated artefacts only after separate explicit user approval.
- An implementation discovery that contradicts this baseline blocks affected work.
- A material documentation change requires impact analysis, an ADR or decision update where applicable, repeated consistency review and a new baseline identifier.
- Editorial correction cannot silently change scope, authority, risk acceptance, contract semantics or release gates.
- Runtime implementation, validation and release evidence must trace back to this baseline.

## Implementation boundary

The baseline authorises the local, single-operator, synthetic-data Core Runtime described by DBOS-ASR-009. It does not authorise Assessment Intelligence, production data, external integration, external side effects, remote deployment, publication or release.

## Stop condition

Documentation preparation is complete and frozen. No runtime implementation begins from this baseline until the user gives an explicit instruction to write the first runtime code.
