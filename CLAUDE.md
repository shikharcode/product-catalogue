# Product Catalogue — Project Context

## What this is

A product catalogue PoC built for an Officeworks code challenge.

- **Frontend:** React 18 + TypeScript + Vite + React Router + Tailwind, in `frontend/`
- **Backend:** Node.js + Express + TypeScript, in `backend/`
- **Email (dev):** MailHog via Docker Compose

## Key architectural rule

Product data and email are behind **interfaces** (`ProductService`, `EmailService`).
The concrete adapters (`FakeStoreProductService`, `NodemailerEmailService`) live in
`backend/src/services/`. Swap the adapter in `backend/src/index.ts` to change data source
or email provider — nothing else needs to change.

## Running locally

```bash
cp .env.example .env
docker compose up
# App: http://localhost:5173  |  MailHog: http://localhost:8025
```

## Tests

```bash
cd backend && npm test
cd frontend && npm test
```

## Conventions

- Backend routes use `create*Router(service)` factory functions — services are injected, not imported directly, so tests pass mock implementations.
- Frontend API calls go through `frontend/src/api/client.ts` only — never `fetch` directly in components.
- No new abstractions without a concrete second use case.
