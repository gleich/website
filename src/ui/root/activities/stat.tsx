import styles from '@/ui/root/activities/stat.module.css';
import Image from 'next/image';

export default function Stat({ name, value }: { name: string; value: string }) {
  return (
    <div className={styles.stat}>
      <p className={styles.value}>{value}</p>
      <p className={styles.name}>{name}</p>
    </div>
  );
}
