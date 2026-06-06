import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display, Caveat } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-caveat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'A Special Message For You ✨',
  description: 'Something magical is waiting for you...',
  openGraph: {
    title: 'A Special Message For You ✨',
    description: "Open this when you're ready for something magical...",
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'A Special Message For You ✨',
    description: 'Something magical is waiting for you...',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${caveat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
