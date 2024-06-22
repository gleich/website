'use client';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import styles from '@/ui/section/lastUpdated.module.css';
import { Inconsolata } from 'next/font/google';
import Link from 'next/link';

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);
const inconsolata = Inconsolata({ subsets: ['latin'] });

export function LastUpdated({ lastUpdated }: { lastUpdated: Date }) {
  const dayjsLastUpdate = dayjs(lastUpdated);
  const lastUpdateExact =
    dayjsLastUpdate.format('MM/DD/YYYY [@] hh:mm A [') +
    dayjsLastUpdate.format('z') +
    ']';
  return (
    <div className={`${styles.lastUpdated} ${inconsolata.className}`}>
      Last updated {dayjsLastUpdate.fromNow()}
      <span className={styles.lastUpdateExact}> · {lastUpdateExact}</span>
      <br />
      <span className={styles.cachedAndServed}>
        Cached & served from{' '}
        <Link
          href="https://github.com/gleich/lcp"
          target="_blank"
          className={styles.link}
        >
          gleich/lcp
        </Link>
      </span>
    </div>
  );
}
