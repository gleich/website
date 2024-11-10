'use client';

import { useEffect, useState } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';
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

  const data = hrData.map((v) => ({ heartrate: v }));
  const min = Math.min(...hrData);
  const max = Math.max(...hrData);
  const range = max - min;

  return (
    <div className={styles.container}>
      <div className={styles.chartWrapper}>
        <div
          className={`${styles.placeholder} ${isClient ? styles.hidden : ''}`}
        >
          <p className={styles.placeholderText}>Loading heartrate data</p>
        </div>
        <div
          className={`${styles.chartContainer} ${!isClient ? styles.hidden : ''}`}
        >
          <ResponsiveContainer width="100%" aspect={500 / 240}>
            <LineChart data={data}>
              <CartesianGrid stroke="#424242" strokeDasharray="3 3" />
              <Line
                type="basis"
                dataKey="heartrate"
                stroke="#ff4245"
                dot={false}
                animationDuration={10000}
                animationEasing="linear"
                strokeWidth={1.8}
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
              <XAxis interval={2} tick={false} height={0} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <p className={`${styles.name} ${ibmPlexMono.className}`}>
        heartrate data in bpm
      </p>
    </div>
  );
}
