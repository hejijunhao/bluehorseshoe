import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Change } from "@/components/change";
import { MonitoringPanel } from "@/components/monitoring-panel";
import { PriceChart } from "@/components/price-chart";
import { WatchlistToggle } from "@/components/watchlist-toggle";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { isInWatchlist } from "@/lib/db/watchlist";
import { getMarketData } from "@/lib/market";
import { CHART_RANGES, type ChartRange } from "@/lib/market/types";
import { formatCompact, formatCompactUsd, formatInt, formatPct, formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ ticker: string }> }) {
  const { ticker } = await params;
  const sec = await getMarketData().getSecurity(ticker.toUpperCase());
  return {
    title: sec ? `${sec.ticker} · ${sec.name} — Blue Horseshoe` : "Blue Horseshoe",
  };
}

export default async function StockPage({ params }: { params: Promise<{ ticker: string }> }) {
  const { ticker: raw } = await params;
  const ticker = raw.toUpperCase();
  const md = getMarketData();

  const [security, quote, stats, profile, news, inWatchlist] = await Promise.all([
    md.getSecurity(ticker),
    md.getQuote(ticker),
    md.getStats(ticker),
    md.getProfile(ticker),
    md.getNews(ticker),
    isInWatchlist(ticker),
  ]);

  if (!security || !quote || !stats || !profile) notFound();

  const seriesEntries = await Promise.all(
    CHART_RANGES.map(async (r) => [r, (await md.getSeries(ticker, r)).map((p) => p.c)] as const),
  );
  const seriesByRange: Record<string, number[]> = Object.fromEntries(seriesEntries);

  const positive = quote.changePct >= 0;

  const statCells: { label: string; value: string }[] = [
    { label: "Open", value: formatPrice(stats.open) },
    { label: "Previous close", value: formatPrice(stats.previousClose) },
    { label: "Day range", value: `${formatPrice(stats.dayLow)} – ${formatPrice(stats.dayHigh)}` },
    { label: "52-week range", value: `${formatPrice(stats.week52Low)} – ${formatPrice(stats.week52High)}` },
    { label: "Market cap", value: formatCompactUsd(stats.marketCap) },
    { label: "P/E ratio", value: stats.peRatio != null ? stats.peRatio.toFixed(1) : "—" },
    { label: "EPS", value: stats.eps != null ? formatPrice(stats.eps) : "—" },
    { label: "Dividend yield", value: stats.dividendYield != null ? `${stats.dividendYield.toFixed(2)}%` : "—" },
    { label: "Beta", value: stats.beta != null ? stats.beta.toFixed(2) : "—" },
    { label: "Volume", value: formatInt(stats.volume) },
    { label: "Avg volume", value: formatCompact(stats.avgVolume) },
    { label: "Exchange", value: security.exchange },
  ];

  const facts: { label: string; value: ReactNode }[] = [
    { label: "Sector", value: profile.sector },
    { label: "Industry", value: profile.industry },
    { label: "CEO", value: profile.ceo },
    { label: "Employees", value: formatInt(profile.employees) },
    { label: "Headquarters", value: profile.headquarters },
    { label: "Founded", value: profile.founded },
    {
      label: "Website",
      value: (
        <a
          href={`https://${profile.website}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-primary hover:underline"
        >
          {profile.website}
          <ExternalLink className="h-3 w-3" />
        </a>
      ),
    },
  ];

  return (
    <div>
      <Link
        href="/"
        className="mb-5 inline-flex items-center gap-1.5 text-sm text-subtle transition-colors hover:text-fg"
      >
        <ArrowLeft className="h-4 w-4" />
        Watchlist
      </Link>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-semibold tracking-tight">{security.ticker}</h1>
            <Badge>{security.exchange}</Badge>
            <Badge>{profile.sector}</Badge>
          </div>
          <p className="mt-1 text-sm text-muted">{security.name}</p>
          <div className="mt-4 flex items-end gap-3">
            <span className="nums text-3xl font-semibold leading-none">{formatPrice(quote.price)}</span>
            <Change change={quote.change} changePct={quote.changePct} className="pb-0.5" />
          </div>
          <p className="mt-1.5 text-xs text-subtle">{quote.asOf} · {quote.currency}</p>
        </div>
        <WatchlistToggle inWatchlist={inWatchlist} security={security} />
      </div>

      {/* Body */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Card>
            <CardContent className="pt-5">
              <PriceChart seriesByRange={seriesByRange} ranges={CHART_RANGES as ChartRange[]} positive={positive} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
                {statCells.map((s) => (
                  <div key={s.label}>
                    <dt className="text-xs text-subtle">{s.label}</dt>
                    <dd className="nums mt-0.5 text-sm font-medium text-fg">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted">{profile.description}</p>
              <dl className="mt-5 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                {facts.map((f) => (
                  <div key={f.label} className="flex justify-between gap-4 border-b border-border/60 pb-2">
                    <dt className="text-sm text-subtle">{f.label}</dt>
                    <dd className="text-right text-sm text-fg">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent news</CardTitle>
              <Badge>mock</Badge>
            </CardHeader>
            <CardContent className="space-y-1">
              {news.map((n) => (
                <a
                  key={n.id}
                  href={n.url}
                  className="-mx-2 block rounded-lg px-2 py-2.5 transition-colors hover:bg-surface-2"
                >
                  <div className="text-sm font-medium leading-snug text-fg">{n.title}</div>
                  <div className="mt-1 text-xs text-subtle">
                    {n.source} · {n.publishedAt}
                  </div>
                </a>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <MonitoringPanel ticker={security.ticker} />
        </div>
      </div>
    </div>
  );
}
