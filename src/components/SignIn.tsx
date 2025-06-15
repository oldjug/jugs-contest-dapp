'use client';

import { useEffect, useState } from 'react';
import { useAccount, useSignMessage } from 'wagmi';

export default function SignIn({ onAuthenticated }: { onAuthenticated: () => void }) {
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signMessageAsync } = useSignMessage();

  const handleSignIn = async () => {
    if (!address) return;

    setLoading(true);
    setError('');

    try {
      const timestamp = new Date().toISOString();
      const message = `Sign in to JugsDrive at ${timestamp}`;
      const signature = await signMessageAsync({ message });

      const res = await fetch('/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, message, signature })
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || 'Sign-in failed');
      }

      const data = await res.json();
      console.log('Sign-in success:', data);
      onAuthenticated();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleSignIn}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? 'Signing in...' : 'Sign In'}
      </button>

      {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
    </div>
  );
}
