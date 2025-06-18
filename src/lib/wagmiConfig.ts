// src/lib/wagmiConfig.ts
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { polygon } from 'wagmi/chains';

export const wagmiConfig = getDefaultConfig({
  appName: 'JugsDrive DApp',
  projectId: '73fcb57aa5d04e0f797f5d1386930214',
  chains: [polygon],
  ssr: true,
});
