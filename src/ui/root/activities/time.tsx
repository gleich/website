'use client';

import dayjs from 'dayjs';

export default function Time({ date }: { date: Date }) {
  const dayjsDate = dayjs(date);
  return (
    <p style={{ color: 'grey' }}>{dayjsDate.format('MM/DD/YYYY [@] h:MM A')}</p>
  );
}
