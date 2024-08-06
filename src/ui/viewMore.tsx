import Link from 'next/link';
import styles from '@/ui/viewMore.module.css';
import { IBM_Plex_Sans, Inconsolata } from 'next/font/google';

const ibmPlexSans = IBM_Plex_Sans({ subsets: ['latin'], weight: '500' });

export default function ViewMore({
  locationName,
  href,
}: {
  locationName: string;
  href: string;
}) {
  return (
    <div className={styles.container}>
      <Link href={href} target="_blank">
        <button className={`${styles.button} ${ibmPlexSans.className}`}>
          View more on {locationName}
        </button>
      </Link>
    </div>
  );
}
