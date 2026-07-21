// GENERATED FROM packages/contracts/model/contracts.json. DO NOT EDIT.

/** Identity, ownership, time and provenance for every material Kernel record. Trace: DBOS-CTR-001 docs/03-contracts/DBOS-CTR-001-canonical-record.md */
export interface CanonicalRecord {
  readonly record_id: string;
  readonly record_type: string;
  readonly contract_version: string;
  readonly record_version: number;
  readonly owner: string;
  readonly lifecycle_state: string;
  readonly created_at: string;
  readonly updated_at: string;
  readonly effective_interval: Readonly<{ readonly start: string | null; readonly end: string | null; readonly unknown_reason: string | null; }> | null;
  readonly origin_ref: string | null;
  readonly provenance_type: "governing" | "verified-evidence" | "user-declared" | "inferred" | "generated" | "unknown";
  readonly mission_id: string | null;
  readonly correlation_id: string;
  readonly sensitivity: "public" | "internal" | "confidential" | "restricted" | "unknown";
  readonly supersedes: string | null;
}

/** Logical command or query sent between declared components. Trace: DBOS-CTR-002 docs/03-contracts/DBOS-CTR-002-component-envelope.md */
export interface ComponentRequest {
  readonly message_id: string;
  readonly message_type: "command" | "query";
  readonly contract_version: string;
  readonly correlation_id: string;
  readonly causation_id: string | null;
  readonly mission_id: string | null;
  readonly step_id: string | null;
  readonly sender: Readonly<{ readonly component_id: string; readonly component_version: string; }>;
  readonly recipient: Readonly<{ readonly component_id: string; readonly component_version: string; }>;
  readonly operation: string;
  readonly input_refs: ReadonlyArray<string>;
  readonly context_package_ref: string | null;
  readonly evidence_boundary_ref: string | null;
  readonly permission_decision_ref: string | null;
  readonly deadline_or_stop: Readonly<{ readonly deadline: string | null; readonly stop_condition: string | null; }>;
  readonly idempotency_key: string | null;
  readonly sensitivity: "public" | "internal" | "confidential" | "restricted" | "unknown";
}

/** Truthful response to a component request. Trace: DBOS-CTR-002 docs/03-contracts/DBOS-CTR-002-component-envelope.md */
export interface ComponentResponse {
  readonly message_id: string;
  readonly contract_version: string;
  readonly correlation_id: string;
  readonly mission_id: string | null;
  readonly step_id: string | null;
  readonly operation: string;
  readonly responder: Readonly<{ readonly component_id: string; readonly component_version: string; }>;
  readonly status: "succeeded" | "succeeded-with-limitations" | "blocked" | "failed" | "cancelled";
  readonly output_refs: ReadonlyArray<string>;
  readonly claims: ReadonlyArray<string>;
  readonly verification_state: "verified" | "partially-verified" | "unverified" | "not-applicable";
  readonly limitations: ReadonlyArray<string>;
  readonly events: ReadonlyArray<string>;
  readonly side_effects: ReadonlyArray<string>;
  readonly failure_ref: string | null;
  readonly sensitivity: "public" | "internal" | "confidential" | "restricted" | "unknown";
}

/** Immutable material fact published by its owning producer. Trace: DBOS-CTR-003 docs/03-contracts/DBOS-CTR-003-event-envelope.md */
export interface EventEnvelope {
  readonly event_id: string;
  readonly event_type: string;
  readonly event_version: string;
  readonly producer: string;
  readonly producer_version: string;
  readonly source_record_id: string;
  readonly source_record_version: number;
  readonly source_sequence: number;
  readonly event_time: string;
  readonly recorded_time: string;
  readonly correlation_id: string;
  readonly causation_id: string | null;
  readonly mission_id: string | null;
  readonly actor_ref: string;
  readonly permission_decision_ref: string | null;
  readonly payload_or_refs: Readonly<{ readonly payload: string | null; readonly record_refs: ReadonlyArray<string>; }>;
  readonly sensitivity: "public" | "internal" | "confidential" | "restricted" | "unknown";
  readonly integrity_ref: string;
}

/** Bounded authority granted to a named actor or component. Trace: DBOS-CTR-004 docs/03-contracts/DBOS-CTR-004-permission.md */
export interface AuthorityGrant {
  readonly grant_id: string;
  readonly grantor: string;
  readonly grantee: string;
  readonly capability: string;
  readonly action_class: string;
  readonly target_scope: ReadonlyArray<string>;
  readonly delegation_level: "none" | "bounded" | "delegable";
  readonly permitted_side_effects: ReadonlyArray<string>;
  readonly prohibited_actions: ReadonlyArray<string>;
  readonly effective_interval: Readonly<{ readonly start: string; readonly end: string | null; }>;
  readonly confirmation_rule: string;
  readonly evidence_of_grant: ReadonlyArray<string>;
  readonly state: "draft" | "active" | "suspended" | "revoked" | "expired";
  readonly supersedes: string | null;
  readonly revocation_reason: string | null;
}

