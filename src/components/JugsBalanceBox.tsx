'use client';

import { useAccount } from 'wagmi';

export default function JugsBalanceBox() {
  const { address } = useAccount();

  return (
    <div className="bg-zinc-800 p-4 rounded text-white">
      <h3 className="text-yellow-400 mb-1">Your JUGS Balance</h3>
      <div className="text-lg">
        {/* Replace with actual token balance logic */}
        {address ? 'Loading balance...' : 'Connect wallet to view balance.'}
      </div>
    </div>
  );
}
