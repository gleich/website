import dayjs, { Dayjs } from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export function exactFromNow(date: Dayjs, currentTime: Dayjs): string {
  const diff = dayjs.duration(date.diff(currentTime));
  const yearsDiff = Math.abs(date.diff(currentTime, 'year'));
  const monthsDiff = Math.abs(date.diff(currentTime, 'month')) % 12;
  const daysDiff = Math.abs(date.diff(currentTime, 'day')) % 30;
  const hoursDiff = Math.abs(date.diff(currentTime, 'hour')) % 24;
  const minutesDiff = Math.abs(date.diff(currentTime, 'minute')) % 60;
  const secondsDiff = Math.abs(date.diff(currentTime, 'second')) % 60;
  let fromNow: string;

  if (yearsDiff > 0) {
    fromNow = `${yearsDiff} ${yearsDiff === 1 ? 'year' : 'years'} & ${monthsDiff} ${monthsDiff === 1 ? 'month' : 'months'}`;
  } else if (monthsDiff > 0) {
    fromNow = `${monthsDiff} ${monthsDiff === 1 ? 'month' : 'months'} & ${daysDiff} ${daysDiff === 1 ? 'day' : 'days'}`;
  } else if (daysDiff > 0) {
    fromNow = `${daysDiff} ${daysDiff === 1 ? 'day' : 'days'} & ${hoursDiff}h`;
  } else if (hoursDiff > 0) {
    fromNow = `${hoursDiff}h & ${minutesDiff}m`;
  } else if (minutesDiff > 0) {
    fromNow = `${minutesDiff}m & ${secondsDiff}s`;
  } else {
    fromNow = `${secondsDiff}s`;
  }

  return fromNow + ' ago';
}
