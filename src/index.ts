/**
 * Entry point — implemented in Phase 4.
 *
 * Usage:
 *   tsx src/index.ts --once      # collect all feeds once and exit
 *   tsx src/index.ts --daemon    # run on POLL_INTERVAL_CRON schedule
 */

import 'dotenv/config';
import { getConfiguredNetworks } from './config/networks';
import { getDeployedFeeds } from './config/feeds';

const networks = getConfiguredNetworks();
const feeds = getDeployedFeeds();

console.log(`Configured networks : ${networks.map((n) => n.name).join(', ') || 'none'}`);
console.log(`Deployed feed slots : ${feeds.length}`);

if (feeds.length === 0) {
  console.warn(
    '\nNo feed addresses configured yet.\n' +
      'Fetch contract addresses from:\n' +
      '  https://docs.chain.link/data-feeds/us-government-macroeconomic/addresses\n' +
      'and populate src/config/feeds.ts',
  );
}
