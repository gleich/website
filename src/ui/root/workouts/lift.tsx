import { HevyExercise } from '@/lib/lcp/workouts';
import ScrollingText from '@/ui/scrollingText';
import styles from './lift.module.css';
import { nanoid } from 'nanoid';

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
            <div className={styles.exerciseName}>
              <ScrollingText text={e.title} />
            </div>
            <div className={styles.sets}>
              {e.sets.map((s) => (
                <div className={styles.set} key={nanoid()}>
                  <div className={styles.setNumber}>{s.index + 1}</div>
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
