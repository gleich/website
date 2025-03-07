import styles from '@/ui/root/header/header.module.css';
import Logo from './logo';
import Description from './description';
import Socials from './social';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Header() {
  return (
    <div className={styles.root}>
      <div className={styles.personal}>
        <div className={styles.nameAndDescription}>
          <h1 className={`${inter.className} ${styles.name}`}>Matt Gleich</h1>
          <Description fontSize={17} />
        </div>
        <Logo className={styles.logo} />
      </div>
      <div className={styles.socials}>
        <Socials />
      </div>
    </div>
  );
}
