import styles from '@/ui/root/header/header.module.css';
import Logo from './logo';

export default function Header() {
  return (
    <div className={styles.root}>
      <div className={styles.personal}>
        <div className={styles.nameAndDescription}>
          <h1 className={styles.name}>Matt Gleich</h1>
          <p className={styles.description}>photographer</p>
        </div>
        <Logo width="150px" height="auto" />
      </div>
      <div className={styles.socials}></div>
    </div>
  );
}
