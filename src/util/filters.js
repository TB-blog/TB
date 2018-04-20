import timeago from 'timeago.js'

export function timeAgo (time) {
  const timeagoInstance = timeago()
  return timeagoInstance.format(time)
}
