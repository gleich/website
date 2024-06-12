import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'] });

const title = 'Matt Gleich';
const description = 'College student, cyclist, and photographer';
const ogImage = {
  url: 'https://beta.mattglei.ch/opengraph.png',
  width: 1200,
  height: 630,
};

export const metadata: Metadata = {
  title: title,
  description: description,
  authors: [
    {
      name: 'Matt Gleich',
      url: 'https://mattglei.ch',
    },
  ],
  keywords: [
    'Matt Gleich',
    'Matt',
    'Gleich',
    'Matthew Gleich',
    'Matthew',
    'photography',
    'coding',
    'cycling',
    'RIT',
  ],
  openGraph: {
    title: title,
    description: description,
    siteName: title,
    images: [ogImage],
    locale: 'en-US',
    type: 'website',
    url: 'https://mattglei.ch',
  },
  twitter: {
    creator: '@matt_gleich',
    card: 'summary_large_image',
    title: title,
    description: description,
    images: [ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children} <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
