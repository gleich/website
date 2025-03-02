'use client';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import styles from '@/ui/section/updated.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { exactFromNow } from '@/lib/time';
import localFont from 'next/font/local';

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);

const ibmPlexMonoMediumItalic = localFont({
  src: '../../../public/fonts/ibm_plex_mono/medium_italic.otf',
});

const ibmPlexMonoMedium = localFont({
  src: '../../../public/fonts/ibm_plex_mono/medium.otf',
});

export function Updated({ lastUpdated }: { lastUpdated: Date }) {
  const dayjsLastUpdate = dayjs(lastUpdated);
  const [currentTime, setCurrentTime] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 10);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`${styles.lastUpdated} ${ibmPlexMonoMediumItalic.className}`}
      suppressHydrationWarning
    >
      <div className={styles.cachedAndProcessed}>
        <Image
          src="/icons/hard-drive.svg"
          alt="Hard Drive Icon"
          className={styles.icon}
          height={15}
          width={15}
        />
        <p className={styles.text}>
          <span>
            data cached & processed by{' '}
            <Link href="/lcp" className={styles.link}>
              lcp
            </Link>{' '}
          </span>
          <span
            className={`${ibmPlexMonoMedium.className} ${styles.lastUpdateExact}`}
          >
            [{exactFromNow(dayjsLastUpdate, currentTime)}]
          </span>
        </p>
      </div>
    </div>
  );
}
