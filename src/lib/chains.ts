// /src/lib/chains.ts
import { defineChain } from 'viem';

export const vitruveoTestnet = defineChain({
  id: 4777,
  name: 'Vitruveo Testnet',
  nativeCurrency: {
    name: 'VTRU',
    symbol: 'VTRU',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://rpc-testnet.vitruveo.xyz'],
    },
  },
  blockExplorers: {
    default: {
      name: 'VitruScan',
      url: 'https://testnet.vitruveo.xyz',
    },
  },
  testnet: true,
});
