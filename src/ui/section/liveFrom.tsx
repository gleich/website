'use client';

import styles from '@/ui/section/liveFrom.module.css';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Inconsolata } from 'next/font/google';

dayjs.extend(relativeTime);
const inconsolata = Inconsolata({ subsets: ['latin'] });

export default function LiveFrom({
  source,
  lastUpdated,
}: {
  source: string;
  lastUpdated: Date;
}) {
  const updatedAgo = dayjs(lastUpdated).fromNow();
  return (
    <div className={`${styles.liveFrom} ${inconsolata.className}`}>
      <div className={styles.title}>
        <span className={styles.liveCircle} />
        <p>LIVE from {source}</p>
      </div>
    </div>
  );
}
