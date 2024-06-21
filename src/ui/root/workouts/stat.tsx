import styles from '@/ui/root/workouts/stat.module.css';

export default function Stat({ name, value }: { name: string; value: string }) {
  return (
    <div className={styles.stat}>
      <p className={styles.value}>{value}</p>
      <p className={styles.name}>{name}</p>
    </div>
  );
}
