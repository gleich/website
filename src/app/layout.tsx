import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'] });

const title = 'Matt Gleich';
const description =
  'College student @ RIT (Rochester Institute of Technology), software engineer, cyclist, and photographer';
const ogImage = {
  url: 'https://mattglei.ch/opengraph.png',
  width: 1200,
  height: 630,
};

export const metadata: Metadata = {
  title: title,
  description: description,
  icons: [
    { rel: 'apple-touch-icon', url: '/apple-touch-icon.png', sizes: '180x180' },
    { rel: 'icon', url: '/favicon-32x32.png', sizes: '32x32' },
    { rel: 'icon', url: '/favicon-16x16.png', sizes: '16x16' },
    { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#1C1E20' },
    { rel: 'icon', url: '/favicon.ico' },
  ],
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
    siteName: 'mattglei.ch',
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
