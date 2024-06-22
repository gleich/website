import Link from 'next/link';
import styles from '@/ui/viewMore.module.css';
import { Inconsolata } from 'next/font/google';

const inconsolata = Inconsolata({ subsets: ['latin'] });

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
        <button className={`${styles.button} ${inconsolata.className}`}>
          View more on {locationName}
        </button>
      </Link>
    </div>
  );
}
