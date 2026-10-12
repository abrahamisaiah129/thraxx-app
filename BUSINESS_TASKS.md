# Fleet Manager App Task List

Use this checklist to finish the fleet manager app described in `TRAXX_WORKFLOW.md`.

## 1. Route and architecture cleanup

- [x] Use one canonical fleet-manager route folder: `app/fleet_manager`.
- [x] Confirm that no duplicate legacy role routes remain.
- [x] Keep route files in `app/fleet_manager` thin; move screen logic into `src/features/fleet_manager`.
- [x] Replace long relative imports with `@/...` imports.
- [x] Remove stale legacy route references from code and documentation.

## 2. Dashboard

- [ ] Make Active Deliveries, Idle Riders, Delayed Jobs, and Flags cards deep-link to filtered lists.
- [ ] Add loading skeletons, empty state, retryable error state, and populated state.
- [ ] Add a non-blocking offline banner and pending-sync indicators for mutations.
- [ ] Replace remaining hardcoded values with repository/API data.

## 3. Deliveries and dispatch

- [ ] Build create-delivery form with customer, pickup, destination, package, and contact fields.
- [ ] Generate and display a waybill tracking number.
- [ ] Add validation, Nigerian phone formatting, and Naira/date formatting.
- [ ] Build searchable rider assignment picker in a bottom sheet.
- [ ] Support manual and automatic rider assignment.
- [ ] Add assignment confirmation and success/error feedback.
- [ ] Add cancel-delivery confirmation with a clear consequence message.

## 4. Live fleet map

- [ ] Show status-colored rider markers.
- [ ] Add rider list bottom sheet with tap-to-focus behavior.
- [ ] Cluster markers when the fleet exceeds roughly 30 riders.
- [ ] Throttle live location updates and avoid re-rendering the entire map.
- [ ] Handle unavailable location permissions and map errors.
- [ ] Fix map marker description interpolation if it still contains escaped template syntax.

## 5. Riders and vehicles

- [ ] Build rider list with search, status filters, pagination, and pull-to-refresh.
- [ ] Build rider detail screen with assignments, availability, documents, and activity.
- [x] Add rider flow with Nigerian phone validation; identity document collection is deferred.
- [ ] Add vehicle registration and vehicle detail screens.
- [ ] Add remove-rider confirmation; prefer suspend/deactivate over destructive deletion.

## 6. Exceptions, requests, and notifications

- [ ] Build flags workflow: inspect, acknowledge, reassign, escalate, and resolve.
- [ ] Add clear priority/status chips using shared semantic statuses.
- [ ] Allow marking notifications read and deep-linking to the related record.
- [ ] Add retry/error handling for failed support actions.

## 7. Remaining feature screens

Replace placeholder `FeatureScreen` implementations with real fleet-manager screens:

- [ ] Analytics
- [ ] Booking/task creation
- [x] Keep the B2B account single-user; no people/team management screen.
- [ ] Pricing/billing
  - [ ] Offer Freemium (5 riders), Growth (20 riders), and Enterprise (custom/unlimited) plans.
- [ ] Reports/export
- [ ] Setup/fleet-manager onboarding
- [ ] Shifts
- [ ] Vendors
- [ ] AI assistant
- [ ] Profile and settings

## 8. Shared UI and states

- [ ] Reuse shared `Screen`, `OfflineBanner`, `StatePanel`, `StatusChip`, `Card`, and list-row components.
- [ ] Add a shared skeleton component for loading states.
- [ ] Ensure every list has loading, empty, error, offline, and populated states.
- [ ] Use theme tokens instead of raw hex colors and magic spacing values.
- [ ] Add accessibility labels and roles to every interactive control.

## 9. Performance and validation

- [ ] Use `FlatList` for dynamic lists with stable keys and memoized rows.
- [ ] Avoid inline heavy render functions on long lists.
- [ ] Verify layouts at 360dp Android width and a large iPhone width.
- [ ] Run `npx tsc --noEmit`.
- [ ] Run native and web smoke tests for dashboard, map, assignments, requests, riders, and settings.
