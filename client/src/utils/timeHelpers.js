export function minutesToSeconds(min) {
  return Math.round(Number(min) * 60)
}

export function secondsToClock(sec) {
  const s = Math.max(0, Math.round(sec))
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${m}:${r.toString().padStart(2, '0')}`
}