/** Operation-specific request for authority evaluation. Trace: DBOS-CTR-004 docs/03-contracts/DBOS-CTR-004-permission.md */
export interface PermissionRequest {
  readonly request_id: string;
  readonly actor_identity: string;
  readonly component: string;
  readonly capability: string;
  readonly mission_id: string | null;
  readonly step_id: string | null;
  readonly operation: string;
  readonly target: string;
  readonly input_scope: ReadonlyArray<string>;
  readonly output_scope: ReadonlyArray<string>;
  readonly proposed_side_effects: ReadonlyArray<string>;
  readonly impact: "low" | "medium" | "high" | "critical";
  readonly reversibility: "reversible" | "partially-reversible" | "irreversible" | "unknown";
  readonly recipient_certainty: "confirmed" | "unconfirmed" | "not-applicable";
  readonly relevant_grants: ReadonlyArray<string>;
  readonly confirmation_evidence: ReadonlyArray<string>;
  readonly evaluation_time: string;
  readonly idempotency_key: string;
}

/** Exact allow, deny, confirmation or indeterminate outcome. Trace: DBOS-CTR-004 docs/03-contracts/DBOS-CTR-004-permission.md */
export interface PermissionDecision {
  readonly decision_id: string;
  readonly request_id: string;
  readonly outcome: "allow" | "deny" | "confirmation-required" | "indeterminate";
  readonly controlling_grants: ReadonlyArray<string>;
  readonly controlling_prohibitions: ReadonlyArray<string>;
  readonly permitted_operation: string | null;
  readonly permitted_target: string | null;
  readonly obligations: ReadonlyArray<string>;
  readonly valid_from: string;
  readonly valid_until: string | null;
  readonly evaluation_policy_version: string;
  readonly reason: string;
  readonly audit_ref: string;
}

/** Registered state machine and guard definition. Trace: DBOS-CTR-005 docs/03-contracts/DBOS-CTR-005-state-transition.md */
export interface StateModel {
  readonly model_id: string;
  readonly model_version: string;
  readonly object_type: string;
  readonly states: ReadonlyArray<string>;
  readonly initial_state: string;
  readonly terminal_states: ReadonlyArray<string>;
  readonly permitted_transitions: ReadonlyArray<Readonly<{ readonly from: string; readonly to: string; readonly mandatory_intermediate: boolean; }>>;
  readonly guard_definitions: ReadonlyArray<Readonly<{ readonly guard_id: string; readonly description: string; }>>;
  readonly required_authority_classes: ReadonlyArray<string>;
  readonly supersession_policy: string;
}

/** Version-guarded request to change object state. Trace: DBOS-CTR-005 docs/03-contracts/DBOS-CTR-005-state-transition.md */
export interface TransitionRequest {
  readonly request_id: string;
  readonly object_id: string;
  readonly object_type: string;
  readonly object_version: number;
  readonly model_id: string;
  readonly model_version: string;
  readonly expected_current_state: string;
  readonly target_state: string;
  readonly actor_ref: string;
  readonly permission_decision_ref: string;
  readonly guard_evidence_refs: ReadonlyArray<string>;
  readonly reason: string;
  readonly event_time: string;
  readonly correlation_id: string;
  readonly idempotency_key: string;
}

/** Atomic record of a committed guarded transition. Trace: DBOS-CTR-005 docs/03-contracts/DBOS-CTR-005-state-transition.md */
export interface TransitionRecord {
  readonly transition_id: string;
  readonly request_ref: string;
  readonly prior_state: string;
  readonly target_state: string;
  readonly prior_object_version: number;
  readonly new_object_version: number;
  readonly evaluated_guards: ReadonlyArray<Readonly<{ readonly guard_id: string; readonly result: boolean; readonly evidence_ref: string | null; }>>;
  readonly actor_ref: string;
  readonly authority_ref: string;
  readonly event_time: string;
  readonly recorded_time: string;
  readonly reason: string;
  readonly committed_event_ref: string;
}

/** Truthful failure, containment and retry-safety record. Trace: DBOS-CTR-006 docs/03-contracts/DBOS-CTR-006-failure-recovery.md */
export interface FailureRecord {
  readonly failure_id: string;
  readonly category: "input" | "evidence" | "authority" | "capability" | "dependency" | "state" | "verification" | "side-effect" | "acceptance" | "security" | "consistency" | "unknown";
  readonly code: string;
  readonly safe_summary: string;
  readonly source_component: string;
  readonly source_version: string;
  readonly operation: string;
  readonly mission_id: string | null;
  readonly correlation_id: string;
  readonly affected_object_refs: ReadonlyArray<string>;
  readonly event_time: string;
  readonly recorded_time: string;
  readonly partial_outputs: ReadonlyArray<string>;
  readonly side_effect_state: "none" | "not-started" | "confirmed-complete" | "confirmed-partial" | "confirmed-failed" | "unknown";
  readonly evidence_preserved: ReadonlyArray<string>;
  readonly retry_safety: "safe-idempotent" | "safe-after-reconciliation" | "unsafe" | "unknown";
  readonly containment_applied: ReadonlyArray<string>;
  readonly recovery_owner: string;
  readonly permitted_recovery_actions: ReadonlyArray<string>;
  readonly sensitivity: "public" | "internal" | "confidential" | "restricted" | "unknown";
}

