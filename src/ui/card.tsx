import { ReactNode } from 'react';
import styles from '@/ui/card.module.css';

export default function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string | undefined;
}) {
  return <div className={`${styles.card} ${className}`}>{children}</div>;
}
