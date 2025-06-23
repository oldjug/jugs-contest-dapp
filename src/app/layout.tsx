'use client'

import ProtectedRoute from '../components/ProtectedRoute'
import WalletInfoCard from '../components/WalletInfoCard'
import InviteTicketManager from '../components/InviteTicketManager'
import ClaimDrumBox from '../components/DrumDepositsBox'
import DictionarySearchBar from '../components/DictionarySearchBar'

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-black text-white p-4 space-y-6">
        <h1 className="text-3xl font-bold">JugsDrive DApp</h1>

        <WalletInfoCard />
        <InviteTicketManager />
        <ClaimDrumBox />

        <section>
          <h2 className="text-xl font-semibold">Web3 Dictionary</h2>
          <DictionarySearchBar />
        </section>
      </main>
    </ProtectedRoute>
  )
}
