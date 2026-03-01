import { ethers } from 'ethers';
import { AGGREGATOR_V3_ABI } from '../config/feeds';
import { NetworkConfig } from '../types';

export type GuardResult = { ok: true } | { ok: false; reason: string };

/**
 * Verifies the Base L2 sequencer is live and has been up longer than the
 * configured grace period before trusting any oracle data.
 *
 * answer == 0n → sequencer UP
 * answer == 1n → sequencer DOWN
 *
 * Source: https://docs.chain.link/data-feeds/l2-sequencer-feeds
 */
export async function checkSequencer(
  provider: ethers.JsonRpcProvider,
  network: NetworkConfig,
): Promise<GuardResult> {
  // Non-L2 networks and L2s without a registered feed skip the guard.
  if (!network.isL2 || !network.sequencerUptimeFeed) {
    return { ok: true };
  }

  const gracePeriodSeconds = Number(process.env.L2_GRACE_PERIOD_SECONDS ?? 3600);

  try {
    const feed = new ethers.Contract(network.sequencerUptimeFeed, AGGREGATOR_V3_ABI, provider);
    const { answer, startedAt } = await feed.latestRoundData();

    if (answer !== 0n) {
      return { ok: false, reason: 'L2 sequencer is reported as DOWN' };
    }

    const secondsUp = Math.floor(Date.now() / 1000) - Number(startedAt);
    if (secondsUp < gracePeriodSeconds) {
      return {
        ok: false,
        reason: `Sequencer restarted ${secondsUp}s ago — grace period (${gracePeriodSeconds}s) not elapsed`,
      };
    }

    return { ok: true };
  } catch (err) {
    return { ok: false, reason: `Sequencer feed call failed: ${(err as Error).message}` };
  }
}
