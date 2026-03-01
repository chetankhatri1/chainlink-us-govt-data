# Chainlink US Government Macroeconomic Data Collector — Plan

## Overview

This project reads US Bureau of Economic Analysis (BEA) macroeconomic data
published on-chain by the US Department of Commerce via Chainlink Data Feeds.
Data is collected off-chain using Node.js/TypeScript and ethers.js, then stored
locally (JSON/CSV) for analysis, dashboards, or downstream use.

---

## Data Feeds Available

All feeds use the `AggregatorV3Interface` (same interface as Chainlink price feeds).
Update cadence matches BEA release schedules — **quarterly** for GDP, **monthly**
for PCE.

| Feed Name                                    | Description                                    | Cadence   |
|----------------------------------------------|------------------------------------------------|-----------|
| Real GDP / Level                             | Real Gross Domestic Product, absolute level    | Quarterly |
| Real GDP / % Change                          | Real GDP annualised quarter-over-quarter       | Quarterly |
| PCE Price Index / Level                      | Personal Consumption Expenditures price level  | Monthly   |
| PCE Price Index / % Change                   | PCE month-over-month annualised change         | Monthly   |
| Real Final Sales to Private Domestic / Level | Demand excluding inventories, absolute level   | Quarterly |
| Real Final Sales to Private Domestic / % Chg | Same, annualised % change                     | Quarterly |

### Networks (initial launch)

Arbitrum, Avalanche, Base, Botanix, Ethereum, Linea, Mantle, Optimism, Sonic, ZKsync

Contract addresses: https://docs.chain.link/data-feeds/us-government-macroeconomic/addresses

---

## Architecture

```
src/
  config/
    feeds.ts          # Feed names, addresses per network, decimals
    networks.ts       # RPC endpoints, chain IDs
  reader/
    FeedReader.ts     # Wraps AggregatorV3Interface, reads latestRoundData()
    HistoryReader.ts  # Walks back through getRoundData() for historical pulls
  collector/
    Collector.ts      # Orchestrates reads across all feeds + networks
    Scheduler.ts      # Cron-based polling aligned to BEA release calendar
  storage/
    JsonStore.ts      # Append-to-JSON line-delimited store
    CsvExporter.ts    # Flattens rounds to CSV
  types/
    index.ts          # Shared TypeScript types
  index.ts            # Entry point (one-shot or daemon mode)
scripts/
  backfill.ts         # Pull all historical rounds for a given feed
  inspect.ts          # Quick CLI to print latest value for any feed
data/                 # Output directory (gitignored)
```

---

## Requirements

### Functional

1. Read `latestRoundData()` from every configured feed on every configured network.
2. Decode the raw `int256 answer` using each feed's `decimals()`.
3. Persist each round as a timestamped record (roundId, answer, updatedAt, network, feed).
4. Detect and skip already-seen roundIds to avoid duplicate writes.
5. Backfill historical rounds using `getRoundData(roundId)` walking backwards.
6. For L2 networks (Arbitrum, Base, Optimism, ZKsync, Linea, Mantle) check the
   **L2 Sequencer Uptime Feed** before trusting data; skip or flag stale reads.
7. Configurable via environment variables (RPC URLs, poll interval, output path).
8. CLI script for ad-hoc inspection of any feed on any network.

### Non-Functional

- TypeScript strict mode throughout.
- No sensitive data (private keys) required — all reads are view calls.
- Resilient: exponential back-off on RPC errors, configurable retry count.
- Lightweight: no database dependency; plain JSON/CSV output.

---

## Dependencies

### Runtime

| Package           | Version  | Purpose                                      |
|-------------------|----------|----------------------------------------------|
| `ethers`          | ^6.x     | JSON-RPC provider, Contract interface        |
| `node-cron`       | ^3.x     | Cron scheduling for periodic collection      |
| `dotenv`          | ^16.x    | Load RPC URLs and config from `.env`         |

### Dev / Build

| Package                        | Version  | Purpose                              |
|--------------------------------|----------|--------------------------------------|
| `typescript`                   | ^5.x     | Type-safe JS                         |
| `ts-node`                      | ^10.x    | Run TS scripts directly              |
| `@types/node`                  | ^20.x    | Node built-in typings                |
| `@types/node-cron`             | ^3.x     | Cron typings                         |
| `tsx`                          | ^4.x     | Fast TS execution for scripts        |
| `eslint` + `@typescript-eslint`| latest   | Linting                              |
| `prettier`                     | ^3.x     | Code formatting                      |

