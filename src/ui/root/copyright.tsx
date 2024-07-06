'use client';

import Link from 'next/link';
import styles from '@/ui/root/copyright.module.css';
import { IBM_Plex_Mono } from 'next/font/google';

const ibmPlexMono = IBM_Plex_Mono({
  weight: '700',
  subsets: ['latin'],
  style: 'italic',
});

export default function Copyright() {
  return (
    <div className={`${styles.copyright} ${ibmPlexMono.className}`}>
      © Matt Gleich {new Date().getFullYear()} ·{' '}
      <Link href="https://github.com/gleich/website" target="_blank">
        gleich/website
      </Link>
    </div>
  );
}
