'use client';

import dayjs from 'dayjs';

export default function Title({
  sportName,
  date,
}: {
  sportName: string;
  date: Date;
}) {
  const dayjsDate = dayjs(date);
  return (
    <p>
      {sportName} on {dayjsDate.format('MM/DD/YYYY [@] h:MM A')}
    </p>
  );
}
