/**
 * Entry point for the Chainlink US Government Macroeconomic data collector.
 *
 * Usage:
 *   tsx src/index.ts --once      # collect all feeds once and exit
 *   tsx src/index.ts --daemon    # run on POLL_INTERVAL_CRON schedule
 *
 * Key environment variables:
 *   OUTPUT_DIR            Where to write data files  (default: ./data)
 *   POLL_INTERVAL_CRON    node-cron schedule string   (default: 0 * * * *)
 *   RPC_BASE, RPC_ETHEREUM, …    RPC URLs — at least one required
 */

import 'dotenv/config';
import * as cron from 'node-cron';
import { getConfiguredNetworks } from './config/networks';
import { readAllFeeds } from './reader/feedReader';
import { persist } from './storage/jsonWriter';
import { CollectionResult } from './types';

const OUTPUT_DIR = process.env.OUTPUT_DIR ?? './data';
const POLL_CRON = process.env.POLL_INTERVAL_CRON ?? '0 * * * *'; // hourly

// ─────────────────────────────────────────────────────────────────────────────
// Single collection cycle
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Runs one full collection cycle:
 *   1. Reads all feeds on every configured network.
 *   2. Persists results (records.ndjson + latest.json + errors.ndjson).
 *   3. Prints a structured summary to stdout/stderr.
 *
 * Returns an exit code suitable for `process.exit()` in --once mode:
 *   0 — all feeds read successfully (stale flags are warnings, not errors)
 *   1 — one or more feeds failed to read, or no networks were configured
 */
async function collect(): Promise<0 | 1> {
  const networks = getConfiguredNetworks();
  if (networks.length === 0) {
    console.error(
      '[FATAL] No RPC URLs configured. Set at least one of: ' +
        'RPC_BASE, RPC_ETHEREUM, RPC_ARBITRUM, … in your .env file.',
    );
    return 1;
  }

  const startedAt = Date.now();
  const ts = () => new Date().toISOString();
  console.log(`[${ts()}] Collecting from ${networks.map((n) => n.name).join(', ')}`);

  let results: CollectionResult[];
  try {
    results = await readAllFeeds();
  } catch (err) {
    console.error(`[${ts()}] [FATAL] readAllFeeds threw: ${(err as Error).message}`);
    return 1;
  }

  const report = await persist(results, OUTPUT_DIR);
  const ms = Date.now() - startedAt;

  console.log(
    `[${ts()}] Finished in ${ms}ms — ` +
      `written: ${report.written}  skipped: ${report.skipped}  stale: ${report.stale}`,
  );

  // Print stale warnings
  for (const r of results) {
    if (r.ok && r.record.stale) {
      console.warn(
        `  [STALE] ${r.record.network}/${r.record.feedId}  updatedAt: ${r.record.updatedAt}`,
      );
    }
  }

  // Print feed errors
  for (const r of results) {
    if (!r.ok) {
      console.error(`  [ERROR] ${r.network}/${r.feedId}: ${r.reason}`);
    }
  }

  return report.skipped > 0 ? 1 : 0;
}

// ─────────────────────────────────────────────────────────────────────────────
// CLI dispatch
// ─────────────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);

if (args.includes('--once')) {
  // ── Single-shot mode ──────────────────────────────────────────────────────
  collect()
    .then((code) => process.exit(code))
    .catch((err) => {
      console.error('[FATAL]', err);
      process.exit(1);
    });
} else if (args.includes('--daemon')) {
  // ── Daemon mode ───────────────────────────────────────────────────────────
  if (!cron.validate(POLL_CRON)) {
    console.error(
      `[FATAL] Invalid cron expression "${POLL_CRON}". ` +
        'Set POLL_INTERVAL_CRON to a valid node-cron expression.',
    );
    process.exit(1);
  }

  console.log(
    `[${new Date().toISOString()}] Daemon starting — ` +
      `schedule: "${POLL_CRON}"  output: ${OUTPUT_DIR}`,
  );

  // Run once immediately so there is no blind spot at startup.
  collect().catch((err) => console.error('[ERROR]', err));

  cron.schedule(POLL_CRON, () => {
    collect().catch((err) => console.error('[ERROR]', err));
  });
} else {
  // ── Usage ─────────────────────────────────────────────────────────────────
  console.log(
    [
      '',
      'Chainlink US Government Macroeconomic data collector',
      '',
      'Usage:',
      '  tsx src/index.ts --once     Collect all feeds once and exit',
      '  tsx src/index.ts --daemon   Collect on a cron schedule (runs forever)',
      '',
      'Environment variables:',
      '  OUTPUT_DIR              Output directory          (default: ./data)',
      '  POLL_INTERVAL_CRON      node-cron schedule        (default: 0 * * * *)',
      '  RPC_BASE                Base Mainnet RPC URL',
      '  RPC_ETHEREUM            Ethereum Mainnet RPC URL',
      '  RPC_ARBITRUM            Arbitrum One RPC URL',
      '  RPC_OPTIMISM            OP Mainnet RPC URL',
      '  (…and RPC_ variants for AVALANCHE, ZKSYNC, LINEA, MANTLE, SONIC, BOTANIX)',
      '  L2_GRACE_PERIOD_SECONDS Sequencer restart buffer  (default: 3600)',
      '  STALE_THRESHOLD_MONTHLY_DAYS    (default: 35)',
      '  STALE_THRESHOLD_QUARTERLY_DAYS  (default: 95)',
      '',
      'Output files written to OUTPUT_DIR:',
      '  records.ndjson   Append-only historical time-series (one JSON line per record)',
      '  latest.json      Latest value per feed×network (overwritten each run)',
      '  errors.ndjson    Failed read attempts with timestamps',
      '',
    ].join('\n'),
  );
  process.exit(0);
}
