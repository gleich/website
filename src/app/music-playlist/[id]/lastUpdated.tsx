'use client';

import { exactFromNow } from '@/lib/time';
import dayjs from 'dayjs';
import { Inconsolata } from 'next/font/google';
import { useEffect, useState } from 'react';
import styles from '@/app/music-playlist/[id]/lastUpdated.module.css';

const inconsolata = Inconsolata({ subsets: ['latin'] });

export default function LastUpdated({ lastUpdated }: { lastUpdated: Date }) {
  const dayjsLastUpdate = dayjs(lastUpdated);
  const [currentTime, setCurrentTime] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${styles.lastUpdated} ${inconsolata.className}`}>
      Last updated {exactFromNow(dayjsLastUpdate, currentTime)}
    </div>
  );
}
