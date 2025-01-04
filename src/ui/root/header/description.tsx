'use client';

import { useEffect, useState, useMemo } from 'react';
import styles from '@/ui/root/header/description.module.css';
import localFont from 'next/font/local';

const ibmPlexMonoSemiBoldItalic = localFont({
  src: '../../../../public/fonts/ibm_plex_mono/semibold_italic.otf',
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
      className={`${styles.description} ${ibmPlexMonoSemiBoldItalic.className}`}
      style={{ fontSize: `${fontSize}px` }}
    >
      {descriptions[index]}
    </p>
  );
}
