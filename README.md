# Sona Frontend

Independent pnpm/Turborepo frontend repository for Sona.

## Applications

| Path            | Surface                      | Port |
| --------------- | ---------------------------- | ---- |
| `apps/web`      | Patient application          | 3000 |
| `apps/provider` | Provider workspace           | 3001 |
| `apps/admin`    | Administrative control plane | 3002 |
| `apps/blog`     | Public health content        | 3003 |

Shared packages provide the typed API client, browser-safe wire types, and UI system. The backend URL is configured through `VITE_API_URL`; there is no filesystem or package dependency on the backend repository.

## Run locally

```bash
cp .env.example .env
pnpm install
pnpm dev
```

## Verify

```bash
pnpm typecheck
pnpm test
pnpm build
pnpm format:check
```
