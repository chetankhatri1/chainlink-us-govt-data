import { NetworkConfig, NetworkId } from '../types';

/**
 * All networks on which Chainlink US Government Macroeconomic feeds are deployed.
 *
 * Sequencer uptime feed addresses sourced from:
 * https://docs.chain.link/data-feeds/l2-sequencer-feeds
 *
 * Chain IDs sourced from https://chainlist.org
 */
export const NETWORKS: Record<NetworkId, NetworkConfig> = {
  ETHEREUM: {
    id: 'ETHEREUM',
    name: 'Ethereum Mainnet',
    chainId: 1,
    rpcEnvVar: 'RPC_ETHEREUM',
    isL2: false,
  },
  BASE: {
    id: 'BASE',
    name: 'Base Mainnet',
    chainId: 8453,
    rpcEnvVar: 'RPC_BASE',
    isL2: true,
    sequencerUptimeFeed: '0xBCF85224fc0756B9Fa45aA7892530B47e10b6433',
  },
  ARBITRUM: {
    id: 'ARBITRUM',
    name: 'Arbitrum One',
    chainId: 42161,
    rpcEnvVar: 'RPC_ARBITRUM',
    isL2: true,
    sequencerUptimeFeed: '0xFdB631F5EE196F0ed6FAa767959853A9F217697D',
  },
  OPTIMISM: {
    id: 'OPTIMISM',
    name: 'OP Mainnet',
    chainId: 10,
    rpcEnvVar: 'RPC_OPTIMISM',
    isL2: true,
    sequencerUptimeFeed: '0x371EAD81c9102C9BF4874A9075FFFf170F2Ee389',
  },
  AVALANCHE: {
    id: 'AVALANCHE',
    name: 'Avalanche C-Chain',
    chainId: 43114,
    rpcEnvVar: 'RPC_AVALANCHE',
    isL2: false,
  },
  ZKSYNC: {
    id: 'ZKSYNC',
    name: 'ZKsync Era Mainnet',
    chainId: 324,
    rpcEnvVar: 'RPC_ZKSYNC',
    isL2: true,
    sequencerUptimeFeed: '0x0E6AC8B967393dcD3D36677c126976157F993940',
  },
  LINEA: {
    id: 'LINEA',
    name: 'Linea Mainnet',
    chainId: 59144,
    rpcEnvVar: 'RPC_LINEA',
    // Linea does not currently have a Chainlink sequencer uptime feed.
    // Monitor https://docs.chain.link/data-feeds/l2-sequencer-feeds for updates.
    isL2: true,
  },
  MANTLE: {
    id: 'MANTLE',
    name: 'Mantle Mainnet',
    chainId: 5000,
    rpcEnvVar: 'RPC_MANTLE',
    isL2: true,
    sequencerUptimeFeed: '0xaDE1b9AbB98c6A542E4B49db2588a3Ec4bF7Cdf0',
  },
  SONIC: {
    id: 'SONIC',
    name: 'Sonic Mainnet',
    chainId: 146,
    rpcEnvVar: 'RPC_SONIC',
    isL2: false,
  },
  BOTANIX: {
    id: 'BOTANIX',
    name: 'Botanix Mainnet',
    chainId: 3637,
    rpcEnvVar: 'RPC_BOTANIX',
    isL2: false,
  },
};

/**
 * Returns the list of NetworkConfigs for which an RPC URL is present in env.
 * Networks without an RPC URL are silently skipped — the collector will only
 * read feeds on networks the caller has configured.
 */
export function getConfiguredNetworks(): NetworkConfig[] {
  return Object.values(NETWORKS).filter((n) => Boolean(process.env[n.rpcEnvVar]));
}

/**
 * Returns the RPC URL for a given network, throwing if it is not set.
 */
export function getRpcUrl(network: NetworkConfig): string {
  const url = process.env[network.rpcEnvVar];
  if (!url) {
    throw new Error(
      `Missing RPC URL for ${network.name}: set ${network.rpcEnvVar} in your .env file`,
    );
  }
  return url;
}
