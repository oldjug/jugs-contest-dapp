'use client';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

export default function WalletInfoCard() {
  const { address, isConnected } = useAccount();
  const [hasMounted, setHasMounted] = useState(false);
  const [jugsBalance, setJugsBalance] = useState<number | null>(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (isConnected) {
      // Dummy fetch - replace with real logic later
      setTimeout(() => setJugsBalance(100), 300);
    }
  }, [isConnected]);

  if (!hasMounted || !isConnected) return null;

  return (
    <div className="bg-gray-950 p-4 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold mb-1">👤 Your Wallet</h2>
      <p className="break-all text-sm text-gray-300">{address}</p>
      <div className="mt-3">
        <p className="text-md font-bold text-green-400">
          💰 JUGS Balance: {jugsBalance !== null ? jugsBalance : 'Loading...'}
        </p>
      </div>
    </div>
  );
}