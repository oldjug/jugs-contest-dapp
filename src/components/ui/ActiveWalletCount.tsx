'use client';

import { useEffect, useState } from 'react';

export default function ActiveWalletCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchWalletCount = async () => {
      try {
        const res = await fetch('/api/wallets/active');
        const data = await res.json();
        setCount(data.count);
      } catch (err) {
        console.error('Failed to fetch wallet count:', err);
      }
    };
    fetchWalletCount();
  }, []);

  return (
    <div className="text-white text-sm text-center">
      Active Wallets: {count !== null ? count : '...'}
    </div>
  );
}
