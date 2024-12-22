import { TooltipProps } from 'recharts';
import styles from '@/ui/root/workouts/graphTooltip.module.css';

export default function GraphTooltip({
  active,
  payload,
}: TooltipProps<string, string>) {
  if (active && payload && payload.length) {
    return <div className={styles.tooltip}>{payload[0].value} bpm</div>;
  }

  return null;
}
