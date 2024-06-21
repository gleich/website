'use client';

import dayjs from 'dayjs';
import styles from '@/ui/root/workouts/time.module.css';

export default function Time({ date }: { date: Date }) {
  const dayjsDate = dayjs(date);
  return (
    <p className={styles.time}>{dayjsDate.format('MM/DD/YYYY [@] h:MM A')}</p>
  );
}
