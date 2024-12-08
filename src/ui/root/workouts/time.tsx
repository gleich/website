'use client';

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import timezone from 'dayjs/plugin/timezone';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import utc from 'dayjs/plugin/utc';
import styles from '@/ui/root/workouts/time.module.css';
import { Inconsolata } from 'next/font/google';
import { exactFromNow } from '@/lib/time';

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
  const yesterday = currentTime.subtract(1, 'day');
  let dayOfWeek: string;
  if (
    currentTime.date() == dayjsDate.date() &&
    currentTime.year() == dayjsDate.year() &&
    currentTime.month() == dayjsDate.month()
  ) {
    dayOfWeek = 'Today';
  } else if (
    yesterday.date() == dayjsDate.date() &&
    yesterday.year() == dayjsDate.year() &&
    yesterday.month() == dayjsDate.month()
  ) {
    dayOfWeek = 'Yesterday';
  } else {
    dayOfWeek = dayjsDate.format('dddd');
  }
  return (
    <p
      className={`${styles.time} ${inconsolata.className}`}
      suppressHydrationWarning
    >
      {dayjsDate.format(`[${dayOfWeek}], MMM Do [at] h:mm A`)} [
      {exactFromNow(dayjsDate, currentTime)}]
    </p>
  );
}
