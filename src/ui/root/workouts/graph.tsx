'use client';

import { useEffect, useState } from 'react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import styles from './graph.module.css';
import { IBM_Plex_Mono } from 'next/font/google';

const ibmPlexMono = IBM_Plex_Mono({
  weight: '700',
  subsets: ['latin'],
  style: 'italic',
});

export default function Graph({ hrData }: { hrData: number[] }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const data = hrData.map((v) => ({
    heartrate: v,
  }));

  const min = Math.min(...hrData);
  const max = Math.max(...hrData);
  const range = max - min;

  return (
    <div className={styles.container}>
      {isClient ? (
        <div>
          <LineChart width={430} height={215} data={data}>
            <Line
              type="basis"
              dataKey="heartrate"
              stroke="#ff4245"
              dot={false}
              animationDuration={10000}
              animationEasing="ease-in"
            />
            <YAxis
              type="number"
              domain={[min, max]}
              dataKey="heartrate"
              width={30}
              interval={0}
              ticks={[
                Math.floor(min),
                Math.floor(min + range / 3),
                Math.floor(min + (2 * range) / 3),
                Math.floor(max),
              ]}
              padding={{ bottom: 20, top: 20 }}
            />
            <XAxis interval={3} tick={false} height={0} />
            <CartesianGrid stroke="#424242" strokeDasharray="3 3" />
          </LineChart>
          <p className={`${styles.name} ${ibmPlexMono.className}`}>
            heartrate data in bpm
          </p>
        </div>
      ) : (
        <p>Loading heartrate data</p>
      )}
    </div>
  );
}
