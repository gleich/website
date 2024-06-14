import { Activity, extractSportType } from '@/lib/strava';
import Section from '../../section';
import styles from '@/ui/root/activities/activities.module.css';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import Image from 'next/image';
import { Inconsolata } from 'next/font/google';
import Stat from './stat';
import Link from 'next/link';

const inconsolata = Inconsolata({ subsets: ['latin'] });

export default function Activities({ activities }: { activities: Activity[] }) {
  dayjs.extend(relativeTime);
  dayjs.extend(duration);
  dayjs.extend(utc);
  dayjs.extend(timezone);
  return (
    <Section
      name="Activities"
      description="One of my favorite things in the world is staying active and enjoying the outdoors. I grew up in New Hampshire hiking, biking, snowshoeing, and traveling with my family. Out of all of those things I've loved cycling mainly through gravel cycling, road cycling, and mountain biking. Below are some of my recent activities from Strava:"
    >
      <div className={styles.activities}>
        {activities
          .filter((a) => !a.private)
          .slice(0, 3)
          .map((a) => {
            const date = dayjs(a.start_date);
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
              <div key={a.id}>
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
                <div className={`${styles.details} ${inconsolata.className}`}>
                  <p>
                    {sportName} on {date.format('MM/DD/YYYY [@] h:MM A')}
                  </p>
                  <br />
                  <div className={styles.stats}>{stats}</div>
                </div>
              </div>
            );
          })}
      </div>
    </Section>
  );
}
