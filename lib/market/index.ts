import type { MarketDataProvider } from "./types";
import { MockMarketDataProvider } from "./mock";

let instance: MarketDataProvider | null = null;

/**
 * Returns the active market-data provider.
 *
 * Phase 1: always the mock adapter (no API key needed). Phase 2 switches here
 * on an env flag (e.g. MARKET_DATA_PROVIDER=finnhub) — callers never change.
 */
export function getMarketData(): MarketDataProvider {
  if (!instance) {
    instance = new MockMarketDataProvider();
  }
  return instance;
}

export * from "./types";
