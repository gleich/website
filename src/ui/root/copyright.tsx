'use client';

import Link from 'next/link';
import styles from '@/ui/root/copyright.module.css';

export default function Copyright() {
  return (
    <div className={styles.copyright}>
      © Matt Gleich {new Date().getFullYear()} ·{' '}
      <Link href="https://github.com/gleich/website" target="_blank">
        gleich/website
      </Link>
    </div>
  );
}
