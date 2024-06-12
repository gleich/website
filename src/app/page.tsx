import styles from './page.module.css';
import Header from '@/ui/root/header/header';
import Link from 'next/link';
import Cache from '@/ui/cache';
import { loadStravaData } from '@/lib/strava';
import { loadSteamData } from '@/lib/steam';

export default async function Home() {
  const stravaData = await loadStravaData();
  const steamData = await loadSteamData();
  return (
    <main className={styles.main}>
      <Header />
      <div className={styles.introduction}>
        <p>
          Hey! I&apos;m Matt Gleich, a college student attending the{' '}
          <Link href="https://rit.edu">
            Rochester Institute of Technology (RIT)
          </Link>
          . I&apos;m studying computer science and in my free I really enjoy
          cycling (gravel, road, & mountain bike) and photography. This website
          pulls in a bunch of data automatically from my proxy cache api built
          in rust (<Link href="https://github.com/gleich/lcp">gleich/lcp</Link>
          )! Here is the status of each cache:
        </p>
        <div className={styles.caches}>
          <Cache name="Strava" lastUpdate={stravaData.last_updated} />
          <Cache name="Steam" lastUpdate={steamData.last_updated} />
        </div>
      </div>
    </main>
  );
}
