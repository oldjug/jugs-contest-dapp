'use client'

import ConnectWallet from '@/components/ConnectWallet'

export default function LandingPage() {
  return (
    <div
      className="h-screen w-full flex flex-col items-center justify-center bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: "url('/landing-jugsdrive-v2.png')" }}
    >
      <div className="bg-black/70 p-8 rounded-xl shadow-xl text-center">
        <h1 className="text-4xl font-bold mb-4">🎰 JugsDrive Contest dApp</h1>
        <p className="text-lg mb-6">Unlock to Win · Invite to Earn · Claim Daily</p>
        <ConnectWallet />
      </div>
    </div>
  )
}
