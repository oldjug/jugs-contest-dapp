// src/app/layout.tsx
import '@rainbow-me/rainbowkit/styles.css'; 
import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Jugs Contest DApp',
  description: 'Claim JUGS tokens and enter contests.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}