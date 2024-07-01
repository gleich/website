import styles from '@/app/not-found.module.css';
import Logo from '@/ui/root/header/logo';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className={styles.main}>
      <Logo className={styles.logo} />
      <div>
        <h1>404 Page Not Found</h1>
        <Link href="/">Go to home</Link>
      </div>
    </main>
  );
}
