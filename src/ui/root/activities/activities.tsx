import { extractSportType, loadStravaData } from '@/lib/strava';
import Section from '../../section/section';
import styles from '@/ui/root/activities/activities.module.css';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import Image from 'next/image';
import { Inconsolata } from 'next/font/google';
import Stat from './stat';
import Title from './title';
import Link from 'next/link';

const inconsolata = Inconsolata({ subsets: ['latin'] });
dayjs.extend(duration);

export default async function Activities() {
  const stravaData = await loadStravaData();
  const activities = stravaData.data;
  return (
    <Section
      name="Activities"
      source="Strava"
      sourceURL="https://www.strava.com/about"
      lastUpdated={stravaData.last_updated}
    >
      <>
        <p>
          One of my favorite things in the world is staying active and enjoying
          the outdoors. I grew up in New Hampshire hiking, biking, snowshoeing,
          and traveling with my family. Out of all of those things I&apos;ve
          loved cycling mainly through gravel cycling, road cycling, and
          mountain biking. Below are some of my recent activities from{' '}
          <Link href="https://strava.com" target="_blank">
            Strava
          </Link>
          :
        </p>
        <div className={styles.activities}>
          {activities
            .filter((a) => !a.private)
            .slice(0, 2)
            .map((a) => {
              const [sportName, sportIcon] = extractSportType(a.sport_type);

              const movingDuration = dayjs.duration(a.moving_time, 'seconds');
              let formattedDuration: string;
              if (a.moving_time > 3660) {
                formattedDuration = movingDuration.format('H[h] & m[m]');
              } else if (a.moving_time < 3660 && a.moving_time > 3540) {
                formattedDuration = '1h';
              } else {
                formattedDuration = movingDuration.format('m[m] & s[s]');
              }

              let stats = [
                <Stat
                  key="time"
                  icon="clock.svg"
                  name="Time"
                  value={`${formattedDuration}`}
                />,
                <Stat
                  key="distance"
                  icon="compass.svg"
                  name="Distance"
                  value={`${((a.distance * 0.621) / 1000).toPrecision(3)} miles`}
                />,
                <Stat
                  key="heartrate"
                  icon="heart.svg"
                  name="Avg. heartrate"
                  value={`${a.average_heartrate} bpm`}
                />,
                <Stat
                  key="elevation"
                  icon="elevation.svg"
                  name="Elevation gain"
                  value={`${Math.round(a.total_elevation_gain * 3.281)} ft`}
                />,
              ];
              if (
                a.device_watts &&
                (sportName === 'Gravel Ride' || sportName === 'Ride')
              ) {
                stats.push(
                  <Stat
                    key="power"
                    icon="power.svg"
                    name="Avg. power"
                    value={`${a.average_watts} watts`}
                  />,
                );
              }

              return (
                <div key={a.id} className={styles.activity}>
                  <div className={styles.title}>
                    <Image
                      src={sportIcon}
                      alt={sportName}
                      width={24}
                      height={24}
                      className={styles.icon}
                    />
                    <h3>{a.name}</h3>
                  </div>
                  <div className={styles.info}>
                    <Image
                      src={`https://gleich.s3.us-east-2.amazonaws.com/mapbox-maps/${a.id}.png`}
                      alt="Map"
                      width={300}
                      height={300}
                    />
                    <div
                      className={`${styles.details} ${inconsolata.className}`}
                    >
                      <Title sportName={sportName} date={a.start_date} />
                      <br />
                      <div className={styles.stats}>{stats}</div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </>
    </Section>
  );
}
