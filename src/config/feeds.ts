import { Cadence, FeedId, FeedMeta } from '../types';

// ─────────────────────────────────────────────────────────────────────────────
// AggregatorV3Interface ABI (minimal — only what we need)
// Source: https://docs.chain.link/data-feeds/api-reference
// ─────────────────────────────────────────────────────────────────────────────
export const AGGREGATOR_V3_ABI = [
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'description',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'latestRoundData',
    outputs: [
      { internalType: 'uint80', name: 'roundId', type: 'uint80' },
      { internalType: 'int256', name: 'answer', type: 'int256' },
      { internalType: 'uint256', name: 'startedAt', type: 'uint256' },
      { internalType: 'uint256', name: 'updatedAt', type: 'uint256' },
      { internalType: 'uint80', name: 'answeredInRound', type: 'uint80' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint80', name: '_roundId', type: 'uint80' }],
    name: 'getRoundData',
    outputs: [
      { internalType: 'uint80', name: 'roundId', type: 'uint80' },
      { internalType: 'int256', name: 'answer', type: 'int256' },
      { internalType: 'uint256', name: 'startedAt', type: 'uint256' },
      { internalType: 'uint256', name: 'updatedAt', type: 'uint256' },
      { internalType: 'uint80', name: 'answeredInRound', type: 'uint80' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Feed Metadata & Contract Addresses — Base Mainnet
// Source: https://docs.chain.link/data-feeds/us-government-macroeconomic/addresses
// ─────────────────────────────────────────────────────────────────────────────

export const FEEDS: Record<FeedId, FeedMeta> = {
  // ── Real Gross Domestic Product ─────────────────────────────────────────
  GDP_LEVEL: {
    id: 'GDP_LEVEL',
    name: 'Real GDP / Level',
    description: 'Real Gross Domestic Product — absolute level (billions of chained 2017 USD)',
    cadence: 'quarterly' as Cadence,
    addresses: { BASE: '0x0df397aFE00085C138a99eFB39C498e08eB95aD1' },
  },

  GDP_PCT_CHANGE: {
    id: 'GDP_PCT_CHANGE',
    name: 'Real GDP / % Change',
    description: 'Real GDP — annualised quarter-over-quarter percentage change',
    cadence: 'quarterly' as Cadence,
    addresses: { BASE: '0xe0eda54fC1362C0d7d0ff855E4fCEA79916Fe094' },
  },

  // ── Personal Consumption Expenditures Price Index ────────────────────────
  PCE_LEVEL: {
    id: 'PCE_LEVEL',
    name: 'PCE Price Index / Level',
    description: 'Personal Consumption Expenditures Price Index — absolute level',
    cadence: 'monthly' as Cadence,
    addresses: { BASE: '0x18A3fcA54FaC5B05837205bA4b823fc56191F793' },
  },

  PCE_PCT_CHANGE: {
    id: 'PCE_PCT_CHANGE',
    name: 'PCE Price Index / % Change',
    description: 'PCE Price Index — annualised percentage change (inflation proxy)',
    cadence: 'monthly' as Cadence,
    addresses: { BASE: '0x2a18E2d46Cb067b69e0759dB39b16597fC42D962' },
  },

  // ── Real Final Sales to Private Domestic Purchasers ─────────────────────
  REAL_FINAL_SALES_LEVEL: {
    id: 'REAL_FINAL_SALES_LEVEL',
    name: 'Real Final Sales to Private Domestic / Level',
    description:
      'Real Final Sales to Private Domestic Purchasers — absolute level (demand excl. inventories)',
    cadence: 'quarterly' as Cadence,
    addresses: { BASE: '0x65623109aA4561AD3cfF503542083548CeD7e085' },
  },

  REAL_FINAL_SALES_PCT_CHANGE: {
    id: 'REAL_FINAL_SALES_PCT_CHANGE',
    name: 'Real Final Sales to Private Domestic / % Change',
    description: 'Real Final Sales to Private Domestic Purchasers — annualised % change',
    cadence: 'quarterly' as Cadence,
    addresses: { BASE: '0xe2b3688371130f333443428Cf03f27Ce0378F9dC' },
  },
};

/**
 * Returns a flat list of (feed, network, address) tuples for every feed entry.
 */
export function getDeployedFeeds(): Array<{
  feed: FeedMeta;
  networkId: string;
  address: string;
}> {
  const result: Array<{ feed: FeedMeta; networkId: string; address: string }> = [];
  for (const feed of Object.values(FEEDS)) {
    for (const [networkId, address] of Object.entries(feed.addresses)) {
      if (address) result.push({ feed, networkId, address });
    }
  }
  return result;
}

/**
 * Returns the staleness threshold in seconds for a given cadence.
 * Falls back to env-configured values; defaults match BEA release cadence + buffer.
 */
export function getStalenessThresholdSeconds(cadence: Cadence): number {
  const daysMonthly = Number(process.env.STALE_THRESHOLD_MONTHLY_DAYS ?? 35);
  const daysQuarterly = Number(process.env.STALE_THRESHOLD_QUARTERLY_DAYS ?? 95);
  const days = cadence === 'monthly' ? daysMonthly : daysQuarterly;
  return days * 24 * 60 * 60;
}
