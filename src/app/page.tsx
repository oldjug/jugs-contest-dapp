'use client';

import { useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { ConnectWallet } from '@/components/ConnectWallet';
import ChainStatus from '@/components/ChainStatus';
import SignIn from '@/components/SignIn';
import ClaimButton from '@/components/ClaimButton';

export default function Home() {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [signedIn, setSignedIn] = useState(false);

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🎉 Jugs Contest DApp</h1>

      {/* Wallet connect + disconnect row */}
      <div className="flex items-center gap-4">
        <ConnectWallet />
        <button
          onClick={() => {
            disconnect();
            setSignedIn(false);
          }}
          className="text-sm text-gray-500 underline hover:text-gray-700 transition"
        >
          Disconnect
        </button>
      </div>

      {isConnected && (
        <div className="mt-6">
          {!signedIn ? (
            <SignIn onAuthenticated={() => setSignedIn(true)} />
          ) : (
            <>
              <ChainStatus />
              <div className="mt-6">
                <ClaimButton />
              </div>
            </>
          )}
        </div>
      )}
    </main>
  );
}
