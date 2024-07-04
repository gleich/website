'use client';

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import timezone from 'dayjs/plugin/timezone';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import utc from 'dayjs/plugin/utc';
import styles from '@/ui/root/workouts/time.module.css';
import { Inconsolata } from 'next/font/google';

const inconsolata = Inconsolata({ subsets: ['latin'] });

dayjs.extend(duration);
dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(advancedFormat);

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
    fromNow = `${daysDiff} ${daysDiff === 1 ? 'day' : 'days'} & ${hoursDiff}h`;
  } else if (hoursDiff > 0) {
    fromNow = `${hoursDiff}h & ${minutesDiff}m`;
  } else if (minutesDiff > 0) {
    fromNow = `${minutesDiff}m & ${secondsDiff}s`;
  } else {
    fromNow = `${secondsDiff}s`;
  }

  return (
    <p className={`${styles.time} ${inconsolata.className}`}>
      {dayjsDate.format(`MMMM Do [@] h:mm A`)} · {fromNow} ago
    </p>
  );
}
