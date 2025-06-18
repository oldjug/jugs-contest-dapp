'use client';

import React, { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import { parseAbi } from 'viem';
import { Tooltip } from 'react-tooltip';

const CONTRACT_ADDRESS = '0xYourRealJugsContractHere'; // Replace with actual address
const CONTRACT_ABI = parseAbi(['function claim() public']);

export default function ClaimButton() {
  const { address } = useAccount();
  const [claimed, setClaimed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { writeContractAsync } = useWriteContract();

  const handleClaim = async () => {
    try {
      setLoading(true);
      setError(null);
      await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'claim',
        account: address,
      });
      setClaimed(true);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Transaction failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <button
        onClick={handleClaim}
        disabled={loading || claimed || !address}
        data-tooltip-id="claim-tooltip"
        data-tooltip-content="You can claim JUGS once per wallet after completing required tasks. 🎯"
        className={`px-6 py-3 rounded-md font-semibold transition-all duration-200
          relative
          ${loading || claimed || !address
            ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
            : 'bg-yellow-500 text-black hover:bg-yellow-400 active:bg-yellow-600'}
          ${!claimed && !loading && address ? 'animate-pulse' : ''}`}
      >
        🎁 {loading
          ? 'Claiming...'
          : claimed
          ? 'Already Claimed'
          : 'Claim JUGS Token'}
      </button>

      <Tooltip id="claim-tooltip" className="z-50 text-xs" />

      {error && (
        <div className="mt-2 text-sm text-red-400 font-medium">{error}</div>
      )}
      {success && (
        <div className="mt-2 text-sm text-green-400 font-medium">Claim successful!</div>
      )}
    </div>
  );
}
