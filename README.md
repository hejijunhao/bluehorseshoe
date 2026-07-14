# Blue Horseshoe

A personal, always-on stock watchlist that actually **watches** — a Perplexity-Finance-style profile for every equity you track, plus (Phase 2) a perpetual monitor that surfaces material developments and proactively alerts you when something could move a price.

📄 Full technical vision: [`docs/blueprint.md`](docs/blueprint.md) · original pitch: [`docs/vision.md`](docs/vision.md)

## Status

- **Phase 1 — the dashboard (✅ built).** Watchlist (search / add / remove), a Perplexity-Finance-style stock page (quote, chart, key stats, about, news), and a placeholder Monitoring panel. Runs on **mock market data** — no API keys needed.
- **Phase 2 — the monitor (next).** Vercel Cron → jobs layer → built-in worker → Perplexity Sonar → triage → alerts, then the Hermes/MCP agent seam. See the blueprint.

## Stack

TypeScript · **Next.js 16** (App Router) · **Tailwind 4** · **Drizzle ORM** · Postgres (**PGlite** embedded for local dev, **Neon** for prod) · deploy target **Vercel**.

## Run locally

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

No configuration required — local dev uses an embedded Postgres (PGlite) that persists to `./.pglite`, seeded with a starter watchlist. Delete `./.pglite` to reset.

## Production (Vercel)

Set `DATABASE_URL` to a Neon Postgres connection string; the same schema and queries run unchanged (the driver switches automatically). Phase 2 will add `SONAR_API_KEY`, a market-data provider key, and the jobs-layer config.

## Project layout

```
app/                 routes: / (dashboard), /stock/[ticker], /api/search
components/          UI primitives + chart/card/dialog components
lib/market/          market-data provider interface + mock adapter + seed universe
lib/db/              Drizzle schema, driver selection, watchlist repository
docs/                vision + blueprint
```
