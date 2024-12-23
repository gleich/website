'use client';

import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import styles from './time.module.css';
import { TextMorph } from '@/ui/motion/textMorph';

function getNumberWithOrdinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}

export default function Time() {
  const [currentTime, setCurrentTime] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <p className={styles.time}>
        {currentTime.format('dddd, MMMM D')}
        <sup className={styles.ordinal}>
          {getNumberWithOrdinal(currentTime.date())}
        </sup>
        , {currentTime.format('YYYY')}
      </p>
      <TextMorph className={styles.time}>
        {currentTime.format('h:mm:ss A')}
      </TextMorph>
    </div>
  );
}
