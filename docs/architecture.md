# Frontend workspace architecture

## Decision

This repository uses pnpm workspaces and Turborepo. Patient, provider, admin, and blog experiences live under `apps` as separate TanStack Router applications. Shared packages contain UI, transport-safe types, and the API client. The backend is an external service configured through `VITE_API_URL` and is not a workspace dependency.

## Why

- Separate frontend deployment units prevent provider/admin dependencies and policies leaking into the public or patient bundles.
- Shared wire contracts avoid sharing database models with browsers.
- A typed HTTP boundary allows frontend and backend repositories to release independently.

## Constraints

- No direct database access from frontend applications.
- No imports from the backend repository; integration happens only through versioned HTTP contracts.
- No PHI in shared browser state unless needed for the current view, and never in persistent browser storage.
- Blog/public workloads remain physically and logically separable from authenticated clinical workloads.
