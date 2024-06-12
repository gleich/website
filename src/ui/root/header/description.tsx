'use client';

import { useEffect, useState, useMemo } from 'react';
import styles from '@/ui/root/header/description.module.css';

export default function Description() {
  const descriptions = useMemo(
    () => ['photographer', 'cyclist', 'developer', 'college student'],
    [],
  );

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const cycleTexts = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % descriptions.length);
    }, 2000);

    return () => clearInterval(cycleTexts);
  }, [descriptions]);

  return <p className={styles.description}>{descriptions[index]}</p>;
}
