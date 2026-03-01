import { ethers } from 'ethers';
import { AGGREGATOR_V3_ABI, FEEDS, getStalenessThresholdSeconds } from '../config/feeds';
import { getConfiguredNetworks, NETWORKS, getRpcUrl } from '../config/networks';
import { checkSequencer } from './sequencerGuard';
import { CollectionResult, FeedRecord, NetworkId } from '../types';

/**
 * Reads every configured feed on a single network.
 *
 * The L2 sequencer gate is applied once per network call — if the sequencer
 * is down or within the grace period, every feed on that network fails fast
 * rather than returning stale data.
 */
export async function readFeedsForNetwork(networkId: NetworkId): Promise<CollectionResult[]> {
  const network = NETWORKS[networkId];

  // Feeds deployed on this network
  const networkFeeds = Object.values(FEEDS).filter((f) => f.addresses[networkId]);
  if (networkFeeds.length === 0) return [];

  // Build provider — fail all feeds if the RPC URL is missing/broken
  let provider: ethers.JsonRpcProvider;
  try {
    provider = new ethers.JsonRpcProvider(getRpcUrl(network));
  } catch (err) {
    return networkFeeds.map((f) => ({
      ok: false,
      feedId: f.id,
      network: networkId,
      reason: `Provider error: ${(err as Error).message}`,
    }));
  }

  // L2 sequencer gate — one check, applied to all feeds on the network
  const guard = await checkSequencer(provider, network);
  if (!guard.ok) {
    return networkFeeds.map((f) => ({
      ok: false,
      feedId: f.id,
      network: networkId,
      reason: `Sequencer guard: ${guard.reason}`,
    }));
  }

  const nowSeconds = Math.floor(Date.now() / 1000);
  const collectedAt = new Date().toISOString();
  const results: CollectionResult[] = [];

  for (const feedMeta of networkFeeds) {
    const address = feedMeta.addresses[networkId] as string;

    try {
      const contract = new ethers.Contract(address, AGGREGATOR_V3_ABI, provider);

      // Fetch decimals and latest round in parallel
      const [rawDecimals, round] = await Promise.all([
        contract.decimals() as Promise<bigint>,
        contract.latestRoundData() as Promise<{
          roundId: bigint;
          answer: bigint;
          startedAt: bigint;
          updatedAt: bigint;
          answeredInRound: bigint;
        }>,
      ]);

      const { roundId, answer, updatedAt, answeredInRound } = round;
      const decimals = Number(rawDecimals);

      // Chainlink validity check: answeredInRound must be >= roundId
      if (answeredInRound < roundId) {
        results.push({
          ok: false,
          feedId: feedMeta.id,
          network: networkId,
          reason: 'Invalid round: answeredInRound < roundId',
        });
        continue;
      }

      const stalenessThresholdSeconds = getStalenessThresholdSeconds(feedMeta.cadence);
      const stale = nowSeconds - Number(updatedAt) > stalenessThresholdSeconds;
      const value = Number(answer) / Math.pow(10, decimals);

      const record: FeedRecord = {
        feed: feedMeta.name,
        feedId: feedMeta.id,
        network: networkId,
        address,
        roundId: roundId.toString(),
        value,
        decimals,
        updatedAt: new Date(Number(updatedAt) * 1000).toISOString(),
        collectedAt,
        stale,
      };

      results.push({ ok: true, record });
    } catch (err) {
      results.push({
        ok: false,
        feedId: feedMeta.id,
        network: networkId,
        reason: (err as Error).message,
      });
    }
  }

  return results;
}

/**
 * Reads all deployed feeds across every network that has an RPC URL configured.
 * Networks are queried concurrently; a failure on one does not block others.
 */
export async function readAllFeeds(): Promise<CollectionResult[]> {
  const networks = getConfiguredNetworks();

  const settled = await Promise.allSettled(networks.map((n) => readFeedsForNetwork(n.id)));

  return settled.flatMap((s) => (s.status === 'fulfilled' ? s.value : []));
}
