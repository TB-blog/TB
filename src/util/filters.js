import { format, distanceInWords } from 'date-fns';

export function timeFormat (time) {
  return format(time, 'YYYY-MM-DD');
}

export function timeAgo (time) {
  return distanceInWords(new Date(), time) + ' ago';
}
