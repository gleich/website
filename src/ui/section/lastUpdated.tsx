'use client';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import styles from '@/ui/section/lastUpdated.module.css';
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

export function LastUpdated({ lastUpdated }: { lastUpdated: Date }) {
  const dayjsLastUpdate = dayjs(lastUpdated);
  const [currentTime, setCurrentTime] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const lastUpdateExact =
    dayjsLastUpdate.format('MM/DD/YYYY [@] h:mm A [') +
    dayjsLastUpdate.format('z') +
    ']';
  return (
    <div
      className={`${styles.lastUpdated} ${inconsolata.className}`}
      suppressHydrationWarning
    >
      Updated {exactFromNow(dayjsLastUpdate, currentTime)}
      <span className={styles.lastUpdateExact}> · {lastUpdateExact}</span>
      <br />
      <span className={styles.cachedAndProcessed}>
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
      </span>
    </div>
  );
}
