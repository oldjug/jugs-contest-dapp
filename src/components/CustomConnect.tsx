'use client';

import { useAccount, useDisconnect } from 'wagmi';

export default function CustomConnect() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  if (!isConnected) {
    return (
      <button
        className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700 transition"
        onClick={() => window.location.reload()} // rainbowkit handles this normally
      >
        Connect Wallet
      </button>
    );
  }

  return (
    <div className="flex items-center space-x-3">
      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
      <span className="text-sm font-mono">{address.slice(0, 6)}...{address.slice(-4)}</span>
      <button
        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
        onClick={() => disconnect()}
      >
        ✖
      </button>
    </div>
  );
}
