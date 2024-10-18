import { loadStravaData } from '@/lib/lcp/strava';
import Graph from '@/ui/root/workouts/graph';
import styles from './page.module.css';

export default async function Test() {
  const stravaData = await loadStravaData();

  return (
    <main className={styles.main}>
      <Graph hrData={stravaData.data[0].heartrate_data} />
    </main>
  );
}
