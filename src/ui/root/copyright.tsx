'use client';

import Link from 'next/link';
import styles from '@/ui/root/copyright.module.css';
import localFont from 'next/font/local';
import Image from 'next/image';

const ibmPlexMono = localFont({
  src: '../../../public/fonts/ibm_plex_mono/bold.ttf',
});

export default function Copyright() {
  return (
    <div className={`${styles.copyright} ${ibmPlexMono.className}`}>
      <Image
        src="/icons/usa.svg"
        alt="United States Flag"
        width={23.25}
        height={16.25}
      />
      <p className={styles.name}>© Matt Gleich {new Date().getFullYear()}</p>
      <p>
        <Link href="https://github.com/gleich/website" target="_blank">
          gleich/website
        </Link>
      </p>
    </div>
  );
}
