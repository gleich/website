import { extractSportType, loadWorkoutsData } from '@/lib/lcp/workouts';
import LiveSection from '../../section/liveSection';
import styles from '@/ui/root/workouts/workouts.module.css';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import Image from 'next/image';
import Time from './time';
import Link from 'next/link';
import SVGIcon from '@/ui/svgIcon';
import Card from '@/ui/card';
import Stats from '@/ui/stats';
import { renderDuration } from '@/lib/time';
import Graph from './graph';
import Lift from './lift';

dayjs.extend(duration);

export default async function Workouts() {
  const workoutData = await loadWorkoutsData();
  const activities = workoutData.data.slice(0, 3);
  return (
    <LiveSection
      name="Workouts"
      sources={[
        { name: 'Strava', icon: 'strava.svg', url: 'https://strava.com' },
        {
          name: 'Hevy',
          icon: 'hevy.svg',
          url: 'https://www.hevyapp.com/product/',
        },
      ]}
      lastUpdated={workoutData.updated}
    >
      <>
        <p>
          One of my favorite things is staying active and enjoying the outdoors.
          I grew up in New Hampshire hiking, biking, snowshoeing, and traveling
          with my family. Out of all of those things I especially love cycling
          mainly through gravel cycling, road cycling, and mountain biking.
          Recently I&apos;ve been getting into lifting which has been a ton of
          fun. Below are {activities.length} of my most recent{' '}
          <Link href="https://www.strava.com" target="_blank">
            Strava
          </Link>
          /
          <Link href="https://hevy.com" target="_blank">
            Hevy
          </Link>{' '}
          workouts:
        </p>
        <div className={styles.activities}>
          {activities.map((a) => {
            const [sportName, sportIcon] = extractSportType(a.sport_type);
            const link =
              a.platform === 'strava'
                ? `https://www.strava.com/activities/${a.id}`
                : `https://hevy.com/workout/${a.id}`;
            const viewOn =
              a.platform === 'strava' ? `View on Strava` : `View on Hevy`;
            const formattedDuration = renderDuration(a.moving_time);
            const stats = new Map<string, string>([
              ['Duration', formattedDuration],
            ]);
            const distanceInMiles = (a.distance * 0.621) / 1000;
            if (a.distance) {
              stats.set('Distance', `${distanceInMiles.toPrecision(3)} mi`);
            } else if (a.calories) {
              stats.set(
                'Calories Burned',
                a.calories?.toLocaleString() + ' cal',
              );
            }
            if (a.sport_type == 'Run') {
              const totalSecondsPerMile = a.moving_time / distanceInMiles;
              const minutesPerMile = Math.floor(totalSecondsPerMile / 60);
              const secondsPerMile = Math.floor(totalSecondsPerMile % 60);
              stats.set(
                'Avg. Pace',
                `${minutesPerMile}:${secondsPerMile.toString().padStart(2, '0')}/mi`,
              );
            } else if (a.total_elevation_gain > 304.8) {
              // if more than 1,000 ft of elevation gain
              stats.set(
                'Elevation Gain',
                `${Math.round(a.total_elevation_gain * 3.280839895).toLocaleString()} ft`,
              );
            } else if (a.average_heartrate) {
              stats.set('Avg. Heart Rate', `${a.average_heartrate} bpm`);
            } else if (a.hevy_volume_kg && a.hevy_set_count) {
              stats.set(
                'Total Volume',
                `${Math.round(a.hevy_volume_kg * 2.2046226218).toLocaleString()} lbs`,
              );
              stats.set('Sets', `${a.hevy_set_count ?? 0}`);
            }

            return (
              <Card key={a.id} className={styles.activity}>
                <div className={styles.header}>
                  <div className={styles.title}>
                    <div className={styles.titleIconAndTitle}>
                      <SVGIcon
                        src={sportIcon}
                        alt={sportName}
                        title={sportName}
                        width={22}
                        height={22}
                        className={styles.icon}
                      />
                      <Link
                        href={link}
                        target="_blank"
                        title={viewOn}
                        className={styles.titleLink}
                      >
                        <h3 className={styles.titleText}>{a.name}</h3>
                      </Link>
                    </div>
                    <Link
                      href={link}
                      target="_blank"
                      title={viewOn}
                      className={styles.platformIcon}
                    >
                      {a.platform === 'strava' ? (
                        <SVGIcon
                          src="/icons/logos/strava.svg"
                          alt="Strava icon"
                          title="View on Strava"
                          height={22}
                          width={22}
                        />
                      ) : (
                        <SVGIcon
                          src="/icons/logos/hevy.svg"
                          alt="Strava icon"
                          title="View on Hevy"
                          height={22}
                          width={22}
                        />
                      )}
                    </Link>
                  </div>
                  <Time date={a.start_date} tz={a.timezone} />
                </div>
                <div className={styles.info}>
                  {a.platform === 'strava' ? (
                    a.has_map ? (
                      <Image
                        src={a.map_image_url as string}
                        alt="Map"
                        width={440}
                        height={240}
                        draggable={false}
                        className={styles.map}
                        placeholder="blur"
                        blurDataURL={a.map_blur_image as string}
                      />
                    ) : (
                      <Graph hrData={a.heartrate_data} />
                    )
                  ) : (
                    <Lift hevyExercises={a.hevy_exercises ?? []} />
                  )}
                  <Stats stats={stats} />
                </div>
              </Card>
            );
          })}
        </div>
      </>
    </LiveSection>
  );
}
