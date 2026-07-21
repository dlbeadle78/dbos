# DBOS-ADR-009: TypeScript and Node.js Runtime Baseline

| Field | Value |
|---|---|
| Status | Proposed for approval |
| Decision date | 2026-07-21 |
| Scope | DBOS v0.2.0 Core Runtime language, runtime and module system |
| DBCA authority | ES-000; ES-006; ES-009; STD-009 |
| Supersedes | None |
| Depends on | DBOS-ADR-001; DBOS-ADR-002; DBOS-ASR-005 |

## Context

DBOS v0.1.0 defines versioned contracts, typed failures, guarded state transitions and event-driven subsystem coordination without selecting an implementation language. The Core Runtime needs one supported execution environment that can express those contracts precisely, support future operator interfaces and remain straightforward to test and package.

Node.js 24 is the current long-term-support line. TypeScript provides discriminated unions and strict structural checks suited to DBOS records, state results, permissions and failure envelopes. TypeScript guidance identifies `NodeNext` as the appropriate module mode for modern Node.js projects.

## Problem Statement

Select a language, runtime, module system and compiler posture that minimise contract drift while providing a stable v0.2.0 support boundary. The choice must not make compile-time types a substitute for runtime validation of persisted, configured or cross-interface data.

## Decision

DBOS v0.2.0 SHALL use TypeScript on Node.js 24 LTS with native ECMAScript modules and TypeScript `NodeNext` module and resolution settings.

The repository SHALL pin:

- the Node.js major and minimum supported patch;
- the npm major;
- one exact TypeScript compiler version; and
- all direct dependency versions through the lockfile.

Compiler settings SHALL include `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noImplicitOverride`, `noFallthroughCasesInSwitch` and `useUnknownInCatchVariables`. State, permission, event, failure and response-status unions SHALL be exhaustively handled. Use of `any` requires a narrow, documented exception.

TypeScript types SHALL be implementation mirrors. JSON Schema validation SHALL protect external, persisted and configuration boundaries. DBOS Markdown contracts remain authoritative.

The exact compiler version and minimum Node.js patch SHALL be confirmed by SPK-01 before production code begins. Runtime code SHALL use only APIs supported by the pinned Node.js 24 baseline.

Sources consulted:

- [Node.js download and release status](https://nodejs.org/en/download)
- [TypeScript module configuration](https://www.typescriptlang.org/tsconfig/module)

## Alternatives Considered

- **Python:** strong integration ecosystem and rapid development, but weaker default alignment between static and runtime contract enforcement and an additional language for future web-facing surfaces.
- **Go:** strong deployment and concurrency characteristics, but more friction for rapidly evolving JSON contracts and likely duplication with future operator-interface code.
- **Plain JavaScript:** reduces compilation steps but loses the static guarantees needed for versioned unions and package boundaries.
- **Node.js Current:** provides newer APIs but has a shorter stability horizon than the LTS baseline.
- **CommonJS:** mature but inconsistent with the chosen modern Node.js and package-export posture.

## Consequences

- Kernel packages share one type system and module format.
- Builds require a compilation and type-check stage.
- Runtime validators remain mandatory despite static typing.
- Consumers must respect explicit package exports and ESM file-resolution rules.
- Specialised future engines may use another language only through versioned DBOS interfaces.

## Risks

- Compiler or Node.js upgrades may alter module resolution or declaration output.
- Developers may confuse TypeScript acceptance with trustworthy runtime data.
- ESM and mixed-module dependencies may create tooling incompatibilities.
- Runtime-specific APIs may make later portability expensive.

## Mitigations

- Pin versions and treat upgrades as reviewed dependency changes.
- Execute identical positive and negative fixtures against types and JSON Schemas in SPK-01.
- Reject CommonJS-only or unstable dependencies unless isolated behind an adapter.
- Keep Node-specific facilities behind ports where they affect persistence, clocks, logging or process lifecycle.
- Run clean-install, build and test checks on the minimum supported Node.js patch.

## Traceability back to DBCA

| DBCA obligation | DBOS realisation |
|---|---|
| ES-000 and STD-009 quality and specification discipline | Strict compiler posture, pinned toolchain and executable contract checks |
| ES-006 contract-driven integration | Versioned exported interfaces and runtime schema validation |
| ES-009 validation | Positive, negative and parity fixtures before production implementation |
| DBCA/DBOS separation | Types mirror DBOS contracts and cannot replace or amend DBCA or DBOS Markdown |

## Affected Kernel Subsystems

All sixteen Kernel subsystems, all contract packages, Kernel Runtime, testkit, storage and observability adapters.

## Future Impact

Node.js and TypeScript upgrades require compatibility evidence and an ADR review. Web, desktop or service interfaces can reuse contract types, but no interface may import subsystem internals. Non-TypeScript engines remain possible through Engine Loader contracts and do not change the Kernel runtime decision.
