---
name: rn-ui
description: Build role-specific React Native UI for the Traxx rider, fleet manager, and admin apps.
---

# Traxx React Native UI skill

Traxx is a Nigerian logistics platform with three apps in one Expo Router codebase:

- `app/rider`: delivery riders; one-handed, outdoors, low-connectivity workflows.
- `app/fleet_manager`: fleet managers; dashboard, dispatch, fleet, deliveries, and reports.
- `app/admin`: Traxx staff; dense platform operations, businesses, billing, support, and audit.

## Architecture

- Keep `app/` routes thin; screens and business logic live in `src/features/<role>/screens`.
- Shared UI belongs in `src/components`; shared domain logic belongs in `src/features/shared`.
- Use the `@/*` alias for source imports.
- Use typed Expo Router paths without `/index`: `/rider`, `/fleet_manager`, `/admin`.
- Each role owns its navigator in its own `_layout.tsx`.
- Use shared theme tokens only; add missing tokens to `src/theme/tokens.ts`.

## UI rules

- Rider: large high-contrast content, one primary bottom action, max four tabs, offline-safe status updates.
- Fleet manager: medium-density dashboard, stat cards, searchable list/card workflows, live fleet overview.
- Admin: dense operational lists, filters, pagination-ready layouts, explicit reversible actions, visible environment.
- Every screen supports loading, empty, error, populated, and non-blocking offline states.
- Use `Screen`, `Pressable`, accessible labels, minimum 44px touch targets, and `StyleSheet.create`.
- Prefer `FlatList` for lists, memoized rows, and narrow store selectors.
- Status always includes text plus visual treatment; never rely on color alone.
- Use Nigerian currency and date conventions where applicable.

## Definition of done

- All three roles have a working route, navigator, role-specific home screen, and role-appropriate empty/loading/error/offline states.
- No cross-imports between role feature folders.
- TypeScript passes and route paths are typed.
