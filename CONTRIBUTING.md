# Contributing to DBOS specifications

Changes MUST preserve the authority of DBCA v1.0.0 unless a later DBCA baseline is explicitly adopted through impact analysis and an accepted DBOS ADR.

## Change requirements

1. Identify affected DBCA obligations and DBOS requirement identifiers.
2. Update contracts before dependent subsystem behaviour.
3. Add or amend behavioural scenarios for every normative change.
4. Record a DBOS ADR for a durable structural or implementation-boundary decision.
5. Update the traceability matrix and validation report.
6. Use UK English and preserve technology-neutral semantics.

Breaking semantic changes require a major version increase. Additive backwards-compatible changes require a minor version increase. Clarifications and corrections that do not change behaviour require a patch increase.

Specifications MUST NOT contain secrets, personal data, executable application code or live prompts.

