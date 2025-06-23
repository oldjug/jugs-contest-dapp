'use client';

import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isConnected } = useAccount();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
        <h1 className="text-2xl font-bold mb-4">Wallet Required</h1>
        <p className="mb-6 text-center">
          You must connect your wallet to view this page.
        </p>
        <Link href="/">
          <button className="bg-blue-600 hover:bg-blue-800 text-white px-6 py-3 rounded">
            ← Back to Home
          </button>
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}