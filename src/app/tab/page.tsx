import styles from '@/app/tab/page.module.css';
import Logo from '@/ui/root/header/logo';
import Time from './time';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'mattglei.ch',
};

export default function TabPage() {
  return (
    <main className={styles.main}>
      <Logo className={styles.logo} />
      <div className={styles.text}>
        <Time />
        <p className={styles.siteName}>mattglei.ch</p>
      </div>
    </main>
  );
}
