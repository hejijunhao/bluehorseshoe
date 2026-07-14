# Changelog

> Release history for Blue Horseshoe — newest version first.

## [0.1.0] — 2026-07-14 · Phase 1: the dashboard

First working slice: a mock-data-driven watchlist dashboard and Perplexity-Finance-style stock profile pages. Runs with **no API keys**. Monitoring is placeholder UI (the engine lands in Phase 2).

### Added

**App & tooling**
- Scaffolded Next.js 16 (App Router, TypeScript, Turbopack) with Tailwind CSS 4 and ESLint.
- Dark, finance-grade design system — color tokens, tabular numerals, custom scrollbars (`app/globals.css`).
- Root layout with a sticky site header and app metadata (`app/layout.tsx`, `components/site-header.tsx`).
- UI primitives: Button, Card, Badge, Input (`components/ui/*`).

**Watchlist dashboard**
- Home page: watchlist as a grid of stock cards (price, colored change, sparkline) with an empty state (`app/page.tsx`, `components/stock-card.tsx`).
- Add equities via a search dialog over the seed universe; remove per card; add/remove toggle on the stock page (`components/add-equity.tsx`, `components/remove-button.tsx`, `components/watchlist-toggle.tsx`).
- Server actions for add/remove with path revalidation (`app/actions.ts`).
- Symbol/company search API (`app/api/search/route.ts`).

**Stock profile page** (`app/stock/[ticker]/page.tsx`)
- Perplexity-Finance-style layout: quote header, interactive multi-range price chart (1D→1Y), key-statistics grid, About + company facts, recent news.
- Placeholder Monitoring panel stubbing the Phase 2 agent seam (`components/monitoring-panel.tsx`).
- Inline-SVG price chart + sparkline and a colored change indicator (`components/price-chart.tsx`, `components/sparkline.tsx`, `components/change.tsx`).
- Case-insensitive ticker routing; unknown tickers return 404.

**Market data**
- `MarketDataProvider` abstraction with domain types (`lib/market/types.ts`).
- Deterministic mock adapter producing stable quotes, stats, price series, and news (`lib/market/mock.ts`).
- Seed universe of 24 well-known equities (`lib/market/universe.ts`).
- Provider selector for swapping in a real provider later (`lib/market/index.ts`).

**Persistence**
- Drizzle ORM schema for the watchlist (`lib/db/schema.ts`).
- Driver split — embedded PGlite for local dev, Neon serverless for prod, selected by `DATABASE_URL`; runtime schema init + starter seed (`lib/db/client.ts`).
- Watchlist repository: list / add / remove / membership (`lib/db/watchlist.ts`).

**Utilities**
- `cn()` class combiner and number/price/percent formatters (`lib/utils.ts`).

**Docs**
- `docs/blueprint.md` — full technical vision: two-mode model (pull dashboard / push agent), monitoring loop, triage/materiality model, pluggable-worker + inverted MCP agent seam, data layer (Sonar + market data), data model, and phased roadmap.
- Rewrote `README.md` for the project.

### Changed
- `next.config.ts` — marked `@electric-sql/pglite` and `@neondatabase/serverless` as server-external packages (kept out of the bundler).
- `.gitignore` — ignore the local `/.pglite` dev database directory.

### Dependencies
- Added: `drizzle-orm`, `@electric-sql/pglite`, `@neondatabase/serverless`, `clsx`, `tailwind-merge`, `lucide-react`.
- Added (dev): `drizzle-kit`.

### Verified
- Clean `tsc --noEmit` and `next build` (all routes compile; Vercel-deploy-ready).
- Runtime smoke test: dashboard `200`, stock page renders, search API works, unknown ticker `404`, add/remove round-trips and persists.

### Deferred to Phase 2
- Jobs layer (Inngest / Vercel Workflows / QStash), market-data provider choice, Perplexity Sonar integration, triage/materiality engine, and the Hermes/MCP agent seam.
