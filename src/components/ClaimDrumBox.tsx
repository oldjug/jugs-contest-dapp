import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

export default function ClaimDrumBox() {
  const { isConnected } = useAccount();
  const [hasMounted, setHasMounted] = useState(false);
  const [claimStatus, setClaimStatus] = useState<string>('');

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleClaim = () => {
    setClaimStatus('Claimed! 🎉');
  };

  if (!hasMounted || !isConnected) return null;

  return (
    <div className="bg-gray-950 p-4 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold mb-2">🥁 Daily Claim Drum</h2>
      <p className="text-sm text-gray-300 mb-2">Claim your daily JUGS tokens here.</p>
      <button
        className="bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded"
        onClick={handleClaim}
      >
        Claim Now
      </button>
      {claimStatus && <p className="mt-2 text-green-400">{claimStatus}</p>}
    </div>
  );
}
