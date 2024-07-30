'use client';

import Link from 'next/link';
import styles from '@/ui/root/copyright.module.css';
import { IBM_Plex_Mono } from 'next/font/google';
import Image from 'next/image';

const ibmPlexMono = IBM_Plex_Mono({
  weight: '700',
  subsets: ['latin'],
});

export default function Copyright() {
  return (
    <div className={`${styles.copyright} ${ibmPlexMono.className}`}>
      <p className={styles.nameAndFlag}>
        <Image
          src="/icons/usa.svg"
          alt="United States Flag"
          width={23.25}
          height={16.25}
        />
        © Matt Gleich {new Date().getFullYear()}
      </p>
      <p>
        [
        <Link href="https://github.com/gleich/website" target="_blank">
          gleich/website
        </Link>
        ]
      </p>
    </div>
  );
}
