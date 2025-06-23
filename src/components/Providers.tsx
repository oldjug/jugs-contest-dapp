// src/components/Providers.tsx

'use client';

import { ReactNode } from 'react';
import { WagmiProvider, http } from 'wagmi';
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vitruveoTestnet } from '@/lib/vitruveoTestnet';

const config = getDefaultConfig({
  appName: 'JugsDrive',
  projectId: 'YOUR_WALLETCONNECT_PROJECT_ID', // Replace this
  chains: [vitruveoTestnet],
  transports: {
    [vitruveoTestnet.id]: http(),
  },
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
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
