'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function ConnectWalletButton() {
  return (
    <div className="text-center">
      <ConnectButton showBalance={false} />
    </div>
  );
}
