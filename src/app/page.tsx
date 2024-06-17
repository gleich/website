import styles from './page.module.css';
import Header from '@/ui/root/header/header';
import Link from 'next/link';
import Cache from '@/ui/cache';
import { loadStravaData } from '@/lib/strava';
import { loadSteamData } from '@/lib/steam';
import Games from '@/ui/root/games';
import Activities from '@/ui/root/activities/activities';
import { Suspense } from 'react';
import { setTimeout } from 'timers/promises';

export default async function Home() {
  const stravaData = await loadStravaData();
  const steamData = await loadSteamData();
  await setTimeout(50000);
  return (
    <main className={styles.main}>
      <Header />

      <div>
        <p className={styles.introduction}>
          Hey! I&apos;m Matt Gleich, a college student attending the{' '}
          <Link href="https://rit.edu" target="_blank">
            Rochester Institute of Technology (RIT)
          </Link>
          . I&apos;m studying computer science and in my free I really enjoy
          cycling (gravel, road, & mountain bike) and photography. <br />
          <br />
          This website pulls in a bunch of data automatically from my proxy
          cache api built in rust (
          <Link href="https://github.com/gleich/lcp" target="_blank">
            gleich/lcp
          </Link>
          )! Here is the status of each cache:
        </p>
        <div className={styles.caches}>
          <Cache name="Strava" lastUpdate={stravaData.last_updated} />
          <Cache name="Steam" lastUpdate={steamData.last_updated} />
        </div>
      </div>

      <div className={styles.sections}>
        <Suspense>
          <Activities activities={stravaData.data} />
        </Suspense>
        <Suspense>
          <Games games={steamData.data} />
        </Suspense>
      </div>
    </main>
  );
}
