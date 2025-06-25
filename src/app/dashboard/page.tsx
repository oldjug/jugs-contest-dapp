'use client';

import { useAccount } from 'wagmi';
import ActiveWalletCount from '@/components/ui/ActiveWalletCount';
import DictionarySearchBar from '@/components/DictionarySearchBar';

export default function DashboardPage() {
  const { isConnected } = useAccount();

  return (
    <div className="relative w-full min-h-screen bg-black text-white p-4">
      {/* Top Display Row */}
      <div className="flex justify-between items-center mb-6">
        {/* Active Wallets Left */}
        <div>
          <ActiveWalletCount />
        </div>

        {/* Dictionary Right */}
        <div>
          <DictionarySearchBar />
        </div>
      </div>

      {/* Main Dashboard Area */}
      <main className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold mb-4">JugsDrive Dashboard</h1>

        {isConnected ? (
          <p className="text-green-400 font-semibold">You're connected. Let’s earn some JUGS!</p>
        ) : (
          <p className="text-white/70">Connect your wallet to access dashboard features.</p>
        )}
      </main>
    </div>
  );
}
