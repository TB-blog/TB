import { distanceInWords, format } from 'date-fns';

export function timeFormat(time: Date) {
  return format(time, 'YYYY-MM-DD');
}

export function timeAgo(time: Date) {
  return distanceInWords(new Date(), time) + ' ago';
}
