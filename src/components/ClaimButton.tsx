'use client';

import { useState } from 'react';
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { parseAbi } from 'viem';

const CONTRACT_ADDRESS = '0xYourJugsContractAddressHere';
const CONTRACT_ABI = parseAbi([
  'function claim() public'
]);

export default function ClaimButton() {
  const { address } = useAccount();
  const [claimed, setClaimed] = useState(false);

  const { config } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'claim',
    account: address,
  });

  const { write, isLoading, isSuccess, error } = useContractWrite({
    ...config,
    onSuccess: () => setClaimed(true),
  });

  return (
    <div className="mt-4">
      <button
        onClick={() => write?.()}
        disabled={!write || isLoading || claimed}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {isLoading ? 'Claiming...' : claimed ? 'Already Claimed' : 'Claim JUGS Token'}
      </button>
      {error && <div className="text-red-500 mt-2">{error.message}</div>}
      {isSuccess && <div className="text-green-500 mt-2">Claim successful!</div>}
    </div>
  );
}