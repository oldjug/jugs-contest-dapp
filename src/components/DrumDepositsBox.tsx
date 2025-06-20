'use client';

import { useAccount } from 'wagmi';

export default function DrumDepositsBox() {
  const { address } = useAccount();

  return (
     <div className="bg-brand-dark p-4 rounded text-brand-light">
      <h3 className="text-yellow-400 mb-1">Drum Deposits</h3>
      <div className="text-lg">
        {address ? 'Tracking deposit tiers (placeholder)' : 'Connect wallet to view'}
      </div>
    </div>
  );
}
