import { Radar } from "lucide-react";
import { AddEquityButton } from "@/components/add-equity";
import { StockCard, type StockCardData } from "@/components/stock-card";
import { listWatchlist } from "@/lib/db/watchlist";
import { getMarketData } from "@/lib/market";

export const dynamic = "force-dynamic";

export default async function Home() {
  const items = await listWatchlist();
  const md = getMarketData();

  const cards: StockCardData[] = await Promise.all(
    items.map(async (it) => {
      const [quote, series] = await Promise.all([
        md.getQuote(it.ticker),
        md.getSeries(it.ticker, "1M"),
      ]);
      return {
        ticker: it.ticker,
        name: it.name,
        price: quote?.price ?? 0,
        change: quote?.change ?? 0,
        changePct: quote?.changePct ?? 0,
        spark: series.map((p) => p.c),
      };
    }),
  );

  return (
    <div>
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Watchlist</h1>
          <p className="mt-1 text-sm text-subtle">
            {items.length} {items.length === 1 ? "name" : "names"} · perpetual monitoring begins in Phase 2
          </p>
        </div>
        <div className="hidden sm:block">
          <AddEquityButton />
        </div>
      </div>

      {cards.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <StockCard key={c.ticker} {...c} />
          ))}
        </div>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface/50 px-6 py-16 text-center">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface-2 text-subtle">
        <Radar className="h-5 w-5" />
      </span>
      <h2 className="mt-4 text-base font-medium">Your watchlist is empty</h2>
      <p className="mt-1 max-w-sm text-sm text-subtle">
        Add the equities you hold or are eyeing. Each gets a profile page now, and 24/7 monitoring in Phase 2.
      </p>
      <div className="mt-5">
        <AddEquityButton />
      </div>
    </div>
  );
}
