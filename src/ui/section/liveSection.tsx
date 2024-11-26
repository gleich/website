import styles from '@/ui/section/liveSection.module.css';
import { Inconsolata, Inter } from 'next/font/google';
import Link from 'next/link';
import { ReactNode } from 'react';
import Card from '../card';
import { LastUpdated } from './lastUpdated';
import Image from 'next/image';

const inconsolata = Inconsolata({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

export default function LiveSection({
  name,
  source,
  sourceURL,
  sourceIcon,
  lastUpdated,
  children,
}: {
  name: string;
  source: string;
  sourceIcon: string;
  sourceURL: string;
  lastUpdated: Date;
  children: ReactNode;
}) {
  return (
    <section className={styles.section}>
      <Card className={styles.card}>
        <div className={styles.header}>
          <h2 className={`${inter.className} ${styles.title}`}>{name}</h2>
          <div className={`${styles.liveFrom} ${inconsolata.className}`}>
            <div className={styles.liveFromTitle}>
              <span className={styles.liveCircle} />
              <p>LIVE FROM</p>
              <Link
                className={styles.liveSourceLink}
                href={sourceURL}
                target="_blank"
              >
                {source.toUpperCase()}
                <Image
                  src={`/icons/logos/${sourceIcon}.svg`}
                  alt={name}
                  height={17}
                  width={17}
                  className={styles.logoIcon}
                />
              </Link>
            </div>
          </div>
        </div>
        {children}
        <LastUpdated lastUpdated={lastUpdated} />
      </Card>
    </section>
  );
}
