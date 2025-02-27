import styles from '@/ui/stats.module.css';
import localFont from 'next/font/local';

const ibmPlexMonoBold = localFont({
  src: '../../public/fonts/ibm_plex_mono/bold.ttf',
});

const ibmPlexMonoMedium = localFont({
  src: '../../public/fonts/ibm_plex_mono/medium.otf',
});

export default function Stats({
  stats,
  className,
}: {
  stats: Map<string, string>;
  className?: string | undefined;
}) {
  return (
    <div className={`${className} ${styles.stats}`}>
      {[...stats.keys()].map((k) => (
        <div className={styles.stat} key={k}>
          <p className={`${styles.value} ${ibmPlexMonoBold.className}`}>
            {stats.get(k)}
          </p>
          <p className={`${styles.valueName} ${ibmPlexMonoMedium.className}`}>
            {k}
          </p>
        </div>
      ))}
    </div>
  );
}
