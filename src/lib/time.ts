import dayjs, { Dayjs } from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export function exactFromNow(date: Dayjs, currentTime: Dayjs): string {
  const yearsDiff = Math.abs(date.diff(currentTime, 'year'));
  const totalMonthsDiff = Math.abs(date.diff(currentTime, 'month'));
  const monthsDiff = totalMonthsDiff % 12;

  const totalDaysDiff = Math.abs(date.diff(currentTime, 'day'));

  const weeksDiff = totalDaysDiff >= 7 ? Math.floor(totalDaysDiff / 7) : 0;
  const daysDiff = weeksDiff > 0 ? totalDaysDiff % 7 : totalDaysDiff % 30;

  const hoursDiff = Math.abs(date.diff(currentTime, 'hour')) % 24;
  const minutesDiff = Math.abs(date.diff(currentTime, 'minute')) % 60;
  const secondsDiff = Math.abs(date.diff(currentTime, 'second')) % 60;

  let fromNow: string;

  if (yearsDiff > 0) {
    fromNow = `${yearsDiff} ${yearsDiff === 1 ? 'year' : 'years'} & ${monthsDiff} ${monthsDiff === 1 ? 'month' : 'months'}`;
  } else if (monthsDiff > 0) {
    fromNow = `${monthsDiff} ${monthsDiff === 1 ? 'month' : 'months'} & ${daysDiff} ${daysDiff === 1 ? 'day' : 'days'}`;
  } else if (weeksDiff > 0 && daysDiff == 0) {
    fromNow = `${weeksDiff} ${weeksDiff === 1 ? 'week' : 'weeks'} & ${hoursDiff}hr`;
  } else if (weeksDiff > 0) {
    fromNow = `${weeksDiff} ${weeksDiff === 1 ? 'week' : 'weeks'} & ${daysDiff} ${daysDiff === 1 ? 'day' : 'days'}`;
  } else if (daysDiff > 0) {
    fromNow = `${daysDiff} ${daysDiff === 1 ? 'day' : 'days'} & ${hoursDiff}hr`;
  } else if (hoursDiff > 0) {
    fromNow = `${hoursDiff}hr & ${minutesDiff}m`;
  } else if (minutesDiff > 0) {
    fromNow = `${minutesDiff}m & ${secondsDiff}s`;
  } else {
    fromNow = `${secondsDiff}s`;
  }

  return fromNow + ' ago';
}

export function renderDuration(seconds: number): string {
  const duration = dayjs.duration(seconds, 'seconds');
  let formattedDuration: string;

  const totalHours = Math.floor(duration.asHours());
  const minutes = duration.minutes();
  if (totalHours > 0) {
    formattedDuration = `${totalHours}hr`;
    if (minutes > 0) {
      formattedDuration += ` & ${minutes}m`;
    }
  } else if (seconds < 3660 && seconds > 3540) {
    formattedDuration = '1hr';
  } else {
    const remainingSeconds = duration.seconds();
    formattedDuration = `${minutes}m`;
    if (remainingSeconds > 0) {
      formattedDuration += ` & ${remainingSeconds}s`;
    }
  }
  return formattedDuration;
}