### Chainlink ABI (no extra package needed)

The `AggregatorV3Interface` ABI is small enough to inline. No need for
`@chainlink/contracts` unless writing Solidity consumers.

---

## Key Interface

```typescript
// Returned by latestRoundData() / getRoundData()
interface RoundData {
  roundId:         bigint;
  answer:          bigint;   // raw — divide by 10^decimals for human value
  startedAt:       bigint;   // unix timestamp
  updatedAt:       bigint;   // unix timestamp (use this for staleness check)
  answeredInRound: bigint;
}

// Stored record per collection run
interface FeedRecord {
  feed:       string;   // e.g. "Real GDP / % Change"
  network:    string;   // e.g. "base"
  address:    string;
  roundId:    string;
  value:      number;   // decoded (answer / 10^decimals)
  decimals:   number;
  updatedAt:  string;   // ISO-8601
  collectedAt: string;  // ISO-8601
}
```

---

## Staleness / L2 Safety

- **Heartbeat**: GDP feeds update quarterly, PCE monthly. A read >35 days old for
  PCE or >95 days for GDP should be flagged as potentially stale.
- **L2 sequencer check**: Before reading any L2 feed, call the sequencer uptime
  feed. If `answer == 1` (sequencer down) or `timeSinceUp < gracePeriod (3600s)`,
  skip the read and log a warning.
  Sequencer uptime feed addresses are documented at:
  https://docs.chain.link/data-feeds/l2-sequencer-feeds

---

## Environment Variables

```
# Required — at least one RPC URL per network you want to read
RPC_ETHEREUM=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
RPC_BASE=https://base-mainnet.g.alchemy.com/v2/YOUR_KEY
RPC_ARBITRUM=https://arb-mainnet.g.alchemy.com/v2/YOUR_KEY
RPC_OPTIMISM=https://opt-mainnet.g.alchemy.com/v2/YOUR_KEY
RPC_AVALANCHE=https://avalanche-mainnet.infura.io/v3/YOUR_KEY
RPC_ZKSYNC=https://mainnet.era.zksync.io
RPC_LINEA=https://linea-mainnet.infura.io/v3/YOUR_KEY
RPC_MANTLE=https://rpc.mantle.xyz

# Optional
POLL_INTERVAL_CRON="0 9 * * *"   # daily at 09:00 UTC (feeds only change monthly/quarterly)
OUTPUT_DIR=./data
LOG_LEVEL=info
```

---

## Implementation Phases

### Phase 1 — Foundation
- [ ] `package.json`, `tsconfig.json`, `.env.example`, `.gitignore`
- [ ] `src/types/index.ts`
- [ ] `src/config/feeds.ts` (hardcoded addresses for all 6 feeds × supported networks)
- [ ] `src/config/networks.ts` (chain IDs, RPC env var mapping, sequencer addresses)

### Phase 2 — Feed Reader
- [ ] `src/reader/FeedReader.ts` (latestRoundData, decimals, staleness check)
- [ ] `src/reader/HistoryReader.ts` (getRoundData backfill loop)
- [ ] L2 sequencer uptime gate

### Phase 3 — Collector + Storage
- [ ] `src/collector/Collector.ts`
- [ ] `src/storage/JsonStore.ts` (append, dedup by roundId)
- [ ] `src/storage/CsvExporter.ts`

### Phase 4 — Scheduler + Entry Point
- [ ] `src/collector/Scheduler.ts` (node-cron wrapper)
- [ ] `src/index.ts` (CLI flags: `--once`, `--daemon`, `--networks`, `--feeds`)

### Phase 5 — Scripts
- [ ] `scripts/inspect.ts` — print latest value for one feed
- [ ] `scripts/backfill.ts` — pull historical rounds

---

## References

- [Chainlink US Government Macroeconomic Addresses](https://docs.chain.link/data-feeds/us-government-macroeconomic/addresses)
- [Using Data Feeds on EVM Chains](https://docs.chain.link/data-feeds/using-data-feeds)
- [Data Feeds API Reference](https://docs.chain.link/data-feeds/api-reference)
- [L2 Sequencer Uptime Feeds](https://docs.chain.link/data-feeds/l2-sequencer-feeds)
- [Historical Data (getRoundData)](https://docs.chain.link/data-feeds/historical-data)
- [US Dept of Commerce × Chainlink announcement](https://blockworks.co/news/chainlink-labs-commerce)
