# Product Catalogue

React 18 + TypeScript on the client, Node.js + Express + TypeScript on the server. Product data comes from the [Fake Store API](https://fakestoreapi.com) through the backend. Enquiry emails go to [MailHog](https://github.com/mailhog/MailHog). Copy [`.env.example`](.env.example) to `.env` — that is the only config.

**Docker (one command):** `cp .env.example .env && docker compose up --build`

**Without Docker (Node 22+):** start MailHog, then the API, then the app — three terminals:

```bash
docker run -p 1025:1025 -p 8025:8025 mailhog/mailhog
cd backend && npm install && npm start
cd frontend && npm install && npm start
```

App: http://localhost:5173 · API: http://localhost:3001 · MailHog: http://localhost:8025

`npm start` builds and runs. Use `npm run dev` only while coding (watch / HMR). Tests: `cd backend && npm test` · `cd frontend && npm test`. Details: [`backend/README.md`](backend/README.md), [`frontend/README.md`](frontend/README.md).

## Architecture

```
browser → Vite (:5173)  /api/* proxy  →  Express (:3001)
                                          ├─ IProductService → FakeStoreProductService
                                          └─ IEmailService   → NodemailerEmailService
```

The client never calls Fake Store. Swap the data source or email provider by writing a new adapter and wiring it in `backend/src/index.ts`. Decisions: [`DECISIONS.md`](DECISIONS.md). AI notes: [`AI_USAGE.md`](AI_USAGE.md).

**Why this stack:** TypeScript on both sides (preferred in the brief). Express is small and familiar. MailHog needs no paid account. Docker Compose is one command and maps to AWS later (ECS/Fargate).
