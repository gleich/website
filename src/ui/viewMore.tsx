import Link from 'next/link';
import styles from '@/ui/viewMore.module.css';

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
        <button className={styles.button}>View more on {locationName}</button>
      </Link>
    </div>
  );
}