/** Linked recovery attempt that never overwrites the original failure. Trace: DBOS-CTR-006 docs/03-contracts/DBOS-CTR-006-failure-recovery.md */
export interface RecoveryRecord {
  readonly recovery_id: string;
  readonly failure_ref: string;
  readonly chosen_action: string;
  readonly authority_ref: string;
  readonly preconditions: ReadonlyArray<string>;
  readonly attempt: number;
  readonly result: "succeeded" | "failed" | "blocked" | "cancelled" | "unknown";
  readonly residual_risk: ReadonlyArray<string>;
  readonly preserved_evidence: ReadonlyArray<string>;
  readonly normal_work_may_resume: boolean;
}

/** Declared source and verification boundary for a mission or projection. Trace: DBOS-CTR-007 docs/03-contracts/DBOS-CTR-007-temporal-evidence-boundary.md */
export interface EvidenceBoundary {
  readonly boundary_id: string;
  readonly mission_id: string | null;
  readonly scope: string;
  readonly included_sources: ReadonlyArray<string>;
  readonly inaccessible_sources: ReadonlyArray<string>;
  readonly provenance_types: ReadonlyArray<string>;
  readonly source_versions: ReadonlyArray<Readonly<{ readonly source_ref: string; readonly version: string; }>>;
  readonly retrieval_state: "complete" | "partial" | "failed" | "not-attempted";
  readonly verification_state: "verified" | "partially-verified" | "unverified";
  readonly recency: string;
  readonly material_gaps: ReadonlyArray<string>;
  readonly known_conflicts: ReadonlyArray<string>;
  readonly general_knowledge_allowance: "none" | "background-only" | "explicitly-authorised";
  readonly created_at: string;
  readonly supersedes: string | null;
}

/** Explicit event, effective, recorded, verified or expiry assertion. Trace: DBOS-CTR-007 docs/03-contracts/DBOS-CTR-007-temporal-evidence-boundary.md */
export interface TemporalAssertion {
  readonly assertion_ref: string;
  readonly temporal_type: "event" | "effective" | "recorded" | "verified" | "expiry";
  readonly instant: string | null;
  readonly interval: Readonly<{ readonly start: string | null; readonly end: string | null; }> | null;
  readonly timezone: string;
  readonly precision: "exact" | "day" | "month" | "year" | "approximate" | "unknown";
  readonly source_ref: string;
  readonly confidence: number;
  readonly unknown_reason: string | null;
}

/** Immutable compatibility and capability declaration for a future engine version. Trace: DBOS-CTR-008 docs/03-contracts/DBOS-CTR-008-engine-manifest.md */
export interface EngineManifest {
  readonly engine_id: string;
  readonly name: string;
  readonly version: string;
  readonly publisher: string;
  readonly origin: string;
  readonly integrity_evidence: ReadonlyArray<string>;
  readonly capability_keys: ReadonlyArray<string>;
  readonly dbca_compatibility: ReadonlyArray<string>;
  readonly dbos_compatibility: ReadonlyArray<string>;
  readonly provided_interfaces: ReadonlyArray<string>;
  readonly required_interfaces: ReadonlyArray<string>;
  readonly configuration_definitions: ReadonlyArray<string>;
  readonly requested_permissions: ReadonlyArray<string>;
  readonly input_contracts: ReadonlyArray<string>;
  readonly output_contracts: ReadonlyArray<string>;
  readonly event_types: ReadonlyArray<string>;
  readonly failure_semantics: ReadonlyArray<string>;
  readonly health_contract: string;
  readonly resource_classes: ReadonlyArray<string>;
  readonly data_handling_declaration: string;
}

/** Bounded runtime session; no domain execution is implemented in v0.2.0 stage one. Trace: DBOS-CTR-008 docs/03-contracts/DBOS-CTR-008-engine-manifest.md */
export interface LoadSession {
  readonly session_id: string;
  readonly engine_id: string;
  readonly engine_version: string;
  readonly mission_id: string | null;
  readonly step_id: string | null;
  readonly capability: string;
  readonly permission_decision_ref: string;
  readonly context_package_version: string;
  readonly evidence_boundary_ref: string;
  readonly configuration_version: string;
  readonly allowed_interfaces: ReadonlyArray<string>;
  readonly resource_limits: Readonly<{ readonly cpu_class: string; readonly memory_class: string; readonly duration_seconds: number; }>;
  readonly opened_at: string;
  readonly expires_at: string;
  readonly health_state: "starting" | "healthy" | "degraded" | "unhealthy" | "closed";
  readonly close_result: string | null;
  readonly reconciliation_result: string | null;
}

