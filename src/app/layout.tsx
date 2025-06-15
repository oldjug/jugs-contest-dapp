// src/app/layout.tsx

import './globals.css';
import { Web3Provider } from '@/components/Web3Provider';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jugs Contest DApp',
  description: 'Earn JUGS tokens daily by completing tasks and logging in with your wallet.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Web3Provider>
          {children}
        </Web3Provider>
      </body>
    </html>
  );
}