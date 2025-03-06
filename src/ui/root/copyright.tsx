'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './copyright.module.css';

export default function Copyright() {
  return (
    <footer className={styles.copyright}>
      <Image
        src="/icons/usa.svg"
        alt="United States Flag"
        width={23.25}
        height={16.25}
      />
      <p className={styles.name}>
        <span>©</span> Matt Gleich {new Date().getFullYear()}
      </p>
      <Link href="https://github.com/gleich/website" target="_blank">
        gleich/website
      </Link>
    </footer>
  );
}
