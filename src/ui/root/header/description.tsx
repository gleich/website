'use client';

import { useEffect, useState, useMemo } from 'react';
import styles from '@/ui/root/header/description.module.css';
import { IBM_Plex_Mono } from 'next/font/google';

const ibmPlexMono = IBM_Plex_Mono({
  weight: '700',
  subsets: ['latin'],
  style: 'italic',
});

export default function Description({ fontSize }: { fontSize: number }) {
  const descriptions = useMemo(
    () => [
      'college student @ RIT',
      'software engineer',
      'cyclist',
      'photographer',
    ],
    [],
  );

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const cycleTexts = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % descriptions.length);
    }, 2000);

    return () => clearInterval(cycleTexts);
  }, [descriptions]);

  return (
    <p
      className={`${styles.description} ${ibmPlexMono.className}`}
      style={{ fontSize: `${fontSize}px` }}
    >
      {descriptions[index]}
    </p>
  );
}
