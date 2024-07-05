import styles from '@/ui/section/liveSection.module.css';
import { ReactNode } from 'react';
import Card from '../card';

export default function Section({
  name,
  children,
}: {
  name: string;
  children: ReactNode;
}) {
  return (
    <div className={styles.section}>
      <Card className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.title}>{name}</h2>
        </div>
        {children}
      </Card>
    </div>
  );
}
