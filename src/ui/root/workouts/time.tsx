'use client';

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import timezone from 'dayjs/plugin/timezone';
import styles from '@/ui/root/workouts/time.module.css';

dayjs.extend(duration);
dayjs.extend(timezone);

export default function Time({ date, tz }: { date: Date; tz: string }) {
  const [currentTime, setCurrentTime] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const dayjsDate = dayjs(date).tz(tz.split(' ')[1]);
  const diff = dayjs.duration(dayjsDate.diff(currentTime));
  const daysDiff = Math.abs(Number(diff.format('D')));
  const hoursDiff = Math.abs(Number(diff.format('H')));
  const minutesDiff = Math.abs(Number(diff.format('m')));
  const secondsDiff = Math.abs(Number(diff.format('s')));
  let fromNow: string;

  if (daysDiff > 0) {
    fromNow =
      `${daysDiff} ` +
      (daysDiff === 1 ? 'day' : 'days') +
      ' & ' +
      `${hoursDiff}h`;
  } else if (minutesDiff > 0 && daysDiff < 1) {
    fromNow = `${hoursDiff}h` + ' & ' + `${minutesDiff}m`;
  } else if (minutesDiff > 0 && hoursDiff < 1) {
    fromNow = `${minutesDiff}m` + ' & ' + `${secondsDiff}s`;
  } else {
    fromNow = `${secondsDiff}`;
  }

  return (
    <p className={styles.time}>
      {dayjsDate.format('MM/DD/YYYY [@] h:mm A')} <br />
      {fromNow} ago
    </p>
  );
}
