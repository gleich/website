import styles from '@/ui/section.module.css';
import { ReactNode } from 'react';

export default function Section({
  name,
  description,
  children,
}: {
  name: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className={styles.section}>
      <h2 className={styles.title}>{name}</h2>
      <p className={styles.description}>{description}</p>
      {children}
    </div>
  );
}
