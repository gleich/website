import styles from '@/ui/root/activities/stat.module.css';
import Image from 'next/image';

export default function Stat({
  icon,
  name,
  value,
}: {
  icon: string;
  name: string;
  value: string;
}) {
  return (
    <div className={styles.stat}>
      <Image
        src={`/icons/activities/${icon}`}
        alt={name}
        width={18}
        height={18}
        className={styles.icon}
      />
      <p className={styles.name}>{name}:</p>
      <p className={styles.value}>{value}</p>
    </div>
  );
}
