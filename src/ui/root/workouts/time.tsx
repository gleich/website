'use client';

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import styles from '@/ui/root/workouts/time.module.css';
import { exactFromNow } from '@/lib/time';
import localFont from 'next/font/local';

const ibmPlexMonoRegular = localFont({
  src: '../../../../public/fonts/ibm_plex_mono/regular.otf',
});

export default function Time({ date, tz }: { date: Date; tz: string }) {
  const timezone = tz.split(' ')[1];
  const [now, setNow] = useState(dayjs().tz(timezone));

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(dayjs().tz(timezone));
    }, 10);
    return () => clearInterval(interval);
  }, [timezone]);

  const dayjsDate = dayjs(date).tz(timezone);
  const yesterday = now.subtract(1, 'day');
  let dayOfWeek: string;
  if (
    now.date() == dayjsDate.date() &&
    now.year() == dayjsDate.year() &&
    now.month() == dayjsDate.month()
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
      {dayjsDate.format(`[${dayOfWeek}] [@] h:mm A`)} [
      {exactFromNow(dayjsDate, now)}]
    </p>
  );
}
