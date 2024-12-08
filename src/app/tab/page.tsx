import styles from '@/app/tab/page.module.css';
import Logo from '@/ui/root/header/logo';
import Time from './time';
import { Metadata } from 'next';
import Copyright from '@/ui/root/copyright';

export const metadata: Metadata = {
  title: 'mattglei.ch',
};

export default function TabPage() {
  return (
    <main className={styles.main}>
      <Logo className={styles.logo} />
      <Time />
      <div className={styles.copyright}>
        <Copyright />
      </div>
    </main>
  );
}
