# Decision Log Specification

| Field | Value |
|---|---|
| Document ID | DBOS-KRN-007 |
| Status | Approved |
| Version | 0.1.0 |
| DBCA authority | REC-005; ADR-005; ES-011 |

## Purpose

Preserve accountable mission, operational and strategic decisions with ownership, authority, evidence and review triggers.

## Responsibilities

- Record decision question, class, owner, options and constraints.
- Link evidence, claims and recorded rationale without fabricating hidden reasoning.
- Distinguish proposal, recommendation, human decision and system operation.
- Record effective time, review trigger, affected objects and observed outcome.
- Supersede decisions while preserving historical applicability.

## Non-responsibilities

Decision Log does not make decisions, convert recommendations into Dave's approval, replace ADRs for architecture choices or store private chain-of-thought.

## Inputs

`DecisionProposal`, decision class, owner, options, evidence/claim references, constraints, authority grant, chosen option, concise rationale, effective time, review trigger and outcome update.

## Outputs

`DecisionRecord`, decision status, decision view, supersession link, review-due event and integrity result.

## Interfaces

| Interface | Behaviour |
|---|---|
| `IF-DEC-01 OpenDecision` | Create an unresolved decision question with owner and class |
| `IF-DEC-02 RecordDecision` | Commit the authorised choice and its evidence-linked rationale |
| `IF-DEC-03 SupersedeDecision` | Create a replacement while preserving validity intervals |
| `IF-DEC-04 RecordOutcome` | Append observed outcome and learning reference |
| `IF-DEC-05 GetDecisionView` | Return the applicable decision as of time and scope |
| `IF-DEC-06 ListReviewsDue` | Identify triggered reviews without deciding them |

## State

States are `proposed`, `awaiting-owner`, `decided`, `effective`, `under-review`, `superseded`, `withdrawn` and `expired`. A decided record is immutable; outcome observations append, and changed choice creates supersession.

## Requirements and invariants

- `DBOS-KRN-007-R1`: every decision MUST identify its human or authorised system owner and state.
- `DBOS-KRN-007-R2`: a recommendation MUST NOT be recorded as Dave's decision without confirmation evidence.
- `DBOS-KRN-007-R3`: records MUST link evidence and reasoning references but MUST NOT invent unavailable rationale.
- `DBOS-KRN-007-R4`: strategic or constitutional choices MUST reference applicable approval or ADR.
- `DBOS-KRN-007-R5`: retrieval MUST respect effective time, scope and supersession.
- `DBOS-KRN-007-R6`: material late evidence MUST trigger review of overlapping decisions.

## Dependencies

Requires Permissions, Timeline, Event Bus, State Manager and Audit Trail. References Mission Control, Project, Case File and Context records.

## Future extension points

Precedent candidacy, decision comparison and outcome calibration MAY be added. Reuse requires explicit scope and cannot turn one outcome into a universal rule.

## Failure behaviour

Missing owner, ambiguous authority, evidence-reference failure, stale version and invalid state block recording. If outcome evidence is unavailable, the decision remains valid within its existing basis and the outcome is marked unknown rather than inferred.

## Observability, security and privacy

Material decisions, authority, supersession and outcome updates are audited. User-facing rationale remains concise, evidence-linked and safe to expose.

