import { HevyExercise } from '@/lib/lcp/workouts';
import ScrollingText from '@/ui/scrollingText';
import styles from './lift.module.css';
import { nanoid } from 'nanoid';
import Link from 'next/link';

export default function Lift({
  hevyExercises,
}: {
  hevyExercises: HevyExercise[];
}) {
  return (
    <div className={styles.scrollContainer}>
      <div className={styles.table}>
        {hevyExercises.map((e) => (
          <div key={nanoid()}>
            <div className={styles.exerciseNameContainer}>
              <Link
                href={`https://hevy.com/exercise/${e.exercise_template_id}`}
                target="_blank"
                className={styles.exerciseNameText}
                title="View exercise in Hevy"
              >
                <ScrollingText
                  text={e.title.replaceAll('(', '[').replaceAll(')', ']')}
                />
              </Link>
            </div>
            <div className={styles.sets}>
              {e.sets.map((s, i) => (
                <div className={styles.set} key={nanoid()}>
                  <div
                    className={`${styles.setNumber} ${s.type == 'warmup' ? styles.warmup : ''}`}
                    title={s.type == 'warmup' ? 'Warmup Set' : undefined}
                  >
                    {s.type != 'warmup' ? i + 1 : 'W'}
                  </div>
                  <div>
                    {(s.weight_kg * 2.2046226218).toPrecision(3)} lbs × {s.reps}{' '}
                    reps
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
