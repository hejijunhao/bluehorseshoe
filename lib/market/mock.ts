import type {
  ChartRange,
  CompanyProfile,
  KeyStats,
  MarketDataProvider,
  NewsItem,
  PricePoint,
  Quote,
  SecurityRef,
} from "./types";
import { UNIVERSE, UNIVERSE_BY_TICKER, type SeedSecurity } from "./universe";

/* ------------------------------------------------------------------ *
 * Deterministic pseudo-randomness.
 *
 * All mock numbers are derived from the ticker so a given stock always
 * renders the same figures. This keeps server renders stable (no hydration
 * mismatches) and makes the demo feel like real, consistent data.
 * ------------------------------------------------------------------ */

function hashStr(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function rngFor(...parts: string[]): () => number {
  return mulberry32(hashStr(parts.join("|")));
}

function round(n: number, dp = 2): number {
  const f = 10 ** dp;
  return Math.round(n * f) / f;
}

/* ------------------------------------------------------------------ *
 * Generators
 * ------------------------------------------------------------------ */

function quoteFor(seed: SeedSecurity): Quote {
  const rnd = rngFor(seed.ticker, "quote");
  const previousClose = seed.basePrice;
  // Deterministic day move in roughly [-3.2%, +3.4%].
  const changePct = round((rnd() - 0.48) * 6.6, 2);
  const price = round(previousClose * (1 + changePct / 100), 2);
  const change = round(price - previousClose, 2);
  return {
    ticker: seed.ticker,
    price,
    change,
    changePct,
    currency: "USD",
    marketState: "closed",
    asOf: "At close",
  };
}

function statsFor(seed: SeedSecurity): KeyStats {
  const q = quoteFor(seed);
  const previousClose = seed.basePrice; // by construction in quoteFor()
  const rnd = rngFor(seed.ticker, "stats");
  const dayRange = q.price * (0.008 + rnd() * 0.02);
  const dayHigh = round(Math.max(q.price, previousClose) + dayRange * rnd());
  const dayLow = round(Math.min(q.price, previousClose) - dayRange * rnd());
  const week52High = round(q.price * (1.06 + rnd() * 0.4));
  const week52Low = round(q.price * (0.55 + rnd() * 0.3));
  const eps = seed.marketCap > 0 ? round(q.price / (12 + rnd() * 35), 2) : null;
  const peRatio = eps && eps > 0 ? round(q.price / eps, 1) : null;
  const avgVolume = Math.round((seed.marketCap / q.price) * (0.002 + rnd() * 0.01));
  const volume = Math.round(avgVolume * (0.6 + rnd() * 0.9));
  return {
    marketCap: seed.marketCap,
    peRatio,
    eps,
    dividendYield: seed.dividendYield,
    beta: seed.beta,
    week52High,
    week52Low,
    dayHigh,
    dayLow,
    open: round(previousClose * (1 + (rnd() - 0.5) * 0.01)),
    previousClose,
    volume,
    avgVolume,
  };
}

const RANGE_POINTS: Record<ChartRange, number> = {
  "1D": 78,
  "1W": 35,
  "1M": 22,
  "3M": 66,
  "1Y": 252,
};

function seriesFor(seed: SeedSecurity, range: ChartRange): PricePoint[] {
  const n = RANGE_POINTS[range];
  const rnd = rngFor(seed.ticker, "series", range);
  const q = quoteFor(seed);
  // Volatility scales with the range so longer views show bigger swings.
  const vol =
    (range === "1D" ? 0.004 : range === "1W" ? 0.009 : range === "1M" ? 0.014 : range === "3M" ? 0.02 : 0.03) *
    seed.basePrice;
  const raw: number[] = [];
  let v = seed.basePrice * (0.94 + rnd() * 0.12);
  for (let i = 0; i < n; i++) {
    v += (rnd() - 0.5) * 2 * vol;
    v = Math.max(v, seed.basePrice * 0.4);
    raw.push(v);
  }
  // Shift the whole walk so the final point lands exactly on the live price.
  const shift = q.price - raw[raw.length - 1];
  return raw.map((c, t) => ({ t, c: round(c + shift, 2) }));
}

const NEWS_TEMPLATES: { title: (s: SeedSecurity) => string; source: string; when: string }[] = [
  { title: (s) => `${s.name} tops quarterly estimates as ${s.sector.toLowerCase()} demand holds`, source: "Reuters", when: "2h ago" },
  { title: (s) => `Analysts lift ${s.ticker} price target after upbeat guidance`, source: "Bloomberg", when: "5h ago" },
  { title: (s) => `What ${s.name}'s latest move means for investors`, source: "The Wall Street Journal", when: "9h ago" },
  { title: (s) => `${s.ticker} shares in focus ahead of next earnings report`, source: "CNBC", when: "14h ago" },
  { title: (s) => `${s.name} expands ${s.industry.split("—")[0].trim().toLowerCase()} footprint in new deal`, source: "Financial Times", when: "1d ago" },
  { title: (s) => `Is ${s.ticker} still a buy? Wall Street weighs in`, source: "Barron's", when: "1d ago" },
  { title: (s) => `${s.name} CEO ${s.ceo.split("&")[0].trim()} outlines strategy for the year ahead`, source: "Yahoo Finance", when: "2d ago" },
];

function newsFor(seed: SeedSecurity): NewsItem[] {
  const rnd = rngFor(seed.ticker, "news");
  const pool = [...NEWS_TEMPLATES];
  // Deterministic shuffle, then take 5.
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, 5).map((t, i) => ({
    id: `${seed.ticker}-news-${i}`,
    title: t.title(seed),
    source: t.source,
    url: "#",
    publishedAt: t.when,
    summary:
      "Mock headline — the Phase 2 monitor will replace this feed with cited, real-time developments from Perplexity Sonar.",
  }));
}

