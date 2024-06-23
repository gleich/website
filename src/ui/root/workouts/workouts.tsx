import { extractSportType, loadStravaData } from '@/lib/strava';
import LiveSection from '../../section/liveSection';
import styles from '@/ui/root/workouts/workouts.module.css';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import Image from 'next/image';
import { Inconsolata } from 'next/font/google';
import Stat from './stat';
import Time from './time';
import Link from 'next/link';
import SVGIcon from '@/ui/svgIcon';
import ViewMore from '@/ui/viewMore';

const inconsolata = Inconsolata({ subsets: ['latin'] });
dayjs.extend(duration);

export default async function Workouts() {
  const stravaData = await loadStravaData();
  const activities = stravaData.data;
  return (
    <LiveSection
      name="Workouts"
      source="Strava"
      sourceURL="https://www.strava.com/about"
      lastUpdated={stravaData.last_updated}
    >
      <>
        <p>
          One of my favorite things in the world is staying active and enjoying
          the outdoors. I grew up in New Hampshire hiking, biking, snowshoeing,
          and traveling with my family. Out of all of those things I especially
          love cycling mainly through gravel cycling, road cycling, and mountain
          biking. Below are 6 of my most recent{' '}
          <Link href="https://strava.com" target="_blank">
            Strava
          </Link>{' '}
          activities:
        </p>
        <div className={styles.activities}>
          {activities
            .filter((a) => !a.private)
            .slice(0, 6)
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

              return (
                <div key={a.id} className={styles.activity}>
                  <div className={styles.title}>
                    <SVGIcon
                      src={sportIcon}
                      alt={sportName}
                      width={27}
                      height={27}
                      className={styles.icon}
                    />
                    <h3>{a.name}</h3>
                  </div>
                  <div className={styles.info}>
                    <div
                      className={`${styles.details} ${inconsolata.className}`}
                    >
                      <Time date={a.start_date} />
                      <div className={styles.stats}>
                        <Stat name="Duration" value={`${formattedDuration}`} />
                        <Stat
                          name="Distance"
                          value={`${((a.distance * 0.621) / 1000).toPrecision(3)} miles`}
                        />
                        <Stat
                          name="Avg. HR"
                          value={`${a.average_heartrate} bpm`}
                        />
                      </div>
                      <div className={styles.viewOnStrava}>
                        <SVGIcon
                          src="/icons/strava.svg"
                          alt="Strava Logo"
                          width={18}
                          height={18}
                        />
                        <Link
                          href={`https://www.strava.com/activities/${a.id}`}
                          target="_blank"
                        >
                          View on Strava
                        </Link>
                      </div>
                    </div>
                    <Image
                      src={`https://gleich.s3.us-east-2.amazonaws.com/mapbox-maps/${a.id}.png`}
                      alt="Map"
                      width={200}
                      height={200}
                      placeholder="blur"
                      draggable={false}
                      blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8+fzifwAIxAOS05NsJgAAAABJRU5ErkJggg=="
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </>
    </LiveSection>
  );
}
