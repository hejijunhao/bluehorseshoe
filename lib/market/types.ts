/**
 * Market-data domain types + the provider interface.
 *
 * Phase 1 ships a single implementation (the mock adapter). Swapping in a real
 * provider (Finnhub / FMP / Polygon / Alpha Vantage) later means implementing
 * this same interface — nothing above it changes.
 */

export type SecurityType = "stock" | "etf";

export interface SecurityRef {
  ticker: string;
  name: string;
  exchange: string;
  type: SecurityType;
}

export type MarketState = "open" | "closed" | "pre" | "post";

export interface Quote {
  ticker: string;
  price: number;
  /** Absolute change vs previous close. */
  change: number;
  /** Percent change vs previous close. */
  changePct: number;
  currency: string;
  marketState: MarketState;
  /** Human label for freshness, e.g. "Closed" / "As of 4:00 PM ET". */
  asOf: string;
}

export interface KeyStats {
  marketCap: number;
  peRatio: number | null;
  eps: number | null;
  /** Dividend yield as a percent, e.g. 0.52 = 0.52%. */
  dividendYield: number | null;
  beta: number | null;
  week52High: number;
  week52Low: number;
  dayHigh: number;
  dayLow: number;
  open: number;
  previousClose: number;
  volume: number;
  avgVolume: number;
}

export interface CompanyProfile {
  ticker: string;
  name: string;
  exchange: string;
  sector: string;
  industry: string;
  description: string;
  website: string;
  headquarters: string;
  employees: number;
  ceo: string;
  founded: string;
}

/** One point on a price series. `t` is a step index; `c` is the close. */
export interface PricePoint {
  t: number;
  c: number;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  url: string;
  /** Relative label for Phase 1, e.g. "3h ago". */
  publishedAt: string;
  summary: string;
}

export type ChartRange = "1D" | "1W" | "1M" | "3M" | "1Y";

export const CHART_RANGES: ChartRange[] = ["1D", "1W", "1M", "3M", "1Y"];

export interface MarketDataProvider {
  /** Free-text symbol/name search for the "add equity" flow. */
  search(query: string): Promise<SecurityRef[]>;
  getSecurity(ticker: string): Promise<SecurityRef | null>;
  getQuote(ticker: string): Promise<Quote | null>;
  getStats(ticker: string): Promise<KeyStats | null>;
  getProfile(ticker: string): Promise<CompanyProfile | null>;
  getSeries(ticker: string, range: ChartRange): Promise<PricePoint[]>;
  getNews(ticker: string): Promise<NewsItem[]>;
}
