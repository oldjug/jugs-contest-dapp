'use client';

import React from 'react';
import { Web3Provider } from '@/components/Web3Provider'; // wraps Wagmi, RainbowKit, etc.

import CustomConnect from '@/components/CustomConnect';
import ClaimButton from '@/components/ClaimButton';
import DictionarySearch from '@/components/DictionarySearch';
import JugsBalanceBox from '@/components/JugsBalanceBox';
import ClaimableJugsBox from '@/components/ClaimableJugsBox';
import DrumDepositsBox from '@/components/DrumDepositsBox';
import BuyJugsBox from '@/components/BuyJugsBox';

export default function HomePage() {
  return (
    <Web3Provider>
      <main className="min-h-screen bg-black text-white p-6 space-y-12">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">JugsDrive DApp</h1>
          <CustomConnect />
        </header>

        <section>
          <ClaimButton />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <JugsBalanceBox />
          <ClaimableJugsBox />
          <DrumDepositsBox />
          <BuyJugsBox />
        </section>

        <section>
          <DictionarySearch />
        </section>
      </main>
    </Web3Provider>
  );
}
