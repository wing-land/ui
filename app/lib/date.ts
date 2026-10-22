export type UiDateInput = string | number | Date

export interface UiDateFormatContext {
  locale: string
  timeZone?: string
  kind?: string
}

export type UiDateFormatter = (value: UiDateInput, context: UiDateFormatContext) => string

// `2026`, `2026-10`, or `2026-10-20`. A missing month or day is left out, not filled in.
const calendarPattern = /^(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?$/

function parseCalendarDate(value: UiDateInput) {
  const match = typeof value === 'string' ? calendarPattern.exec(value) : null
  if (!match) return null
  const [, year, month, day] = match
  return {
    year: Number(year),
    month: month ? Number(month) : undefined,
    day: day ? Number(day) : undefined,
    parts: [year, month, day].filter(Boolean),
  }
}

function toDate(value: UiDateInput) {
  const date = value instanceof Date ? value : new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

export function toDateTimeAttribute(value: UiDateInput) {
  if (typeof value === 'string') return value
  return toDate(value)?.toISOString() ?? ''
}

// Date-only strings are calendar dates, so they are never shifted by a time zone.
export const formatDotDate: UiDateFormatter = (value, { timeZone }) => {
  const calendar = parseCalendarDate(value)
  if (calendar) return calendar.parts.join('.')
  const date = toDate(value)
  if (!date) return String(value)
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date)
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value
  return `${part('year')}.${part('month')}.${part('day')}`
}

export function createIntlDateFormatter(
  options: Intl.DateTimeFormatOptions = { dateStyle: 'medium' },
): UiDateFormatter {
  return (value, { locale, timeZone }) => {
    const calendar = parseCalendarDate(value)
    if (calendar) {
      const date = new Date(Date.UTC(calendar.year, (calendar.month || 1) - 1, calendar.day || 1))
      return new Intl.DateTimeFormat(locale, {
        ...(calendar.day ? options : partialOptions(options, Boolean(calendar.month))),
        timeZone: 'UTC',
      }).format(date)
    }
    const date = toDate(value)
    if (!date) return String(value)
    return new Intl.DateTimeFormat(locale, {
      ...options,
      timeZone: options.timeZone ?? timeZone,
    }).format(date)
  }
}

const monthStyles = { full: 'long', long: 'long', medium: 'short', short: '2-digit' } as const

// Keeps only the year, or the year and month, for dates without a day.
function partialOptions(options: Intl.DateTimeFormatOptions, withMonth: boolean) {
  const month = options.dateStyle ? monthStyles[options.dateStyle] : (options.month ?? 'short')
  return { year: options.year ?? 'numeric', ...(withMonth && { month }) } as const
}
