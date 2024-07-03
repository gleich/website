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
import Card from '@/ui/card';

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
                <Card key={a.id}>
                  <div className={styles.header}>
                    <div className={styles.title}>
                      <div className={styles.titleIconAndTitle}>
                        <SVGIcon
                          src={sportIcon}
                          alt={sportName}
                          width={26}
                          height={26}
                          className={styles.icon}
                        />
                        <h3 className={styles.titleText}>{a.name}</h3>
                      </div>
                      <Link
                        href={`https://strava.com/activities/${a.id}`}
                        target="_blank"
                        title="View on Strava"
                      >
                        <SVGIcon
                          src="/icons/socials/strava.svg"
                          alt="View on Strava"
                          height={22}
                          width={22}
                          className={styles.stravaIcon}
                        />
                      </Link>
                    </div>
                    <Time date={a.start_date} tz={a.timezone} />
                  </div>
                  <div className={styles.info}>
                    <Image
                      src={`https://gleich.s3.us-east-2.amazonaws.com/mapbox-maps/${a.id}.png`}
                      alt="Map"
                      width={440}
                      height={240}
                      placeholder="blur"
                      draggable={false}
                      blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcfKaxHgAGewJx0wWoEQAAAABJRU5ErkJggg=="
                      className={styles.map}
                    />
                    <div className={`${styles.stats} ${inconsolata.className}`}>
                      <div className={styles.stat}>
                        <p className={styles.value}>{formattedDuration}</p>
                        <p className={styles.valueName}>Duration</p>
                      </div>
                      <div className={styles.stat}>
                        <p className={styles.value}>
                          {((a.distance * 0.621) / 1000).toPrecision(3)} mi
                        </p>
                        <p className={styles.valueName}>Distance</p>
                      </div>
                      <div className={styles.stat}>
                        {(() => {
                          if (a.total_elevation_gain > 152.4)
                            return (
                              <>
                                <p className={styles.value}>
                                  {Math.round(
                                    a.total_elevation_gain * 3.280839895,
                                  ).toLocaleString()}{' '}
                                  ft
                                </p>
                                <p className={styles.valueName}>
                                  Elevation Gain
                                </p>
                              </>
                            );
                          else {
                            return (
                              <>
                                <p className={styles.value}>
                                  {a.average_heartrate} bpm
                                </p>
                                <p className={styles.valueName}>
                                  Avg. Heartrate
                                </p>
                              </>
                            );
                          }
                        })()}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
        </div>
      </>
    </LiveSection>
  );
}
