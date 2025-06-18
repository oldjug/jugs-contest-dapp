'use client';

import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ConnectWallet } from '@/components/ConnectWallet';
import ClaimButton from '@/components/ClaimButton'; ✅

import DictionarySearch from '@/components/DictionarySearch';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white p-6 space-y-12">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">JugsDrive DApp</h1>
        <ConnectButton />
      </header>

      <section>
        <ConnectWallet />
      </section>

      <section>
        <ClaimButton />
      </section>

      <section>
        <DictionarySearch />
      </section>
    </main>
  );
}
