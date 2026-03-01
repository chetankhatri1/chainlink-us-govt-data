/**
 * Raw return value from AggregatorV3Interface.latestRoundData() / getRoundData()
 */
export interface RoundData {
  roundId: bigint;
  answer: bigint; // raw integer — divide by 10^decimals for human-readable value
  startedAt: bigint; // unix timestamp (seconds)
  updatedAt: bigint; // unix timestamp (seconds) — use for staleness checks
  answeredInRound: bigint;
}

/**
 * A single collected record written to storage.
 */
export interface FeedRecord {
  feed: string; // e.g. "Real GDP / % Change"
  feedId: FeedId; // machine-readable identifier
  network: NetworkId; // e.g. "base"
  address: string; // checksummed contract address
  roundId: string; // stringified bigint to avoid JSON precision loss
  value: number; // decoded: answer / 10^decimals
  decimals: number;
  updatedAt: string; // ISO-8601 — when the oracle last updated on-chain
  collectedAt: string; // ISO-8601 — when this process read the value
  stale: boolean; // true if updatedAt exceeds configured threshold
}

/**
 * Result of a single feed-read attempt by the Collector.
 */
export type CollectionResult =
  | { ok: true; record: FeedRecord }
  | { ok: false; feedId: FeedId; network: NetworkId; reason: string };

/**
 * Machine-readable identifiers for the six BEA feeds.
 */
export type FeedId =
  | 'GDP_LEVEL'
  | 'GDP_PCT_CHANGE'
  | 'PCE_LEVEL'
  | 'PCE_PCT_CHANGE'
  | 'REAL_FINAL_SALES_LEVEL'
  | 'REAL_FINAL_SALES_PCT_CHANGE';

/**
 * Supported network identifiers (matching .env variable suffixes).
 */
export type NetworkId =
  | 'ETHEREUM'
  | 'BASE'
  | 'ARBITRUM'
  | 'OPTIMISM'
  | 'AVALANCHE'
  | 'ZKSYNC'
  | 'LINEA'
  | 'MANTLE'
  | 'SONIC'
  | 'BOTANIX';

/**
 * Update cadence of a feed, matching BEA release schedules.
 */
export type Cadence = 'monthly' | 'quarterly';

/**
 * Static configuration for one BEA data feed.
 */
export interface FeedMeta {
  id: FeedId;
  name: string; // human-readable
  description: string;
  cadence: Cadence;
  /** Address per network — undefined means the feed is not deployed on that network. */
  addresses: Partial<Record<NetworkId, string>>;
}

/**
 * Static configuration for one supported EVM network.
 */
export interface NetworkConfig {
  id: NetworkId;
  name: string; // human-readable
  chainId: number;
  /** Environment variable name that holds the RPC URL (e.g. RPC_ETHEREUM). */
  rpcEnvVar: string;
  /** Whether this is an L2 that requires a sequencer uptime check. */
  isL2: boolean;
  /**
   * Chainlink L2 Sequencer Uptime Feed address.
   * Only set when isL2 is true.
   * Source: https://docs.chain.link/data-feeds/l2-sequencer-feeds
   */
  sequencerUptimeFeed?: string;
}

/**
 * Parsed environment / runtime configuration.
 */
export interface AppConfig {
  networks: NetworkConfig[];
  pollCron: string;
  outputDir: string;
  logLevel: 'error' | 'warn' | 'info' | 'debug';
  l2GracePeriodSeconds: number;
  staleThresholds: {
    monthly: number; // days
    quarterly: number; // days
  };
}
