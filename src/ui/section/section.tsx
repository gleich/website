import styles from '@/ui/section/section.module.css';
import { ReactNode } from 'react';
import LiveFrom from './liveFrom';

export default function Section({
  name,
  description,
  source,
  lastUpdated,
  children,
}: {
  name: string;
  description: string;
  source: string;
  lastUpdated: Date;
  children: ReactNode;
}) {
  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{name}</h2>
        <LiveFrom source={source} lastUpdated={lastUpdated} />
      </div>
      <p className={styles.description}>{description}</p>
      {children}
    </div>
  );
}
