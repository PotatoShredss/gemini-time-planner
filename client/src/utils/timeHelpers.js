export function minutesToSeconds(min) {
  return Math.round(Number(min) * 60)
}

export function secondsToDuration(sec) {
  const totalSeconds = Math.max(0, Math.round(sec))
  const totalMinutes = Math.floor(totalSeconds / 60)

  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`
  if (hours > 0) return `${hours}h`
  return `${minutes}m`
}

// Add this to your existing timeHelpers.js
export function getFutureTime(secondsFromNow) {
  const date = new Date();
  date.setSeconds(date.getSeconds() + secondsFromNow);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}