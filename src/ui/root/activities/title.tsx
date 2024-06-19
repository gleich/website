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
    <>
      <style jsx>
        {`
          .name {
            font-weight: bold;
            text-decoration: underline;
          }
        `}
      </style>
      <p>
        <span className="name">{sportName}</span>
        <br />
        {dayjsDate.format('MM/DD/YYYY [@] h:MM A')}
      </p>
    </>
  );
}
