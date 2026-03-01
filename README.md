# Chainlink US Government Macroeconomic Data Collector

Collects US Bureau of Economic Analysis (BEA) macroeconomic data published on-chain by the US Department of Commerce via [Chainlink Data Feeds](https://docs.chain.link/data-feeds/us-government-macroeconomic/addresses). Reads `latestRoundData()` across configured EVM networks, applies L2 sequencer safety checks, and writes results to newline-delimited JSON for downstream analysis or dashboards.

---

## Data feeds

All feeds implement `AggregatorV3Interface`. Update cadence matches BEA release schedules.

| Feed ID | Name | Cadence |
|---|---|---|
| `GDP_LEVEL` | Real GDP / Level | Quarterly |
| `GDP_PCT_CHANGE` | Real GDP / % Change | Quarterly |
| `PCE_LEVEL` | PCE Price Index / Level | Monthly |
| `PCE_PCT_CHANGE` | PCE Price Index / % Change | Monthly |
| `REAL_FINAL_SALES_LEVEL` | Real Final Sales to Private Domestic / Level | Quarterly |
| `REAL_FINAL_SALES_PCT_CHANGE` | Real Final Sales to Private Domestic / % Change | Quarterly |

Contract addresses: https://docs.chain.link/data-feeds/us-government-macroeconomic/addresses

### Supported networks

Arbitrum, Avalanche, Base, Botanix, Ethereum, Linea, Mantle, Optimism, Sonic, ZKsync

---

## Requirements

- Node.js 20+
- An RPC URL for at least one supported network (no wallet or private key needed — all reads are view calls)

---

## Setup

```bash
npm install
cp .env.example .env
# Edit .env and add at least one RPC_* URL
```

---

## Usage

```bash
# Collect all feeds once and exit
npm run start:once

# Run on a cron schedule (default: daily at 09:00 UTC)
npm run start:daemon

# Print usage and all env var options
npm start
```

### Output files

All files are written to `OUTPUT_DIR` (default `./data`).

| File | Description |
|---|---|
| `records.ndjson` | Append-only time-series — one JSON line per successful record per run |
| `latest.json` | Current snapshot keyed by `"NETWORK/FEED_ID"` — overwritten each run |
| `errors.ndjson` | Failed read attempts with timestamps — useful for debugging RPC or sequencer issues |

### Example record (`records.ndjson`)

```json
{
  "feed": "Real GDP / Level",
  "feedId": "GDP_LEVEL",
  "network": "BASE",
  "address": "0x0df397aFE00085C138a99eFB39C498e08eB95aD1",
  "roundId": "18446744073709552105",
  "value": 22996.536,
  "decimals": 3,
  "updatedAt": "2024-12-20T14:30:00.000Z",
  "collectedAt": "2025-01-15T09:00:01.234Z",
  "stale": false
}
```

---

## Environment variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `RPC_BASE` | At least one | — | Base Mainnet RPC URL |
| `RPC_ETHEREUM` | At least one | — | Ethereum Mainnet RPC URL |
| `RPC_ARBITRUM` | At least one | — | Arbitrum One RPC URL |
| `RPC_OPTIMISM` | At least one | — | OP Mainnet RPC URL |
| `RPC_AVALANCHE` | At least one | — | Avalanche C-Chain RPC URL |
| `RPC_ZKSYNC` | At least one | — | ZKsync Era RPC URL |
| `RPC_LINEA` | At least one | — | Linea Mainnet RPC URL |
| `RPC_MANTLE` | At least one | — | Mantle Mainnet RPC URL |
| `RPC_SONIC` | At least one | — | Sonic Mainnet RPC URL |
| `RPC_BOTANIX` | At least one | — | Botanix Mainnet RPC URL |
| `OUTPUT_DIR` | No | `./data` | Directory for output files |
| `POLL_INTERVAL_CRON` | No | `0 9 * * *` | node-cron schedule for `--daemon` |
| `L2_GRACE_PERIOD_SECONDS` | No | `3600` | Seconds sequencer must be up before trusting L2 data |
| `STALE_THRESHOLD_MONTHLY_DAYS` | No | `35` | Days before a monthly feed is flagged stale |
| `STALE_THRESHOLD_QUARTERLY_DAYS` | No | `95` | Days before a quarterly feed is flagged stale |

Free public RPC endpoints work fine — these feeds update at most monthly, so request volume is negligible.

---

## Project structure

```
src/
  config/
    feeds.ts          # Feed metadata and contract addresses per network
    networks.ts       # Chain IDs, RPC env vars, sequencer uptime feed addresses
  reader/
    feedReader.ts     # Reads latestRoundData(), decodes values, checks staleness
    sequencerGuard.ts # L2 sequencer uptime gate (skips reads when sequencer is down)
  storage/
    jsonWriter.ts     # appendRecords(), writeLatest(), persist()
  types/
    index.ts          # Shared TypeScript types
  index.ts            # CLI entry point (--once / --daemon)
data/                 # Output directory (gitignored)
```

---

## L2 sequencer safety

Before reading any feed on an L2 network, the collector calls the [Chainlink L2 Sequencer Uptime Feed](https://docs.chain.link/data-feeds/l2-sequencer-feeds) for that network. If the sequencer is down (`answer == 1`) or restarted within the grace period (default 1 hour), all feeds on that network are skipped and the reason is written to `errors.ndjson`.

Sequencer uptime feeds are configured for: Base, Arbitrum, Optimism, ZKsync, Mantle. Linea is monitored but does not currently have a Chainlink uptime feed.

---

## Staleness flags

A record is written with `"stale": true` if `updatedAt` is older than the configured threshold. This is a data quality warning — it means the BEA has not published a new release within the expected window, not that the collector failed.

---

## Development

```bash
npm run build     # Compile TypeScript to dist/
npm run lint      # ESLint
npm run format    # Prettier
```

---

## References

- [Chainlink US Government Macroeconomic Feeds — Addresses](https://docs.chain.link/data-feeds/us-government-macroeconomic/addresses)
- [Using Data Feeds on EVM Chains](https://docs.chain.link/data-feeds/using-data-feeds)
- [Data Feeds API Reference (AggregatorV3Interface)](https://docs.chain.link/data-feeds/api-reference)
- [L2 Sequencer Uptime Feeds](https://docs.chain.link/data-feeds/l2-sequencer-feeds)