/* ------------------------------------------------------------------ *
 * Provider
 * ------------------------------------------------------------------ */

export class MockMarketDataProvider implements MarketDataProvider {
  async search(query: string): Promise<SecurityRef[]> {
    const q = query.trim().toUpperCase();
    if (!q) return [];
    const scored = UNIVERSE.map((s) => {
      const ticker = s.ticker.toUpperCase();
      const name = s.name.toUpperCase();
      let score = -1;
      if (ticker === q) score = 100;
      else if (ticker.startsWith(q)) score = 80;
      else if (name.startsWith(q)) score = 60;
      else if (ticker.includes(q)) score = 40;
      else if (name.includes(q)) score = 20;
      return { s, score };
    })
      .filter((x) => x.score >= 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
    return scored.map(({ s }) => ({
      ticker: s.ticker,
      name: s.name,
      exchange: s.exchange,
      type: s.type,
    }));
  }

  async getSecurity(ticker: string): Promise<SecurityRef | null> {
    const s = UNIVERSE_BY_TICKER[ticker.toUpperCase()];
    if (!s) return null;
    return { ticker: s.ticker, name: s.name, exchange: s.exchange, type: s.type };
  }

  async getQuote(ticker: string): Promise<Quote | null> {
    const s = UNIVERSE_BY_TICKER[ticker.toUpperCase()];
    return s ? quoteFor(s) : null;
  }

  async getStats(ticker: string): Promise<KeyStats | null> {
    const s = UNIVERSE_BY_TICKER[ticker.toUpperCase()];
    return s ? statsFor(s) : null;
  }

  async getProfile(ticker: string): Promise<CompanyProfile | null> {
    const s = UNIVERSE_BY_TICKER[ticker.toUpperCase()];
    if (!s) return null;
    return {
      ticker: s.ticker,
      name: s.name,
      exchange: s.exchange,
      sector: s.sector,
      industry: s.industry,
      description: s.description,
      website: s.website,
      headquarters: s.headquarters,
      employees: s.employees,
      ceo: s.ceo,
      founded: s.founded,
    };
  }

  async getSeries(ticker: string, range: ChartRange): Promise<PricePoint[]> {
    const s = UNIVERSE_BY_TICKER[ticker.toUpperCase()];
    return s ? seriesFor(s, range) : [];
  }

  async getNews(ticker: string): Promise<NewsItem[]> {
    const s = UNIVERSE_BY_TICKER[ticker.toUpperCase()];
    return s ? newsFor(s) : [];
  }
}
