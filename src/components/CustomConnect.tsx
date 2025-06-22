'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function CustomConnect() {
  return (
    <div className="flex justify-center my-6">
      <ConnectButton
        accountStatus="avatar"
        showBalance={false}
        chainStatus="icon"
      />
    </div>
  );
}
