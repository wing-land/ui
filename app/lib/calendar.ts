// Calendar dates are plain `YYYY-MM-DD` strings so that time zones never shift a day.

export function parseDate(date: string): Date {
  const [year, month, day] = date.slice(0, 10).split('-').map(Number)
  return new Date(Date.UTC(year!, month! - 1, day!))
}

export function formatIsoDate(value: Date): string {
  return value.toISOString().slice(0, 10)
}

export function addDays(date: string, days: number): string {
  const value = parseDate(date)
  value.setUTCDate(value.getUTCDate() + days)
  return formatIsoDate(value)
}

export function addMonths(date: string, months: number): string {
  const value = parseDate(date)
  const day = value.getUTCDate()
  value.setUTCDate(1)
  value.setUTCMonth(value.getUTCMonth() + months)
  // Keep the day when the target month has it, such as Jan 31 → Feb 28.
  const last = new Date(Date.UTC(value.getUTCFullYear(), value.getUTCMonth() + 1, 0)).getUTCDate()
  value.setUTCDate(Math.min(day, last))
  return formatIsoDate(value)
}

export function weekdayIndex(date: string): number {
  return parseDate(date).getUTCDay()
}

export function startOfWeek(date: string, weekStartsOn: 0 | 1): string {
  return addDays(date, -((weekdayIndex(date) - weekStartsOn + 7) % 7))
}

/** The days shown in a month view: whole weeks from the week of the 1st to the week of the last day. */
export function monthDays(date: string, weekStartsOn: 0 | 1): string[] {
  const first = `${date.slice(0, 7)}-01`
  const last = addDays(addMonths(first, 1), -1)
  const days: string[] = []
  for (
    let day = startOfWeek(first, weekStartsOn);
    day <= last || days.length % 7 !== 0;
    day = addDays(day, 1)
  ) {
    days.push(day)
  }
  return days
}

/** Minutes from midnight of a `YYYY-MM-DDTHH:mm` value. */
export function minutesOf(value: string): number {
  return Number(value.slice(11, 13)) * 60 + Number(value.slice(14, 16))
}

export interface TimedSpan {
  start: number
  end: number
}

/**
 * Places overlapping spans side by side. Returns, for each span in input order, its lane and the number of lanes
 * in its group of overlapping spans.
 */
export function layoutLanes(spans: readonly TimedSpan[]): { lane: number; lanes: number }[] {
  const order = spans
    .map((span, index) => ({ ...span, index }))
    .sort((a, b) => a.start - b.start || b.end - a.end)
  const result = spans.map(() => ({ lane: 0, lanes: 1 }))
  let group: typeof order = []
  let laneEnds: number[] = []
  let groupEnd = -Infinity
  const closeGroup = () => {
    for (const span of group) result[span.index]!.lanes = laneEnds.length
    group = []
    laneEnds = []
  }
  for (const span of order) {
    if (span.start >= groupEnd) closeGroup()
    let lane = laneEnds.findIndex((end) => end <= span.start)
    if (lane < 0) lane = laneEnds.push(0) - 1
    laneEnds[lane] = span.end
    result[span.index]!.lane = lane
    group.push(span)
    groupEnd = Math.max(groupEnd === -Infinity ? span.end : groupEnd, span.end)
  }
  closeGroup()
  return result
}
