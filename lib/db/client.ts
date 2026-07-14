import { sql } from "drizzle-orm";
import { drizzle as drizzlePglite, type PgliteDatabase } from "drizzle-orm/pglite";
import * as schema from "./schema";

/**
 * DB client with a driver split:
 *   - dev   → embedded Postgres (PGlite), zero setup, persists to ./.pglite
 *   - prod  → Neon serverless, when DATABASE_URL is set
 *
 * Both speak Postgres, so schema.ts and every query are identical across them.
 * The instance is memoized on globalThis so Next.js HMR doesn't spin up a
 * second PGlite against the same data dir.
 */

export type DrizzleDB = PgliteDatabase<typeof schema>;

const SEED_TICKERS = ["AAPL", "NVDA", "MSFT", "TSLA"] as const;

const globalForDb = globalThis as unknown as { __bhsDb?: Promise<DrizzleDB> };

async function ensureSchema(db: DrizzleDB) {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS watchlist_items (
      ticker text PRIMARY KEY,
      name text NOT NULL,
      exchange text NOT NULL,
      notes text,
      cadence_hours integer NOT NULL DEFAULT 24,
      sensitivity integer NOT NULL DEFAULT 3,
      added_at timestamptz NOT NULL DEFAULT now()
    );
  `);
}

async function seedIfEmpty(db: DrizzleDB) {
  const { UNIVERSE_BY_TICKER } = await import("../market/universe");
  const existing = await db.select({ t: schema.watchlistItems.ticker }).from(schema.watchlistItems).limit(1);
  if (existing.length > 0) return;
  const rows = SEED_TICKERS.map((ticker) => {
    const s = UNIVERSE_BY_TICKER[ticker];
    return { ticker: s.ticker, name: s.name, exchange: s.exchange };
  });
  await db.insert(schema.watchlistItems).values(rows).onConflictDoNothing();
}

async function create(): Promise<DrizzleDB> {
  const url = process.env.DATABASE_URL;

  let db: DrizzleDB;
  if (url) {
    // Prod: Neon serverless. Imported lazily so the dev path never loads it.
    const { drizzle: drizzleNeon } = await import("drizzle-orm/neon-serverless");
    const { Pool } = await import("@neondatabase/serverless");
    const pool = new Pool({ connectionString: url });
    db = drizzleNeon(pool, { schema }) as unknown as DrizzleDB;
  } else {
    const { PGlite } = await import("@electric-sql/pglite");
    const client = new PGlite("./.pglite");
    db = drizzlePglite(client, { schema });
  }

  await ensureSchema(db);
  await seedIfEmpty(db);
  return db;
}

export function getDb(): Promise<DrizzleDB> {
  if (!globalForDb.__bhsDb) {
    globalForDb.__bhsDb = create();
  }
  return globalForDb.__bhsDb;
}
