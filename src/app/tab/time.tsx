'use client';

import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import styles from './time.module.css';

dayjs.extend(advancedFormat);

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
      <p className={styles.time}>{currentTime.format('dddd, MMMM Do')}</p>
      <p className={styles.time}>{currentTime.format('h:mm:ss A')}</p>
    </div>
  );
}
