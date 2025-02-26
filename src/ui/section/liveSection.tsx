import styles from '@/ui/section/liveSection.module.css';
import { Inconsolata, Inter } from 'next/font/google';
import Link from 'next/link';
import { ReactNode } from 'react';
import Card from '../card';
import { Updated } from './updated';
import Image from 'next/image';
import { nanoid } from 'nanoid';

const inconsolata = Inconsolata({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

export interface Source {
  name: string;
  url: string;
  icon: string;
}

export default function LiveSection({
  name,
  sources,
  lastUpdated,
  children,
}: {
  name: string;
  sources: Source[];
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
              <p>
                LIVE FROM {sources.map((s) => s.name.toUpperCase()).join('/')}
              </p>
              <div className={styles.logoIcons}>
                {sources.map((s) => (
                  <Link
                    key={nanoid()}
                    className={styles.liveSourceLink}
                    href={s.url}
                    target="_blank"
                  >
                    <Image
                      src={`/icons/logos/${s.icon}`}
                      alt={name}
                      height={16}
                      width={16}
                      className={styles.logoIcon}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        {children}
        <Updated lastUpdated={lastUpdated} />
      </Card>
    </section>
  );
}
