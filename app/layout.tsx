import type { Metadata } from 'next';
import { Saira } from 'next/font/google';
import './globals.css';
import TopNav from '@/components/layout/TopNav';

const saira = Saira({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '600', '700'],
  variable: '--font-saira',
});

export const metadata: Metadata = {
  title: 'FreightPOP — Track',
  description: 'FreightPOP Tracking Agent Prototype',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full antialiased ${saira.variable}`}>
      <body className="h-full flex flex-col" style={{ fontFamily: 'var(--font-saira), sans-serif', fontWeight: 100 }}>
        <TopNav />
        {children}
      </body>
    </html>
  );
}
