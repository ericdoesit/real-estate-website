export interface OpenHouse {
  _key?: string
  start: string
  end: string
}

const TIME_ZONE = 'America/Los_Angeles'

/** Open houses that haven't ended yet, soonest first */
export function upcomingOpenHouses(openHouses?: OpenHouse[] | null, now = new Date()): OpenHouse[] {
  if (!openHouses?.length) return []
  return openHouses
    .filter((oh) => oh.start && oh.end && new Date(oh.end) > now)
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
}

/** e.g. "Sat, Oct 3 · 1:00 – 3:00 PM" */
export function formatOpenHouse({ start, end }: OpenHouse): string {
  const day = new Date(start).toLocaleDateString('en-US', { timeZone: TIME_ZONE, weekday: 'short', month: 'short', day: 'numeric' })
  const time = (d: string) => new Date(d).toLocaleTimeString('en-US', { timeZone: TIME_ZONE, hour: 'numeric', minute: '2-digit' })
  const [startTime, startPeriod] = time(start).split(' ')
  const endTime = time(end)
  // Drop the repeated AM/PM when both times share it: "1:00 – 3:00 PM"
  const startLabel = endTime.endsWith(startPeriod) ? startTime : `${startTime} ${startPeriod}`
  return `${day} · ${startLabel} – ${endTime}`
}
