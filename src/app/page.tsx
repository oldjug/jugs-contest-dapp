'use client';

import CustomConnect from '../components/CustomConnect';

export default function HomePage() {
  return (
    <main className="max-w-3xl mx-auto mt-12 px-6 space-y-12">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-transparent bg-clip-text">
          🎉 Welcome to JUGS DRIVE
        </h1>
        <p className="mt-4 text-gray-300">Learn. Earn. Win Crypto Rewards.</p>
      </div>

      <CustomConnect />

      <section className="bg-gray-900 border border-gray-700 p-6 rounded-3xl shadow-lg text-center">
        <h2 className="text-xl font-bold mb-4">Daily Claim</h2>
        <p className="mb-4 text-gray-400">Connect your wallet and get free JUGS tokens every 24 hours.</p>
        <button className="bg-yellow-400 text-black font-semibold px-6 py-2 rounded-xl hover:bg-yellow-500 transition">
          Claim JUGS
        </button>
      </section>

      <section className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-2">Top Referrers</h3>
        <ul className="space-y-1 text-sm text-gray-200">
          <li>👑 0xJuglord...ab12 — 13 invites</li>
          <li>🔥 0xShillKing...44e2 — 9 invites</li>
          <li>💎 0xGainsOnly...fa01 — 6 invites</li>
        </ul>
      </section>
    </main>
  );
}
