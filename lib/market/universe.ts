import type { SecurityType } from "./types";

/**
 * Seed universe for the Phase 1 mock provider. Enough real, recognizable names
 * to make the dashboard feel alive. All *numbers* (quotes, series, volume) are
 * generated deterministically from the ticker in mock.ts — these are just the
 * static, human-authored facts.
 */
export interface SeedSecurity {
  ticker: string;
  name: string;
  exchange: string;
  type: SecurityType;
  sector: string;
  industry: string;
  /** Anchor price the mock quote/series are generated around. */
  basePrice: number;
  /** Anchor market cap (USD). */
  marketCap: number;
  dividendYield: number | null;
  beta: number;
  ceo: string;
  employees: number;
  founded: string;
  headquarters: string;
  website: string;
  description: string;
}

export const UNIVERSE: SeedSecurity[] = [
  {
    ticker: "AAPL", name: "Apple Inc.", exchange: "NASDAQ", type: "stock",
    sector: "Technology", industry: "Consumer Electronics",
    basePrice: 228.5, marketCap: 3_460_000_000_000, dividendYield: 0.43, beta: 1.24,
    ceo: "Tim Cook", employees: 164000, founded: "1976", headquarters: "Cupertino, CA",
    website: "apple.com",
    description:
      "Apple designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide, and sells a range of related services including the App Store, iCloud, Apple Music, and Apple Pay.",
  },
  {
    ticker: "MSFT", name: "Microsoft Corporation", exchange: "NASDAQ", type: "stock",
    sector: "Technology", industry: "Software — Infrastructure",
    basePrice: 442.1, marketCap: 3_290_000_000_000, dividendYield: 0.72, beta: 0.91,
    ceo: "Satya Nadella", employees: 228000, founded: "1975", headquarters: "Redmond, WA",
    website: "microsoft.com",
    description:
      "Microsoft develops and licenses software, services, devices, and solutions worldwide, spanning the Azure cloud platform, Microsoft 365 productivity suite, Windows, gaming, and LinkedIn.",
  },
  {
    ticker: "NVDA", name: "NVIDIA Corporation", exchange: "NASDAQ", type: "stock",
    sector: "Technology", industry: "Semiconductors",
    basePrice: 132.8, marketCap: 3_250_000_000_000, dividendYield: 0.03, beta: 1.68,
    ceo: "Jensen Huang", employees: 29600, founded: "1993", headquarters: "Santa Clara, CA",
    website: "nvidia.com",
    description:
      "NVIDIA is the leading designer of graphics processing units and accelerated-computing platforms for gaming, data centers, professional visualization, and AI, and provides the CUDA software ecosystem.",
  },
  {
    ticker: "GOOGL", name: "Alphabet Inc.", exchange: "NASDAQ", type: "stock",
    sector: "Communication Services", industry: "Internet Content & Information",
    basePrice: 178.3, marketCap: 2_180_000_000_000, dividendYield: 0.45, beta: 1.03,
    ceo: "Sundar Pichai", employees: 182000, founded: "1998", headquarters: "Mountain View, CA",
    website: "abc.xyz",
    description:
      "Alphabet is the holding company for Google, spanning Search, YouTube, Android, Chrome, the Google Cloud platform, and the Other Bets portfolio including Waymo.",
  },
  {
    ticker: "AMZN", name: "Amazon.com, Inc.", exchange: "NASDAQ", type: "stock",
    sector: "Consumer Cyclical", industry: "Internet Retail",
    basePrice: 186.4, marketCap: 1_950_000_000_000, dividendYield: null, beta: 1.15,
    ceo: "Andy Jassy", employees: 1_525_000, founded: "1994", headquarters: "Seattle, WA",
    website: "amazon.com",
    description:
      "Amazon is a global e-commerce and cloud-computing company operating online and physical stores, the AWS cloud platform, advertising, and subscription services including Prime.",
  },
  {
    ticker: "META", name: "Meta Platforms, Inc.", exchange: "NASDAQ", type: "stock",
    sector: "Communication Services", industry: "Internet Content & Information",
    basePrice: 563.2, marketCap: 1_430_000_000_000, dividendYield: 0.35, beta: 1.21,
    ceo: "Mark Zuckerberg", employees: 72000, founded: "2004", headquarters: "Menlo Park, CA",
    website: "meta.com",
    description:
      "Meta builds technologies that help people connect through Facebook, Instagram, Messenger, WhatsApp, and Threads, and invests in the metaverse and AI through its Reality Labs segment.",
  },
  {
    ticker: "TSLA", name: "Tesla, Inc.", exchange: "NASDAQ", type: "stock",
    sector: "Consumer Cyclical", industry: "Auto Manufacturers",
    basePrice: 248.9, marketCap: 795_000_000_000, dividendYield: null, beta: 2.31,
    ceo: "Elon Musk", employees: 140000, founded: "2003", headquarters: "Austin, TX",
    website: "tesla.com",
    description:
      "Tesla designs, manufactures, and sells electric vehicles, energy generation and storage systems, and develops autonomous-driving and AI technology.",
  },
  {
    ticker: "AMD", name: "Advanced Micro Devices, Inc.", exchange: "NASDAQ", type: "stock",
    sector: "Technology", industry: "Semiconductors",
    basePrice: 154.7, marketCap: 250_000_000_000, dividendYield: null, beta: 1.72,
    ceo: "Lisa Su", employees: 26000, founded: "1969", headquarters: "Santa Clara, CA",
    website: "amd.com",
    description:
      "AMD designs high-performance CPUs, GPUs, and adaptive SoCs for data centers, PCs, gaming, and embedded markets, competing with Intel and NVIDIA.",
  },
  {
    ticker: "NFLX", name: "Netflix, Inc.", exchange: "NASDAQ", type: "stock",
    sector: "Communication Services", industry: "Entertainment",
    basePrice: 702.3, marketCap: 300_000_000_000, dividendYield: null, beta: 1.28,
    ceo: "Ted Sarandos & Greg Peters", employees: 14000, founded: "1997", headquarters: "Los Gatos, CA",
    website: "netflix.com",
    description:
      "Netflix is a subscription streaming service offering films, series, and games across a range of genres and languages, and produces original content worldwide.",
  },
  {
    ticker: "AVGO", name: "Broadcom Inc.", exchange: "NASDAQ", type: "stock",
    sector: "Technology", industry: "Semiconductors",
    basePrice: 168.5, marketCap: 785_000_000_000, dividendYield: 1.22, beta: 1.19,
    ceo: "Hock Tan", employees: 37000, founded: "1991", headquarters: "Palo Alto, CA",
    website: "broadcom.com",
    description:
      "Broadcom designs and supplies semiconductor and infrastructure software solutions, spanning networking, broadband, wireless, storage, and enterprise software following its VMware acquisition.",
  },
  {
    ticker: "JPM", name: "JPMorgan Chase & Co.", exchange: "NYSE", type: "stock",
    sector: "Financial Services", industry: "Banks — Diversified",
    basePrice: 224.1, marketCap: 630_000_000_000, dividendYield: 2.05, beta: 1.09,
    ceo: "Jamie Dimon", employees: 316000, founded: "1799", headquarters: "New York, NY",
    website: "jpmorganchase.com",
    description:
      "JPMorgan Chase is a global financial-services firm providing consumer and community banking, corporate and investment banking, commercial banking, and asset & wealth management.",
  },
  {
    ticker: "V", name: "Visa Inc.", exchange: "NYSE", type: "stock",
    sector: "Financial Services", industry: "Credit Services",
    basePrice: 291.6, marketCap: 570_000_000_000, dividendYield: 0.74, beta: 0.96,
    ceo: "Ryan McInerney", employees: 31600, founded: "1958", headquarters: "San Francisco, CA",
    website: "visa.com",
    description:
      "Visa operates a global payments technology network that facilitates digital payments among consumers, merchants, financial institutions, and governments across more than 200 countries.",
  },
  {
    ticker: "DIS", name: "The Walt Disney Company", exchange: "NYSE", type: "stock",
    sector: "Communication Services", industry: "Entertainment",
    basePrice: 96.4, marketCap: 175_000_000_000, dividendYield: 0.93, beta: 1.36,
    ceo: "Bob Iger", employees: 223000, founded: "1923", headquarters: "Burbank, CA",
    website: "thewaltdisneycompany.com",
    description:
      "Disney is a diversified media and entertainment company spanning studios, streaming (Disney+, Hulu, ESPN+), linear networks, and theme parks, experiences, and consumer products.",
  },
  {
    ticker: "KO", name: "The Coca-Cola Company", exchange: "NYSE", type: "stock",
    sector: "Consumer Defensive", industry: "Beverages — Non-Alcoholic",
    basePrice: 62.8, marketCap: 270_000_000_000, dividendYield: 3.08, beta: 0.58,
    ceo: "James Quincey", employees: 79100, founded: "1886", headquarters: "Atlanta, GA",
    website: "coca-colacompany.com",
    description:
      "Coca-Cola is a beverage company that manufactures, markets, and sells nonalcoholic drinks worldwide, including sparkling soft drinks, water, sports drinks, juice, coffee, and tea.",
  },
  {
    ticker: "COST", name: "Costco Wholesale Corporation", exchange: "NASDAQ", type: "stock",
    sector: "Consumer Defensive", industry: "Discount Stores",
    basePrice: 902.5, marketCap: 400_000_000_000, dividendYield: 0.51, beta: 0.79,
    ceo: "Ron Vachris", employees: 333000, founded: "1983", headquarters: "Issaquah, WA",
    website: "costco.com",
    description:
      "Costco operates a global chain of membership warehouses offering branded and private-label merchandise at low prices, along with gasoline, pharmacy, and e-commerce services.",
  },
  {
    ticker: "WMT", name: "Walmart Inc.", exchange: "NYSE", type: "stock",
    sector: "Consumer Defensive", industry: "Discount Stores",
    basePrice: 80.6, marketCap: 650_000_000_000, dividendYield: 1.03, beta: 0.52,
    ceo: "Doug McMillon", employees: 2_100_000, founded: "1962", headquarters: "Bentonville, AR",
    website: "walmart.com",
    description:
      "Walmart operates retail and wholesale stores and e-commerce worldwide under the Walmart and Sam's Club banners, and is expanding its advertising and marketplace businesses.",
  },
  {
    ticker: "XOM", name: "Exxon Mobil Corporation", exchange: "NYSE", type: "stock",
    sector: "Energy", industry: "Oil & Gas Integrated",
    basePrice: 118.2, marketCap: 520_000_000_000, dividendYield: 3.31, beta: 0.88,
    ceo: "Darren Woods", employees: 61500, founded: "1870", headquarters: "Spring, TX",
    website: "exxonmobil.com",
    description:
      "ExxonMobil explores for and produces crude oil and natural gas, and manufactures petroleum products, chemicals, and lower-emission technologies across an integrated global footprint.",
  },
  {
    ticker: "BA", name: "The Boeing Company", exchange: "NYSE", type: "stock",
    sector: "Industrials", industry: "Aerospace & Defense",
    basePrice: 172.9, marketCap: 106_000_000_000, dividendYield: null, beta: 1.54,
    ceo: "Kelly Ortberg", employees: 171000, founded: "1916", headquarters: "Arlington, VA",
    website: "boeing.com",
    description:
      "Boeing designs, manufactures, and services commercial jetliners, defense products, and space systems, and provides related support and aftermarket services worldwide.",
  },
  {
    ticker: "UBER", name: "Uber Technologies, Inc.", exchange: "NYSE", type: "stock",
    sector: "Technology", industry: "Software — Application",
    basePrice: 71.4, marketCap: 150_000_000_000, dividendYield: null, beta: 1.33,
    ceo: "Dara Khosrowshahi", employees: 31100, founded: "2009", headquarters: "San Francisco, CA",
    website: "uber.com",
    description:
      "Uber operates a global platform connecting riders with drivers (Mobility), consumers with merchants (Delivery), and shippers with carriers (Freight).",
  },
  {
    ticker: "PLTR", name: "Palantir Technologies Inc.", exchange: "NYSE", type: "stock",
    sector: "Technology", industry: "Software — Infrastructure",
    basePrice: 41.8, marketCap: 95_000_000_000, dividendYield: null, beta: 2.62,
    ceo: "Alex Karp", employees: 3900, founded: "2003", headquarters: "Denver, CO",
    website: "palantir.com",
    description:
      "Palantir builds software platforms — Gotham, Foundry, Apollo, and AIP — that help government and commercial organizations integrate, analyze, and act on large-scale data.",
  },
  {
    ticker: "SHOP", name: "Shopify Inc.", exchange: "NYSE", type: "stock",
    sector: "Technology", industry: "Software — Application",
    basePrice: 78.9, marketCap: 100_000_000_000, dividendYield: null, beta: 2.04,
    ceo: "Tobi Lütke", employees: 8300, founded: "2006", headquarters: "Ottawa, Canada",
    website: "shopify.com",
    description:
      "Shopify provides a commerce platform and services that enable merchants of all sizes to build, run, and scale online and in-person retail businesses.",
  },
  {
    ticker: "CRM", name: "Salesforce, Inc.", exchange: "NYSE", type: "stock",
    sector: "Technology", industry: "Software — Application",
    basePrice: 328.4, marketCap: 315_000_000_000, dividendYield: 0.49, beta: 1.29,
    ceo: "Marc Benioff", employees: 72000, founded: "1999", headquarters: "San Francisco, CA",
    website: "salesforce.com",
    description:
      "Salesforce provides cloud-based customer-relationship-management software and a portfolio of enterprise applications spanning sales, service, marketing, commerce, analytics, and its Agentforce AI platform.",
  },
  {
    ticker: "ORCL", name: "Oracle Corporation", exchange: "NYSE", type: "stock",
    sector: "Technology", industry: "Software — Infrastructure",
    basePrice: 171.2, marketCap: 475_000_000_000, dividendYield: 0.93, beta: 1.02,
    ceo: "Safra Catz", employees: 159000, founded: "1977", headquarters: "Austin, TX",
    website: "oracle.com",
    description:
      "Oracle provides database software, cloud infrastructure (OCI), and enterprise applications, and is a major provider of AI-oriented cloud capacity to large customers.",
  },
];

export const UNIVERSE_BY_TICKER: Record<string, SeedSecurity> = Object.fromEntries(
  UNIVERSE.map((s) => [s.ticker, s]),
);
