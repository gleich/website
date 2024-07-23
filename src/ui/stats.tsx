import { Inconsolata } from 'next/font/google';
import styles from '@/ui/stats.module.css';

const inconsolata = Inconsolata({ subsets: ['latin'] });

export default function Stats({ stats }: { stats: Map<string, string> }) {
  return (
    <div className={`${styles.stats} ${inconsolata.className}`}>
      {[...stats.keys()].map((k) => (
        <div className={styles.stat} key={k}>
          <p className={styles.value}>{stats.get(k)}</p>
          <p className={styles.valueName}>{k}</p>
        </div>
      ))}
    </div>
  );
}
