'use client';

import { useEffect, useState } from 'react';
import styles from '@/ui/root/nav.module.css';
import Logo from './header/logo';
import Description from './header/description';
import Socials from './header/social';
import Link from 'next/link';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Nav({
  maxWidth,
  hide,
  className,
}: {
  maxWidth: number;
  hide?: boolean;
  className?: string;
}) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setScrollY(window.scrollY);
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const maxHeight = 75;
  const height = Math.min(maxHeight, hide ? scrollY / 2.6 : maxHeight);
  const revealPercentage = height / (maxHeight - 40);
  return (
    <div
      className={`${styles.nav} ${className}`}
      style={{
        position: hide ? 'fixed' : 'sticky',
        height: `${height}px`,
        opacity: `${revealPercentage}`,
        maxWidth: `${maxWidth}px`,
      }}
    >
      <Link href="/" className={styles.link}>
        <Logo className={styles.logo} />
        <div className={styles.nameAndDescription}>
          <h1 className={`${inter.className} ${styles.name}`}>Matt Gleich</h1>
          <Description fontSize={13} />
        </div>
      </Link>
      <div className={styles.socials}>
        <Socials />
      </div>
    </div>
  );
}
