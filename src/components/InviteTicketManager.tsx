'use client';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

export default function InviteTicketManager() {
  const { isConnected } = useAccount();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted || !isConnected) return null;

  return (
    <div className="bg-gray-950 p-4 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold mb-2">🎟️ Invite Ticket System</h2>
      <p className="text-sm text-gray-300 mb-2">
        Send a unique NFT ticket to invite friends. Both users get JUGS rewards when redeemed.
      </p>
      {/* Replace with ticket generation + redemption logic */}
      <button className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded">
        Generate Invite Ticket
      </button>
    </div>
  );
}