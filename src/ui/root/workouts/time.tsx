'use client';

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import styles from '@/ui/root/workouts/time.module.css';
import { exactFromNow } from '@/lib/time';
import localFont from 'next/font/local';

const ibmPlexMonoRegular = localFont({
  src: '../../../../public/fonts/ibm_plex_mono/regular.otf',
});

dayjs.extend(utc);

export default function Time({ date }: { date: Date }) {
  const [currentTime, setCurrentTime] = useState(dayjs().local());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs().local());
    }, 10);
    return () => clearInterval(interval);
  }, []);

  const dayjsDate = dayjs.utc(date).local();
  const yesterday = currentTime.subtract(1, 'day');
  console.log(dayjsDate.format());
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
