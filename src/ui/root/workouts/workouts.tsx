import { extractSportType, loadStravaData } from '@/lib/strava';
import LiveSection from '../../section/liveSection';
import styles from '@/ui/root/workouts/workouts.module.css';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import Image from 'next/image';
import { Inconsolata } from 'next/font/google';
import Time from './time';
import Link from 'next/link';
import SVGIcon from '@/ui/svgIcon';

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

              const iconSize = sportName === 'Run' ? 23 : 27;

              return (
                <div key={a.id} className={styles.activity}>
                  <div className={styles.title}>
                    <SVGIcon
                      src={sportIcon}
                      alt={sportName}
                      width={iconSize}
                      height={iconSize}
                      className={styles.icon}
                    />
                    <h3 className={styles.titleText}>{a.name}</h3>
                  </div>
                  <div
                    className={styles.info}
                    style={{ marginTop: sportName === 'Run' ? 5 : 0 }}
                  >
                    <div
                      className={`${styles.details} ${inconsolata.className}`}
                    >
                      <Time date={a.start_date} tz={a.timezone} />
                      <div className={styles.stats}>
                        <div className={styles.stat}>
                          <p className={styles.value}>{formattedDuration}</p>
                          <p className={styles.valueName}>Duration</p>
                        </div>
                        <div className={styles.stat}>
                          <p
                            className={styles.value}
                          >{`${((a.distance * 0.621) / 1000).toPrecision(3)} miles`}</p>
                          <p className={styles.valueName}>Distance</p>
                        </div>
                        <div className={styles.stat}>
                          <p className={styles.value}>
                            {a.average_heartrate} bpm
                          </p>
                          <p className={styles.valueName}>Avg Heartrate</p>
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
                    </div>
                    <Image
                      src={`https://gleich.s3.us-east-2.amazonaws.com/mapbox-maps/${a.id}.png`}
                      alt="Map"
                      width={240}
                      height={210}
                      placeholder="blur"
                      draggable={false}
                      blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8+fzifwAIxAOS05NsJgAAAABJRU5ErkJggg=="
                      className={styles.map}
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
