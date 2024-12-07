'use client';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import styles from '@/ui/section/updated.module.css';
import { Inconsolata } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { exactFromNow } from '@/lib/time';

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);

const inconsolata = Inconsolata({ subsets: ['latin'] });

export function Updated({ lastUpdated }: { lastUpdated: Date }) {
  const dayjsLastUpdate = dayjs(lastUpdated);
  const [currentTime, setCurrentTime] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  let lastUpdateExact;
  if (dayjsLastUpdate.isSame(currentTime, 'day')) {
    lastUpdateExact = `today at ${dayjsLastUpdate.format('h:mm A')}`;
  } else if (dayjsLastUpdate.isSame(currentTime.subtract(1, 'day'), 'day')) {
    lastUpdateExact = `yesterday at ${dayjsLastUpdate.format('h:mm A')}`;
  } else {
    lastUpdateExact = dayjsLastUpdate.format('MMMM Do YYYY [@] h:mm A');
  }

  return (
    <div
      className={`${styles.lastUpdated} ${inconsolata.className}`}
      suppressHydrationWarning
    >
      <p className={styles.cachedAndProcessed}>
        <Image
          src="/icons/hard-drive.svg"
          alt="Hard Drive Icon"
          height={15}
          width={15}
        />
        <span>
          Cached & processed by{' '}
          <Link href="/lcp" className={styles.link}>
            lcp
          </Link>
        </span>
      </p>
      <p>
        Updated{' '}
        <span className={styles.lastUpdateExact}>{lastUpdateExact} [</span>
        {exactFromNow(dayjsLastUpdate, currentTime)}
        <span className={styles.lastUpdateExact}>]</span>
      </p>
    </div>
  );
}
