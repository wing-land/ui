import { describe, expect, it } from 'vitest'
import { addMonths, layoutLanes, monthDays, startOfWeek } from '../../app/lib/calendar'

describe('calendar dates', () => {
  it('fills whole weeks around a month', () => {
    const days = monthDays('2026-11-16', 0)
    expect(days[0]).toBe('2026-11-01')
    expect(days.at(-1)).toBe('2026-12-05')
    expect(days).toHaveLength(35)
  })

  it('starts weeks on Monday when asked', () => {
    expect(startOfWeek('2026-11-15', 1)).toBe('2026-11-09')
  })

  it('keeps the day when moving between months of different lengths', () => {
    expect(addMonths('2026-01-31', 1)).toBe('2026-02-28')
  })

  it('places overlapping spans side by side', () => {
    expect(
      layoutLanes([
        { start: 600, end: 660 },
        { start: 630, end: 690 },
        { start: 720, end: 750 },
      ]),
    ).toEqual([
      { lane: 0, lanes: 2 },
      { lane: 1, lanes: 2 },
      { lane: 0, lanes: 1 },
    ])
  })
})
