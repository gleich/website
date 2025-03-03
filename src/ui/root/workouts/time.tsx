'use client';

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import styles from '@/ui/root/workouts/time.module.css';
import { exactFromNow } from '@/lib/time';
import localFont from 'next/font/local';

const ibmPlexMonoRegular = localFont({
  src: '../../../../public/fonts/ibm_plex_mono/regular.otf',
});

dayjs.extend(duration);
dayjs.extend(timezone);
dayjs.extend(utc);

export default function Time({ date, tz }: { date: Date; tz?: string }) {
  const [currentTime, setCurrentTime] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 20);
    return () => clearInterval(interval);
  }, []);

  let dayjsDate = dayjs(date).local();
  if (tz) {
    dayjsDate = dayjsDate.tz(tz.split(' ')[1]);
  }
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
    dayOfWeek = dayjsDate.format('dddd, MMM D');
  }
  return (
    <p
      className={`${styles.time} ${ibmPlexMonoRegular.className}`}
      suppressHydrationWarning
    >
      {dayjsDate.format(`[${dayOfWeek}] [-] h:mm A`)} [
      {exactFromNow(dayjsDate, currentTime)}]
    </p>
  );
}
