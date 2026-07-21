// GENERATED FROM packages/contracts/model/contracts.json. DO NOT EDIT.
import type * as Contracts from "./contracts.js";

type Equal<Left, Right> = (<Value>() => Value extends Left ? 1 : 2) extends (<Value>() => Value extends Right ? 1 : 2) ? true : false;
type Assert<Value extends true> = Value;

type CanonicalRecordKeysMatch = Assert<Equal<keyof Contracts.CanonicalRecord, "record_id" | "record_type" | "contract_version" | "record_version" | "owner" | "lifecycle_state" | "created_at" | "updated_at" | "effective_interval" | "origin_ref" | "provenance_type" | "mission_id" | "correlation_id" | "sensitivity" | "supersedes">>;
export const CanonicalRecordPositiveField: Pick<Contracts.CanonicalRecord, "record_id"> = {"record_id":"record_id-CanonicalRecord"};
// @ts-expect-error required fields intentionally missing
export const CanonicalRecordMissingRequired: Contracts.CanonicalRecord = {};
// @ts-expect-error wrong primitive type intentionally supplied
export const CanonicalRecordWrongType: Pick<Contracts.CanonicalRecord, "record_id"> = {"record_id":123};
type ComponentRequestKeysMatch = Assert<Equal<keyof Contracts.ComponentRequest, "message_id" | "message_type" | "contract_version" | "correlation_id" | "causation_id" | "mission_id" | "step_id" | "sender" | "recipient" | "operation" | "input_refs" | "context_package_ref" | "evidence_boundary_ref" | "permission_decision_ref" | "deadline_or_stop" | "idempotency_key" | "sensitivity">>;
export const ComponentRequestPositiveField: Pick<Contracts.ComponentRequest, "message_id"> = {"message_id":"message_id-ComponentRequest"};
// @ts-expect-error required fields intentionally missing
export const ComponentRequestMissingRequired: Contracts.ComponentRequest = {};
// @ts-expect-error wrong primitive type intentionally supplied
export const ComponentRequestWrongType: Pick<Contracts.ComponentRequest, "message_id"> = {"message_id":123};
type ComponentResponseKeysMatch = Assert<Equal<keyof Contracts.ComponentResponse, "message_id" | "contract_version" | "correlation_id" | "mission_id" | "step_id" | "operation" | "responder" | "status" | "output_refs" | "claims" | "verification_state" | "limitations" | "events" | "side_effects" | "failure_ref" | "sensitivity">>;
export const ComponentResponsePositiveField: Pick<Contracts.ComponentResponse, "message_id"> = {"message_id":"message_id-ComponentResponse"};
// @ts-expect-error required fields intentionally missing
export const ComponentResponseMissingRequired: Contracts.ComponentResponse = {};
// @ts-expect-error wrong primitive type intentionally supplied
export const ComponentResponseWrongType: Pick<Contracts.ComponentResponse, "message_id"> = {"message_id":123};
type EventEnvelopeKeysMatch = Assert<Equal<keyof Contracts.EventEnvelope, "event_id" | "event_type" | "event_version" | "producer" | "producer_version" | "source_record_id" | "source_record_version" | "source_sequence" | "event_time" | "recorded_time" | "correlation_id" | "causation_id" | "mission_id" | "actor_ref" | "permission_decision_ref" | "payload_or_refs" | "sensitivity" | "integrity_ref">>;
export const EventEnvelopePositiveField: Pick<Contracts.EventEnvelope, "event_id"> = {"event_id":"event_id-EventEnvelope"};
// @ts-expect-error required fields intentionally missing
export const EventEnvelopeMissingRequired: Contracts.EventEnvelope = {};
// @ts-expect-error wrong primitive type intentionally supplied
export const EventEnvelopeWrongType: Pick<Contracts.EventEnvelope, "event_id"> = {"event_id":123};
type AuthorityGrantKeysMatch = Assert<Equal<keyof Contracts.AuthorityGrant, "grant_id" | "grantor" | "grantee" | "capability" | "action_class" | "target_scope" | "delegation_level" | "permitted_side_effects" | "prohibited_actions" | "effective_interval" | "confirmation_rule" | "evidence_of_grant" | "state" | "supersedes" | "revocation_reason">>;
export const AuthorityGrantPositiveField: Pick<Contracts.AuthorityGrant, "grant_id"> = {"grant_id":"grant_id-AuthorityGrant"};
// @ts-expect-error required fields intentionally missing
export const AuthorityGrantMissingRequired: Contracts.AuthorityGrant = {};
// @ts-expect-error wrong primitive type intentionally supplied
export const AuthorityGrantWrongType: Pick<Contracts.AuthorityGrant, "grant_id"> = {"grant_id":123};
type PermissionRequestKeysMatch = Assert<Equal<keyof Contracts.PermissionRequest, "request_id" | "actor_identity" | "component" | "capability" | "mission_id" | "step_id" | "operation" | "target" | "input_scope" | "output_scope" | "proposed_side_effects" | "impact" | "reversibility" | "recipient_certainty" | "relevant_grants" | "confirmation_evidence" | "evaluation_time" | "idempotency_key">>;
export const PermissionRequestPositiveField: Pick<Contracts.PermissionRequest, "request_id"> = {"request_id":"request_id-PermissionRequest"};
// @ts-expect-error required fields intentionally missing
export const PermissionRequestMissingRequired: Contracts.PermissionRequest = {};
// @ts-expect-error wrong primitive type intentionally supplied
export const PermissionRequestWrongType: Pick<Contracts.PermissionRequest, "request_id"> = {"request_id":123};
type PermissionDecisionKeysMatch = Assert<Equal<keyof Contracts.PermissionDecision, "decision_id" | "request_id" | "outcome" | "controlling_grants" | "controlling_prohibitions" | "permitted_operation" | "permitted_target" | "obligations" | "valid_from" | "valid_until" | "evaluation_policy_version" | "reason" | "audit_ref">>;
export const PermissionDecisionPositiveField: Pick<Contracts.PermissionDecision, "decision_id"> = {"decision_id":"decision_id-PermissionDecision"};
// @ts-expect-error required fields intentionally missing
export const PermissionDecisionMissingRequired: Contracts.PermissionDecision = {};
// @ts-expect-error wrong primitive type intentionally supplied
export const PermissionDecisionWrongType: Pick<Contracts.PermissionDecision, "decision_id"> = {"decision_id":123};
type StateModelKeysMatch = Assert<Equal<keyof Contracts.StateModel, "model_id" | "model_version" | "object_type" | "states" | "initial_state" | "terminal_states" | "permitted_transitions" | "guard_definitions" | "required_authority_classes" | "supersession_policy">>;
export const StateModelPositiveField: Pick<Contracts.StateModel, "model_id"> = {"model_id":"model_id-StateModel"};
// @ts-expect-error required fields intentionally missing
export const StateModelMissingRequired: Contracts.StateModel = {};
// @ts-expect-error wrong primitive type intentionally supplied
export const StateModelWrongType: Pick<Contracts.StateModel, "model_id"> = {"model_id":123};
type TransitionRequestKeysMatch = Assert<Equal<keyof Contracts.TransitionRequest, "request_id" | "object_id" | "object_type" | "object_version" | "model_id" | "model_version" | "expected_current_state" | "target_state" | "actor_ref" | "permission_decision_ref" | "guard_evidence_refs" | "reason" | "event_time" | "correlation_id" | "idempotency_key">>;
export const TransitionRequestPositiveField: Pick<Contracts.TransitionRequest, "request_id"> = {"request_id":"request_id-TransitionRequest"};
// @ts-expect-error required fields intentionally missing
export const TransitionRequestMissingRequired: Contracts.TransitionRequest = {};
// @ts-expect-error wrong primitive type intentionally supplied
export const TransitionRequestWrongType: Pick<Contracts.TransitionRequest, "request_id"> = {"request_id":123};
type TransitionRecordKeysMatch = Assert<Equal<keyof Contracts.TransitionRecord, "transition_id" | "request_ref" | "prior_state" | "target_state" | "prior_object_version" | "new_object_version" | "evaluated_guards" | "actor_ref" | "authority_ref" | "event_time" | "recorded_time" | "reason" | "committed_event_ref">>;
export const TransitionRecordPositiveField: Pick<Contracts.TransitionRecord, "transition_id"> = {"transition_id":"transition_id-TransitionRecord"};
// @ts-expect-error required fields intentionally missing
export const TransitionRecordMissingRequired: Contracts.TransitionRecord = {};
// @ts-expect-error wrong primitive type intentionally supplied
export const TransitionRecordWrongType: Pick<Contracts.TransitionRecord, "transition_id"> = {"transition_id":123};
type FailureRecordKeysMatch = Assert<Equal<keyof Contracts.FailureRecord, "failure_id" | "category" | "code" | "safe_summary" | "source_component" | "source_version" | "operation" | "mission_id" | "correlation_id" | "affected_object_refs" | "event_time" | "recorded_time" | "partial_outputs" | "side_effect_state" | "evidence_preserved" | "retry_safety" | "containment_applied" | "recovery_owner" | "permitted_recovery_actions" | "sensitivity">>;
export const FailureRecordPositiveField: Pick<Contracts.FailureRecord, "failure_id"> = {"failure_id":"failure_id-FailureRecord"};
// @ts-expect-error required fields intentionally missing
export const FailureRecordMissingRequired: Contracts.FailureRecord = {};
// @ts-expect-error wrong primitive type intentionally supplied
export const FailureRecordWrongType: Pick<Contracts.FailureRecord, "failure_id"> = {"failure_id":123};
type RecoveryRecordKeysMatch = Assert<Equal<keyof Contracts.RecoveryRecord, "recovery_id" | "failure_ref" | "chosen_action" | "authority_ref" | "preconditions" | "attempt" | "result" | "residual_risk" | "preserved_evidence" | "normal_work_may_resume">>;
export const RecoveryRecordPositiveField: Pick<Contracts.RecoveryRecord, "recovery_id"> = {"recovery_id":"recovery_id-RecoveryRecord"};
// @ts-expect-error required fields intentionally missing
export const RecoveryRecordMissingRequired: Contracts.RecoveryRecord = {};
// @ts-expect-error wrong primitive type intentionally supplied
export const RecoveryRecordWrongType: Pick<Contracts.RecoveryRecord, "recovery_id"> = {"recovery_id":123};
type EvidenceBoundaryKeysMatch = Assert<Equal<keyof Contracts.EvidenceBoundary, "boundary_id" | "mission_id" | "scope" | "included_sources" | "inaccessible_sources" | "provenance_types" | "source_versions" | "retrieval_state" | "verification_state" | "recency" | "material_gaps" | "known_conflicts" | "general_knowledge_allowance" | "created_at" | "supersedes">>;
export const EvidenceBoundaryPositiveField: Pick<Contracts.EvidenceBoundary, "boundary_id"> = {"boundary_id":"boundary_id-EvidenceBoundary"};
// @ts-expect-error required fields intentionally missing
export const EvidenceBoundaryMissingRequired: Contracts.EvidenceBoundary = {};
// @ts-expect-error wrong primitive type intentionally supplied
export const EvidenceBoundaryWrongType: Pick<Contracts.EvidenceBoundary, "boundary_id"> = {"boundary_id":123};
type TemporalAssertionKeysMatch = Assert<Equal<keyof Contracts.TemporalAssertion, "assertion_ref" | "temporal_type" | "instant" | "interval" | "timezone" | "precision" | "source_ref" | "confidence" | "unknown_reason">>;
export const TemporalAssertionPositiveField: Pick<Contracts.TemporalAssertion, "assertion_ref"> = {"assertion_ref":"assertion_ref-TemporalAssertion"};
// @ts-expect-error required fields intentionally missing
export const TemporalAssertionMissingRequired: Contracts.TemporalAssertion = {};
// @ts-expect-error wrong primitive type intentionally supplied
export const TemporalAssertionWrongType: Pick<Contracts.TemporalAssertion, "assertion_ref"> = {"assertion_ref":123};
type EngineManifestKeysMatch = Assert<Equal<keyof Contracts.EngineManifest, "engine_id" | "name" | "version" | "publisher" | "origin" | "integrity_evidence" | "capability_keys" | "dbca_compatibility" | "dbos_compatibility" | "provided_interfaces" | "required_interfaces" | "configuration_definitions" | "requested_permissions" | "input_contracts" | "output_contracts" | "event_types" | "failure_semantics" | "health_contract" | "resource_classes" | "data_handling_declaration">>;
export const EngineManifestPositiveField: Pick<Contracts.EngineManifest, "engine_id"> = {"engine_id":"engine_id-EngineManifest"};
// @ts-expect-error required fields intentionally missing
export const EngineManifestMissingRequired: Contracts.EngineManifest = {};
// @ts-expect-error wrong primitive type intentionally supplied
export const EngineManifestWrongType: Pick<Contracts.EngineManifest, "engine_id"> = {"engine_id":123};
type LoadSessionKeysMatch = Assert<Equal<keyof Contracts.LoadSession, "session_id" | "engine_id" | "engine_version" | "mission_id" | "step_id" | "capability" | "permission_decision_ref" | "context_package_version" | "evidence_boundary_ref" | "configuration_version" | "allowed_interfaces" | "resource_limits" | "opened_at" | "expires_at" | "health_state" | "close_result" | "reconciliation_result">>;
export const LoadSessionPositiveField: Pick<Contracts.LoadSession, "session_id"> = {"session_id":"session_id-LoadSession"};
// @ts-expect-error required fields intentionally missing
export const LoadSessionMissingRequired: Contracts.LoadSession = {};
// @ts-expect-error wrong primitive type intentionally supplied
export const LoadSessionWrongType: Pick<Contracts.LoadSession, "session_id"> = {"session_id":123};
