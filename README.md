# Ledger — Expense & Lending Manager

A full-stack learning project: React (frontend) + Express (API) + SQLite (database).

## How the pieces fit together

```
Browser (React app, localhost:5173)
   │  fetch() calls in src/services/api.js
   ▼
Express server (localhost:5000)
   │  routes/*.js  →  controllers/*.js
   ▼
SQLite database file (backend/data.db)
```

- **`frontend/src/pages/`** — one file per screen (Dashboard, Expenses, Lending). Each page fetches its own data and holds its own state.
- **`frontend/src/components/`** — small reusable pieces (forms, tables, nav) that receive data via props and never call the API directly.
- **`frontend/src/services/api.js`** — the ONLY file that knows the backend's URL. Every page imports from here.
- **`backend/routes/`** — maps a URL + HTTP method to a controller function. No logic lives here.
- **`backend/controllers/`** — the actual logic: validate input, read/write the database, send a response.
- **`backend/db.js`** — the only file that touches the database directly. Creates tables on startup.

## Setup

### 1. Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```
Runs on http://localhost:5000. A `data.db` SQLite file is created automatically on first run.

**Database note:** this uses Node's built-in `node:sqlite` module (no separate SQLite package to install/compile) — you need **Node 22.5 or newer**. If you're on Node 22.5–23.x and see an error about `node:sqlite`, run with the flag instead: `node --experimental-sqlite --watch server.js`. Node 24+ doesn't need the flag.

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs on http://localhost:5173.

Open that URL — the app talks to the backend automatically.

## What to try next (in order)

1. **Read the code top to bottom**: `server.js` → a route file → its controller → `db.js`. Follow one request end to end.
2. **Add a feature**: an "edit" button for lending records, or a monthly filter on expenses.
3. **Add authentication**: right now this is single-user. Add a `users` table, hash passwords with `bcrypt`, and issue a JWT on login — then require that JWT on every route via middleware.
4. **Swap the database**: move from SQLite to PostgreSQL (via `pg` or Prisma) without touching any React code — proof that separating layers works.
5. **Deploy it**: frontend to Vercel/Netlify, backend to Render/Railway, and point `BASE_URL` in `api.js` at the deployed backend URL.

## Security notes already baked in (and what's still missing)

Already here:
- Input validation in every controller (never trusts `req.body` blindly)
- Parameterized SQL queries (`?` placeholders) — prevents SQL injection
- CORS locked to one origin instead of `*`
- Request body size limit + basic rate limiting
- Centralized error handler so raw errors never leak to the client

Still missing (intentionally, as your next learning steps):
- No authentication — anyone who can reach the API can read/write everything
- No HTTPS (add this at the hosting/proxy layer when you deploy)
- No per-user data isolation (add a `user_id` column once you add auth)
