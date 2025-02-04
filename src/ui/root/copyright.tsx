'use client';

import Link from 'next/link';
import styles from '@/ui/root/copyright.module.css';

export default function Copyright() {
  return (
    <div className={styles.copyright}>
      {/* <Image
        src="/icons/usa.svg"
        alt="United States Flag"
        width={23.25}
        height={16.25}
      /> */}
      <p className={styles.name}>
        <span className={styles.symbol}>©</span> Matt Gleich{' '}
        {new Date().getFullYear()}
      </p>
      <p>
        <Link href="https://github.com/gleich/website" target="_blank">
          gleich/website
        </Link>
      </p>
    </div>
  );
}
