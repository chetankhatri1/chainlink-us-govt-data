import { Cadence, FeedId, FeedMeta, NetworkId } from '../types';

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
// Feed Metadata & Contract Addresses
//
// ⚠️  IMPORTANT — CONTRACT ADDRESSES
// The Chainlink US Government Macroeconomic feed addresses are published at:
//   https://docs.chain.link/data-feeds/us-government-macroeconomic/addresses
//
// The placeholder string 'FETCH_FROM_DOCS' must be replaced with the real
// checksummed address before those networks can be used.
//
// To populate: visit the docs URL above, find the address for each feed on
// each network, and replace the placeholder strings below.
// ─────────────────────────────────────────────────────────────────────────────

const PLACEHOLDER = 'FETCH_FROM_DOCS';

/** Sentinal value — a real address starts with '0x' and is 42 chars. */
export function isPlaceholder(address: string): boolean {
  return address === PLACEHOLDER;
}

export const FEEDS: Record<FeedId, FeedMeta> = {
  // ── Real Gross Domestic Product ─────────────────────────────────────────
  GDP_LEVEL: {
    id: 'GDP_LEVEL',
    name: 'Real GDP / Level',
    description: 'Real Gross Domestic Product — absolute level (billions of chained 2017 USD)',
    cadence: 'quarterly' as Cadence,
    addresses: {
      ETHEREUM: PLACEHOLDER,
      BASE: PLACEHOLDER,
      ARBITRUM: PLACEHOLDER,
      OPTIMISM: PLACEHOLDER,
      AVALANCHE: PLACEHOLDER,
      ZKSYNC: PLACEHOLDER,
      LINEA: PLACEHOLDER,
      MANTLE: PLACEHOLDER,
      SONIC: PLACEHOLDER,
      BOTANIX: PLACEHOLDER,
    } as Partial<Record<NetworkId, string>>,
  },

  GDP_PCT_CHANGE: {
    id: 'GDP_PCT_CHANGE',
    name: 'Real GDP / % Change',
    description: 'Real GDP — annualised quarter-over-quarter percentage change',
    cadence: 'quarterly' as Cadence,
    addresses: {
      ETHEREUM: PLACEHOLDER,
      BASE: PLACEHOLDER,
      ARBITRUM: PLACEHOLDER,
      OPTIMISM: PLACEHOLDER,
      AVALANCHE: PLACEHOLDER,
      ZKSYNC: PLACEHOLDER,
      LINEA: PLACEHOLDER,
      MANTLE: PLACEHOLDER,
      SONIC: PLACEHOLDER,
      BOTANIX: PLACEHOLDER,
    } as Partial<Record<NetworkId, string>>,
  },

  // ── Personal Consumption Expenditures Price Index ────────────────────────
  PCE_LEVEL: {
    id: 'PCE_LEVEL',
    name: 'PCE Price Index / Level',
    description: 'Personal Consumption Expenditures Price Index — absolute level',
    cadence: 'monthly' as Cadence,
    addresses: {
      ETHEREUM: PLACEHOLDER,
      BASE: PLACEHOLDER,
      ARBITRUM: PLACEHOLDER,
      OPTIMISM: PLACEHOLDER,
      AVALANCHE: PLACEHOLDER,
      ZKSYNC: PLACEHOLDER,
      LINEA: PLACEHOLDER,
      MANTLE: PLACEHOLDER,
      SONIC: PLACEHOLDER,
      BOTANIX: PLACEHOLDER,
    } as Partial<Record<NetworkId, string>>,
  },

  PCE_PCT_CHANGE: {
    id: 'PCE_PCT_CHANGE',
    name: 'PCE Price Index / % Change',
    description: 'PCE Price Index — annualised month-over-month percentage change (inflation proxy)',
    cadence: 'monthly' as Cadence,
    addresses: {
      ETHEREUM: PLACEHOLDER,
      BASE: PLACEHOLDER,
      ARBITRUM: PLACEHOLDER,
      OPTIMISM: PLACEHOLDER,
      AVALANCHE: PLACEHOLDER,
      ZKSYNC: PLACEHOLDER,
      LINEA: PLACEHOLDER,
      MANTLE: PLACEHOLDER,
      SONIC: PLACEHOLDER,
      BOTANIX: PLACEHOLDER,
    } as Partial<Record<NetworkId, string>>,
  },

  // ── Real Final Sales to Private Domestic Purchasers ─────────────────────
  REAL_FINAL_SALES_LEVEL: {
    id: 'REAL_FINAL_SALES_LEVEL',
    name: 'Real Final Sales to Private Domestic / Level',
    description:
      'Real Final Sales to Private Domestic Purchasers — absolute level (demand excl. inventories)',
    cadence: 'quarterly' as Cadence,
    addresses: {
      ETHEREUM: PLACEHOLDER,
      BASE: PLACEHOLDER,
      ARBITRUM: PLACEHOLDER,
      OPTIMISM: PLACEHOLDER,
      AVALANCHE: PLACEHOLDER,
      ZKSYNC: PLACEHOLDER,
      LINEA: PLACEHOLDER,
      MANTLE: PLACEHOLDER,
      SONIC: PLACEHOLDER,
      BOTANIX: PLACEHOLDER,
    } as Partial<Record<NetworkId, string>>,
  },

  REAL_FINAL_SALES_PCT_CHANGE: {
    id: 'REAL_FINAL_SALES_PCT_CHANGE',
    name: 'Real Final Sales to Private Domestic / % Change',
    description: 'Real Final Sales to Private Domestic Purchasers — annualised % change',
    cadence: 'quarterly' as Cadence,
    addresses: {
      ETHEREUM: PLACEHOLDER,
      BASE: PLACEHOLDER,
      ARBITRUM: PLACEHOLDER,
      OPTIMISM: PLACEHOLDER,
      AVALANCHE: PLACEHOLDER,
      ZKSYNC: PLACEHOLDER,
      LINEA: PLACEHOLDER,
      MANTLE: PLACEHOLDER,
      SONIC: PLACEHOLDER,
      BOTANIX: PLACEHOLDER,
    } as Partial<Record<NetworkId, string>>,
  },
};

/**
 * Returns a flat list of (feed, network, address) tuples for every combination
 * where a real address has been configured (i.e. not a placeholder).
 */
export function getDeployedFeeds(): Array<{
  feed: FeedMeta;
  networkId: NetworkId;
  address: string;
}> {
  const result: Array<{ feed: FeedMeta; networkId: NetworkId; address: string }> = [];
  for (const feed of Object.values(FEEDS)) {
    for (const [networkId, address] of Object.entries(feed.addresses)) {
      if (address && !isPlaceholder(address)) {
        result.push({ feed, networkId: networkId as NetworkId, address });
      }
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
