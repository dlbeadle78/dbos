# DBOS Specification Standard

| Field | Value |
|---|---|
| Document ID | DBOS-GOV-003 |
| Status | Approved |
| Version | 0.1.0 |
| Dependencies | DBCA ES-000; DBCA STD-009 |

## Purpose

Define how DBOS engineering specifications are written, interpreted and validated.

## Required content

Every subsystem specification MUST contain:

1. purpose and responsibilities;
2. explicit non-responsibilities;
3. typed inputs and outputs;
4. named logical interfaces;
5. owned and referenced state;
6. dependencies and prohibited dependency directions;
7. invariants and normative requirements with stable identifiers;
8. extension points that cannot weaken base contracts;
9. typed failure behaviour, containment and recovery;
10. observability, security, privacy and behaviour references.

## Interpretation

Contracts describe semantics, not classes, transport, storage or vendor products. Requirements use `[document-ID]-R[number]`. Interface operations use `IF-[SUBSYSTEM]-[number]`. Events use a stable past-tense name and semantic version.

Normative documents are Markdown. Examples and diagrams clarify but do not override written requirements. If two DBOS documents conflict, the order is governance, accepted ADR, contract, architecture, subsystem, interface, behaviour, diagram.

## Quality rules

- One subsystem owns each mutable source of truth.
- Referenced state is never mutated through a read interface.
- Every mutation defines preconditions, postconditions, emitted events and idempotency behaviour.
- Failure is typed and does not masquerade as success or empty data.
- Terminal records are preserved; correction produces a new version or superseding record.
- Sensitive content is referenced where possible and retained only for declared need.
- Relative time resolves against an explicit date and timezone.
- Application technology and executable pseudocode are prohibited in v0.1.0.

## Change control

An accepted ADR is required for a new subsystem, source-of-truth transfer, dependency inversion, contract-breaking change or weakened control. Editorial clarification does not require an ADR if behaviour and traceability remain unchanged.

