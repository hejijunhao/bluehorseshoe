import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

/**
 * Phase 1 schema — just the watchlist. Ticker is the natural primary key
 * (single user, one row per security). `cadenceHours` and `sensitivity` are
 * carried now so the Phase 2 monitor has somewhere to read them from; the UI
 * for them is Phase 2.
 *
 * Phase 2 adds `stock_updates` and `alerts` tables (see docs/blueprint.md §9).
 */
export const watchlistItems = pgTable("watchlist_items", {
  ticker: text("ticker").primaryKey(),
  name: text("name").notNull(),
  exchange: text("exchange").notNull(),
  notes: text("notes"),
  cadenceHours: integer("cadence_hours").notNull().default(24),
  sensitivity: integer("sensitivity").notNull().default(3),
  addedAt: timestamp("added_at", { withTimezone: true }).notNull().defaultNow(),
});

export type WatchlistItem = typeof watchlistItems.$inferSelect;
export type NewWatchlistItem = typeof watchlistItems.$inferInsert;
