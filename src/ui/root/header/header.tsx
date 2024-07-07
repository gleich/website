import styles from '@/ui/root/header/header.module.css';
import Logo from './logo';
import Social from './social';
import Description from './description';

export default function Header() {
  return (
    <div className={styles.root}>
      <div className={styles.personal}>
        <div className={styles.nameAndDescription}>
          <h1 className={styles.name}>Matt Gleich</h1>
          <Description />
        </div>
        <Logo className={styles.logo} />
      </div>
      <div className={styles.socials}>
        <Social name="github" href="https://github.com/gleich" />
        <Social
          name="instagram"
          href="https://www.instagram.com/mattglei.ch/"
        />
        <Social
          name="strava"
          href="https://www.strava.com/athletes/mattgleich"
        />
        <Social
          name="linkedin"
          href="https://www.linkedin.com/in/matt-gleich/"
        />
      </div>
    </div>
  );
}
