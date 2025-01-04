import Link from 'next/link';
import styles from './button.module.css';

export default function Button({ text, href }: { text: string; href: string }) {
  return (
    <div className={styles.container}>
      <Link href={href} target="_blank">
        <button className={styles.button}>{text}</button>
      </Link>
    </div>
  );
}
