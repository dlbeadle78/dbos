# DBOS-ADR-003: Append-Only Semantic Versioning and Supersession

| Field | Value |
|---|---|
| Status | Accepted |
| Decision date | 2026-07-21 |
| Scope | Material records and lifecycle history |
| DBCA authority | ARC-005; ARC-009; Constitution Article 9 |

## Context

Corrections, late evidence and changing plans must preserve what was known and relied upon at the time. In-place overwrite loses temporal truth and prevents reliable impact analysis.

## Decision

Meaning-changing updates create a new immutable version or superseding record. State transitions, decisions, baselines, context packages, configuration and manifests are append-only in semantic history. Views select the applicable version for an explicit `as_of` time.

Content disposal may remove protected content under retention policy, but preserves the minimum authorised fact and integrity evidence that a record existed.

## Consequences

Historical reconstruction and late-evidence analysis are possible. Retention, indexing and version selection require care, and views must distinguish current, expired, disputed and superseded state.

## Alternatives rejected

- In-place correction: rejected because it erases relied-upon meaning.
- Full immutable content forever: rejected because privacy and retention duties may require authorised disposal.

## Failure controls

Version conflict rejects write. Repair creates a new linked version; administrators cannot silently rewrite accepted history.

