import styles from '@/ui/section/section.module.css';
import { Inconsolata } from 'next/font/google';
import Link from 'next/link';
import { ReactNode } from 'react';
import { LastUpdated } from './lastUpdated';

const inconsolata = Inconsolata({ subsets: ['latin'] });

export default function Section({
  name,
  source,
  sourceURL,
  lastUpdated,
  children,
}: {
  name: string;
  source: string;
  sourceURL: string;
  lastUpdated: Date;
  children: ReactNode;
}) {
  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{name}</h2>
        <div className={`${styles.liveFrom} ${inconsolata.className}`}>
          <div className={styles.liveFromTitle}>
            <span className={styles.liveCircle} />
            <p>
              LIVE from{' '}
              <Link
                className={styles.liveSourceLink}
                href={sourceURL}
                target="_blank"
              >
                {source}
              </Link>
            </p>
          </div>
        </div>
      </div>
      {children}
      <LastUpdated lastUpdated={lastUpdated} />
    </div>
  );
}
