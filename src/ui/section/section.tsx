import styles from '@/ui/section/liveSection.module.css';
import { ReactNode } from 'react';
import Card from '../card';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Section({
  name,
  children,
}: {
  name: string;
  children: ReactNode;
}) {
  return (
    <section className={styles.section}>
      <Card className={styles.card}>
        <div className={styles.header}>
          <h2 className={`${inter.className} ${styles.title}`}>{name}</h2>
        </div>
        {children}
      </Card>
    </section>
  );
}
