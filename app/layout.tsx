import type { Metadata } from 'next';
import './globals.css';
import TopNav from '@/components/layout/TopNav';

export const metadata: Metadata = {
  title: 'FreightPOP — Track',
  description: 'FreightPOP Tracking Agent Prototype',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="h-full flex flex-col font-sans">
        <TopNav />
        {children}
      </body>
    </html>
  );
}
