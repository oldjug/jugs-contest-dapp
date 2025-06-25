import { createConfig, http } from 'wagmi';
import { vitruveoTestnet } from '@/chains/vitruveoTestnet'; // adjust path if needed
import { metaMask, walletConnect } from 'wagmi/connectors';

export const config = createConfig({
  chains: [vitruveoTestnet],
  connectors: [
    metaMask(),
    walletConnect({
      projectId: '73fcb57aa5d04e0f797f5d1386930214',
    }),
  ],
  transports: {
    [vitruveoTestnet.id]: http(),
  },
  ssr: true,
});
