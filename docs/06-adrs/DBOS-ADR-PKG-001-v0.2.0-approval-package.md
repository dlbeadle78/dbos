# DBOS v0.2.0 Architecture Approval Package

| Field | Value |
|---|---|
| Package ID | DBOS-ADR-PKG-001 |
| Status | Ready for approval |
| Target | DBOS v0.2.0 Core Runtime |
| DBCA baseline | v1.0.0 at `035377ca6e5b72bb732d59bc9b528bf337a0c274` |
| DBOS baseline | v0.1.0 at `d142b25c361e809c90edca74013d2bb13b6f5065` |
| Consistency evidence | DBOS-ASR-006 |

## Approval scope

This package requests approval of implementation-boundary decisions only. It does not approve runtime code, dependency installation, production data, external integration, release tagging or publication.

The package preserves DBCA as architectural authority and DBOS v0.1.0 as the frozen Kernel semantic baseline.

## Decision register

| ADR | Decision requested | Verification still required |
|---|---|---|
| DBOS-ADR-009 | TypeScript, Node.js 24 LTS, ESM and strict compiler posture | SPK-01 version and schema-parity evidence |
| DBOS-ADR-010 | Private npm workspace modular monolith and dependency rules | CI boundary enforcement during implementation |
| DBOS-ADR-011 | Embedded SQLite architecture and controlled transactions | SPK-02 driver and recovery evidence |
| DBOS-ADR-012 | Two-phase bootstrap, readiness and reverse-order shutdown | Failure-point lifecycle tests |
| DBOS-ADR-013 | Local-process-attested single operator | Threat-model approval |
| DBOS-ADR-014 | Durable Event Journal, transactional outbox and audit atomicity | SPK-03 crash-point evidence |
| DBOS-ADR-015 | Secret references, four-level classification and minimisation | Retention and data-governance approval |
| DBOS-ADR-016 | Local process with no remote or external-I/O capability | Deployment and prohibited-capability tests |

## Collective assurance

DBOS-ASR-006 confirms:

- all mandatory ADR sections are present;
- ADR-009–016 contain no unresolved internal conflict;
- the proposed decisions do not contradict accepted ADR-001–008;
- the two-phase bootstrap resolves the identified runtime dependency cycle;
- the storage, event and audit decisions preserve logical ownership;
- identity, permission, configuration and deployment authority remain separated;
- data minimisation and append-only accountability have an explicit policy boundary; and
- no DBCA conflict or untraceable specialisation was identified.

## Approval effect

Approval changes ADR-009–016 from `Proposed for approval` to `Accepted` in a subsequent documentation-only commit. It authorises the three bounded technical spikes and the remaining implementation-entry assurance work.

Approval does **not** authorise production runtime implementation. That authority remains withheld until every blocker in DBOS-ASR-006 and DBOS-ASR-005 is closed and the implementation scope is explicitly approved.

Rejection or requested amendment keeps the affected ADR proposed. Any material amendment requires the collective consistency review to run again.

## Approval choices

1. **Approve ADR-009–016 as a package:** proceed to a documentation-only acceptance commit, then the three bounded spikes and remaining assurance gates.
2. **Approve with named amendments:** revise only the identified decisions and repeat DBOS-ASR-006.
3. **Reject:** retain the readiness assessment but do not perform technical spikes or runtime implementation.

No approval is inferred from silence or from completion of this package.
