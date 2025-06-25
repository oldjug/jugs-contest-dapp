'use client';

import { WagmiProvider, createConfig, http } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { vitruveoTestnet } from '../chains/vitruveoTestnet';

const WALLETCONNECT_PROJECT_ID = 'Y73fcb57aa5d04e0f797f5d1386930214';

const config = getDefaultConfig({
  appName: 'JugsDrive Contest dApp',
  projectId: WALLETCONNECT_PROJECT_ID,
  chains: [vitruveoTestnet],
  transports: {
    [vitruveoTestnet.id]: http(),
  },
  ssr: true,
});

const queryClient = new QueryClient();

export default function Web3Provider({ children }: { children: React.ReactNode }) {
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
