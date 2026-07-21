# Kernel Event Catalogue

| Field | Value |
|---|---|
| Document ID | DBOS-IF-002 |
| Status | Approved |
| Event contract | DBOS-CTR-003 v1.0.0 |

## Purpose

Register the minimum public event vocabulary for v0.1.0.

## Events by owner

| Producer | Event types |
|---|---|
| Mission Control | `MissionRequested`, `MissionAdmitted`, `MissionPlanRevised`, `MissionAcceptanceFailed`, `MissionCompleted`, `MissionBlocked`, `MissionCancelled`, `LateEvidenceAssessed` |
| Workspace Manager | `WorkspaceCreated`, `WorkspaceMembershipChanged`, `WorkspaceArchived`, `WorkspaceRestored` |
| Case File Manager | `CaseFileOpened`, `CaseEntryRegistered`, `CaseEntryDisputed`, `CaseFileSealed`, `CaseFileDisposed` |
| Project Manager | `ProjectCreated`, `ProjectBaselined`, `ProjectChangeApproved`, `ProjectBlocked`, `ProjectCompleted` |
| Context Manager | `ContextPackageBuilt`, `ContextConflictDetected`, `ContextInvalidated`, `ContextRefreshed` |
| Memory Manager | `MemoryAdmitted`, `MemoryCorrected`, `MemoryExpired`, `MemoryForgotten` |
| Decision Log | `DecisionOpened`, `DecisionRecorded`, `DecisionReviewDue`, `DecisionSuperseded`, `DecisionOutcomeRecorded` |
| Task Manager | `TaskCreated`, `TaskReady`, `TaskStarted`, `TaskBlocked`, `TaskCompleted`, `TaskCancelled` |
| Timeline | `TemporalEntryRegistered`, `DeadlineDue`, `DeadlineOverdue`, `ValidityExpired`, `TemporalConflictDetected` |
| State Manager | `StateTransitioned`, `TransitionRejected`, `TransitionReconciliationRequired` |
| Engine Loader | `EngineRegistered`, `EngineAvailable`, `EngineSessionOpened`, `EngineQuarantined`, `EngineSessionClosed` |
| Permissions | `AuthorityGranted`, `PermissionAllowed`, `PermissionDenied`, `ConfirmationRequired`, `AuthorityRevoked` |
| Configuration | `ConfigurationProposed`, `ConfigurationActivated`, `ConfigurationRolledBack`, `ConfigurationRejected` |
| Event Bus | `EventDeadLettered`, `ReplayStarted`, `ReplayCompleted`, `SubscriptionSuspended` |
| Notification System | `NotificationCreated`, `NotificationSuppressed`, `NotificationDeferred`, `NotificationDeliveryUnknown`, `NotificationAcknowledged` |
| Audit Trail | `AuditGapDetected`, `AuditIntegrityFailed`, `AuditIntegrityRestored`, `RetentionHoldPlaced` |

## Event rules

- `DBOS-IF-002-R1`: only the source-of-truth owner publishes a domain event for its state.
- `DBOS-IF-002-R2`: permission denial, guard rejection and audit failure events MUST exclude protected request content.
- `DBOS-IF-002-R3`: consumers MUST subscribe to exact supported event types and major versions.
- `DBOS-IF-002-R4`: notification candidates derive from events but do not replace them.
- `DBOS-IF-002-R5`: every material mutation has at least one domain event and one audit record; these serve different purposes.

