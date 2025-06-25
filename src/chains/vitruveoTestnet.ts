import { defineChain } from 'viem';

export const vitruveoTestnet = defineChain({
  id: 4777,
  name: 'Vitruveo Testnet',
  network: 'vitruveo-testnet',
  nativeCurrency: {
    name: 'Vitruveo Token',
    symbol: 'VTRU',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://testnet-rpc.vitruveo.xyz'],
    },
    public: {
      http: ['https://testnet-rpc.vitruveo.xyz'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Vitruveo Explorer',
      url: 'https://explorer.vitruveo.xyz',
    },
  },
  testnet: true,
});
