'use client';

import { exactFromNow } from '@/lib/time';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import styles from './lastUpdated.module.css';

export default function LastUpdated({ lastUpdated }: { lastUpdated: Date }) {
  const dayjsLastUpdate = dayjs(lastUpdated);
  const [currentTime, setCurrentTime] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 10);
    return () => clearInterval(interval);
  }, []);

  return (
    <p className={styles.lastUpdated}>
      {`Last updated ${exactFromNow(dayjsLastUpdate, currentTime)}`}
    </p>
  );
}
