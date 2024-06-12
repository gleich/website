import { Activity, extractSportType } from '@/lib/strava';
import Section from '../../section';
import styles from '@/ui/root/activities/activities.module.css';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
import Image from 'next/image';
import { Inconsolata } from 'next/font/google';
import Stat from './stat';

const inconsolata = Inconsolata({ subsets: ['latin'] });

export default function Activities({ activities }: { activities: Activity[] }) {
  dayjs.extend(relativeTime);
  dayjs.extend(duration);
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
                  <div className={styles.stats}>
                    <Stat
                      icon="clock.svg"
                      name="Time"
                      value={`${formattedDuration}`}
                    />
                    <Stat
                      icon="compass.svg"
                      name="Distance"
                      value={`${((a.distance * 0.621) / 1000).toPrecision(3)} miles`}
                    />
                    <Stat
                      icon="heart.svg"
                      name="Average HR"
                      value={`${a.average_heartrate} bpm`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </Section>
  );
}
