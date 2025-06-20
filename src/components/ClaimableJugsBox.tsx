'use client';

import { useAccount } from 'wagmi';

export default function ClaimableJugsBox() {
  const { address } = useAccount();

  return (
    <div className="bg-brand-dark p-4 rounded text-brand-light">
      <h3 className="text-yellow-400 mb-1">Claimable JUGS</h3>
      <div className="text-lg">
        {/* Replace with backend/graph data about claimable JUGS */}
        {address ? 'Derived from task completions (coming soon)' : 'Connect wallet to check'}
      </div>
    </div>
  );
}
