// src/lib/vitruveoTestnet.ts

import { Chain } from 'wagmi';

export const vitruveoTestnet: Chain = {
  id: 1967,
  name: 'Vitruveo Testnet',
  network: 'vitruveo-testnet',
  nativeCurrency: {
    name: 'Vitruveo Test Token',
    symbol: 'VTRU',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://rpc-testnet.vitruveo.xyz'],
    },
    public: {
      http: ['https://rpc-testnet.vitruveo.xyz'],
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
