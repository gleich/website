'use client';

import { exactFromNow } from '@/lib/time';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import styles from '@/app/music-playlist/[id]/lastUpdated.module.css';
import { TextMorph } from '@/ui/motion/textMorph';

export default function LastUpdated({ lastUpdated }: { lastUpdated: Date }) {
  const dayjsLastUpdate = dayjs(lastUpdated);
  const [currentTime, setCurrentTime] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <TextMorph className={styles.lastUpdated}>
      {`Last updated ${exactFromNow(dayjsLastUpdate, currentTime)}`}
    </TextMorph>
  );
}
