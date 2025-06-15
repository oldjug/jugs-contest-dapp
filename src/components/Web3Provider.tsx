'use client';

import { ReactNode } from 'react';
import {
  WagmiProvider,
  createConfig,
  http,
  Chain,
} from 'wagmi';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';

const vitruveoTestnet: Chain = {
  id: 14333,
  name: 'Vitruveo Testnet',
  network: 'vitruveo-testnet',
  nativeCurrency: {
    name: 'Test VTRU',
    symbol: 'tVTRU',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://test-rpc.vitruveo.xyz'],
    },
    public: {
      http: ['https://test-rpc.vitruveo.xyz'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Vitruveo Explorer',
      url: 'https://explorer.vitruveo.xyz',
    },
  },
  testnet: true,
};

const { connectors } = getDefaultWallets({
  appName: 'Jugs Contest DApp',
  projectId: 'YOUR_WALLETCONNECT_PROJECT_ID', // Replace this with your actual WalletConnect Project ID
});

const config = createConfig({
  chains: [vitruveoTestnet],
  connectors,
  transports: {
    [vitruveoTestnet.id]: http('https://test-rpc.vitruveo.xyz'),
  },
  ssr: true,
});

const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider chains={[vitruveoTestnet]}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}