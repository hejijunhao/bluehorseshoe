import { asc, eq } from "drizzle-orm";
import { getDb } from "./client";
import { watchlistItems, type WatchlistItem } from "./schema";

export async function listWatchlist(): Promise<WatchlistItem[]> {
  const db = await getDb();
  return db.select().from(watchlistItems).orderBy(asc(watchlistItems.addedAt));
}

export async function listWatchlistTickers(): Promise<string[]> {
  const items = await listWatchlist();
  return items.map((i) => i.ticker);
}

export async function isInWatchlist(ticker: string): Promise<boolean> {
  const db = await getDb();
  const rows = await db
    .select({ t: watchlistItems.ticker })
    .from(watchlistItems)
    .where(eq(watchlistItems.ticker, ticker.toUpperCase()))
    .limit(1);
  return rows.length > 0;
}

export async function addToWatchlist(item: {
  ticker: string;
  name: string;
  exchange: string;
}): Promise<void> {
  const db = await getDb();
  await db
    .insert(watchlistItems)
    .values({
      ticker: item.ticker.toUpperCase(),
      name: item.name,
      exchange: item.exchange,
    })
    .onConflictDoNothing();
}

export async function removeFromWatchlist(ticker: string): Promise<void> {
  const db = await getDb();
  await db.delete(watchlistItems).where(eq(watchlistItems.ticker, ticker.toUpperCase()));
}
