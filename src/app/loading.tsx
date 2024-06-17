import mainStyles from './page.module.css';
import styles from './loading.module.css';
import Logo from '@/ui/root/header/logo';

export default async function Loading() {
  return (
    <div className={styles.loading}>
      <Logo className={styles.logo} />
    </div>
  );
}
