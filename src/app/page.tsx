import styles from './page.module.css';
import Header from '@/ui/root/header/header';
import Link from 'next/link';
import Games from '@/ui/root/games';
import Activities from '@/ui/root/activities/activities';
import Copyright from '@/ui/root/copyright';

export default async function Home() {
  return (
    <>
      <main className={styles.main}>
        <Header />

        <div>
          <p className={styles.introduction}>
            Hey! I&apos;m Matt Gleich, a college student attending the{' '}
            <Link href="https://rit.edu" target="_blank">
              Rochester Institute of Technology (RIT)
            </Link>
            . I&apos;m studying computer science and in my free I really enjoy
            cycling (gravel, road, & mountain bike) and photography. Below are a
            few sections featuring parts of who I am!
            <br />
          </p>
        </div>

        <div className={styles.sections}>
          <Activities />
          <Games />
        </div>
      </main>
      <Copyright />
    </>
  );
}
