import styles from '@/ui/section/liveSection.module.css';
import { ReactNode } from 'react';

export default function Section({
  name,
  children,
}: {
  name: string;
  children: ReactNode;
}) {
  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{name}</h2>
      </div>
      {children}
    </div>
  );
}
