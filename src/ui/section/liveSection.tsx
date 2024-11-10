import styles from '@/ui/section/liveSection.module.css';
import { Inconsolata } from 'next/font/google';
import Link from 'next/link';
import { ReactNode } from 'react';
import Card from '../card';
import { LastUpdated } from './lastUpdated';

const inconsolata = Inconsolata({ subsets: ['latin'] });

export default function LiveSection({
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
    <section className={styles.section}>
      <Card className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.title}>{name}</h2>
          <div className={`${styles.liveFrom} ${inconsolata.className}`}>
            <div className={styles.liveFromTitle}>
              <span className={styles.liveCircle} />
              <p>
                LIVE FROM{' '}
                <Link
                  className={styles.liveSourceLink}
                  href={sourceURL}
                  target="_blank"
                >
                  {source.toUpperCase()}
                </Link>
              </p>
            </div>
          </div>
        </div>
        {children}
        <LastUpdated lastUpdated={lastUpdated} />
      </Card>
    </section>
  );
}
