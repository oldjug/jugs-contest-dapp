'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

export default function ConnectWallet() {
  const { isConnected, address } = useAccount();
  const { connect } = useConnect({ connector: new InjectedConnector() });
  const { disconnect } = useDisconnect();

  return (
    <div className="text-center">
      {isConnected ? (
        <>
          <p className="mb-2">Wallet connected: {address?.slice(0, 6)}...{address?.slice(-4)}</p>
          <button
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
            onClick={() => disconnect()}
          >
            Disconnect
          </button>
        </>
      ) : (
        <button
          className="px-6 py-3 bg-orange-600 hover:bg-orange-700 rounded text-white font-bold"
          onClick={() => connect()}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}
