# Future Kernel Implementation Entry Criteria

| Field | Value |
|---|---|
| Document ID | DBOS-ASR-005 |
| Status | Approved gate |
| Applies after | DBOS v0.1.0 specification release |

## Purpose

Prevent a future code implementation from bypassing unresolved technology, security and operational decisions.

## Entry conditions

Before application code begins, the next release plan MUST:

1. confirm DBCA baseline and complete change impact since v1.0.0;
2. choose a minimal implementation slice, starting with canonical records and State Manager rather than a domain engine;
3. record ADRs for runtime topology, persistence, identity/authentication, transaction boundaries, integrity, secret handling and deployment;
4. define threat model, data classification, retention and recovery objectives;
5. create machine-readable mirrors that trace to, but do not replace, Markdown contracts;
6. implement executable fixtures for applicable scenarios before domain behaviour;
7. demonstrate atomic state/event/audit semantics under chosen technology;
8. validate concurrency, replay, idempotency, rollback and unknown-side-effect recovery;
9. keep Assessment Intelligence outside the Kernel implementation slice;
10. produce a conformance report that distinguishes test passes, approved exceptions and unimplemented requirements.

## Prohibited shortcuts

Document count is not runtime conformance. A prototype interface, model response, database row, successful tool call or passing happy-path test cannot substitute for permissions, evidence boundary, state guards, audit and negative behaviour.

## Exit from gate

Dave approves the implementation release scope after reviewing its ADRs, risk analysis, dependency order and acceptance tests. This gate cannot grant itself approval.

