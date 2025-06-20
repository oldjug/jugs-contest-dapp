import {
  WagmiProvider,
  createConfig,
  http,
  Chain,
} from 'wagmi';

import { getDefaultWallets } from '@rainbow-me/rainbowkit';

export const vitruveoTestnet: Chain = {
  id: 14333,
  name: 'Vitruveo Testnet',
  network: 'vitruveo-testnet',
  nativeCurrency: {
    name: 'Test VTRU',
    symbol: 'tVTRU',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://test-rpc.vitruveo.xyz'] },
    public: { http: ['https://test-rpc.vitruveo.xyz'] },
  },
  blockExplorers: {
    default: { name: 'Vitruveo Explorer', url: 'https://explorer.vitruveo.xyz' },
  },
  testnet: true,
};

export const { connectors } = getDefaultWallets({
  appName: 'JugsDrive DApp',
  projectId: 'YOUR_WALLETCONNECT_PROJECT_ID', // Use a real one from walletconnect.com
});

export const wagmiConfig = createConfig({
  chains: [vitruveoTestnet],
  connectors,
  transports: {
    [vitruveoTestnet.id]: http('https://test-rpc.vitruveo.xyz'),
  },
  ssr: true,
});