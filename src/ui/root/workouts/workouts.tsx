import { extractSportType, loadStravaData } from '@/lib/lcp/strava';
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

dayjs.extend(duration);

export default async function Workouts() {
  const stravaData = await loadStravaData();
  const activities = stravaData.data.slice(0, 3);
  return (
    <LiveSection
      name="Workouts"
      source="Strava"
      sourceURL="https://www.strava.com/about"
      lastUpdated={stravaData.updated}
    >
      <>
        <p>
          One of my favorite things in the world is staying active and enjoying
          the outdoors. I grew up in New Hampshire hiking, biking, snowshoeing,
          and traveling with my family. Out of all of those things I especially
          love cycling mainly through gravel cycling, road cycling, and mountain
          biking. Below are {activities.length} of my most recent{' '}
          <Link href="https://www.strava.com" target="_blank">
            Strava
          </Link>{' '}
          activities:
        </p>
        <div className={styles.activities}>
          {activities.map((a) => {
            const [sportName, sportIcon] = extractSportType(a.sport_type);
            const stravaLink = `https://www.strava.com/activities/${a.id}`;
            const formattedDuration = renderDuration(a.moving_time);
            const stats = new Map<string, string>([
              ['Duration', formattedDuration],
              [
                'Distance',
                `${((a.distance * 0.621) / 1000).toPrecision(3)} mi`,
              ],
            ]);
            if (a.total_elevation_gain > 152.4) {
              stats.set(
                'Elevation Gain',
                `${Math.round(a.total_elevation_gain * 3.280839895).toLocaleString()} ft`,
              );
            } else {
              stats.set('Avg Heart Rate', `${a.average_heartrate} bpm`);
            }

            return (
              <Card key={a.id}>
                <div className={styles.header}>
                  <div className={styles.title}>
                    <div className={styles.titleIconAndTitle}>
                      <SVGIcon
                        src={sportIcon}
                        alt={sportName}
                        title={sportName}
                        width={26}
                        height={26}
                        className={styles.icon}
                      />
                      <Link
                        href={stravaLink}
                        target="_blank"
                        title="View on Strava"
                      >
                        <h3 className={styles.titleText}>{a.name}</h3>
                      </Link>
                    </div>
                    <Link
                      href={stravaLink}
                      target="_blank"
                      title="View on Strava"
                    >
                      <SVGIcon
                        src="/icons/socials/strava.svg"
                        alt="Strava icon"
                        title="View on Strava"
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
                    src={a.map_image_url as string}
                    alt="Map"
                    width={440}
                    height={240}
                    draggable={false}
                    className={styles.map}
                    placeholder="blur"
                    blurDataURL={a.map_blur_image as string}
                  />
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
