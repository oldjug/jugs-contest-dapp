'use client';

import { useAccount } from 'wagmi';
import ActiveWalletCount from '@/components/ui/ActiveWalletCount';
import DictionarySearchBar from '@/components/ui/DictionarySearchBar';
import ConnectWalletButton from '@/components/ui/ConnectWalletButton';
import ClientOnly from '@/components/ui/ClientOnly';

export default function LandingPage() {
  const { isConnected } = useAccount();

  return (
    <div className="relative w-screen h-screen overflow-hidden text-white bg-black">
      <img
        src="/landing-jugsdrive.png"
        alt="Background"
        className="fixed inset-0 w-full h-full object-cover object-center z-[-10]"
      />

      <ClientOnly>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-4 space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">
            JugsDrive Contest dApp
          </h1>
          <p className="text-lg md:text-xl drop-shadow-md">
            Connect to Win • Earn Daily • Invite Friends
          </p>

          <div className="text-base">
            {isConnected ? 'Wallet connected!' : 'Connect your wallet to begin.'}
          </div>

          <div className="w-full max-w-md space-y-4">
            <ConnectWalletButton />
            <ActiveWalletCount />
            <DictionarySearchBar />
          </div>
        </div>
      </ClientOnly>
    </div>
  );
}
