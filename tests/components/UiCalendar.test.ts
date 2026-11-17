import { describe, expect, it } from 'vitest'
import { userEvent } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import UiCalendar from '../../app/components/UiCalendar.vue'
import { expectAccessible } from './helpers'

const events = [
  {
    key: 'meeting',
    title: 'Meeting',
    start: '2026-11-16T10:00',
    end: '2026-11-16T11:00',
    href: '/meeting',
  },
  { key: 'review', title: 'Review', start: '2026-11-16T10:30', end: '2026-11-16T12:00' },
  { key: 'report', title: 'Report', start: '2026-11-16T18:00', kind: 'deadline' as const },
  { key: 'trip', title: 'Trip', start: '2026-11-18', end: '2026-11-20' },
]

describe('UiCalendar', () => {
  it('is a grid whose days name their date, today, and events', async () => {
    const screen = await render(UiCalendar, {
      props: { events, label: 'November', today: '2026-11-16', date: '2026-11-16' },
    })
    await expect.element(screen.getByRole('grid', { name: 'November' })).toBeVisible()
    await expect.element(screen.getByRole('columnheader', { name: 'Sunday' })).toBeVisible()
    const day = screen.getByRole('gridcell', {
      name: /November 16.*Today.*3 events: Meeting, Review, Report/,
    })
    await expect.element(day).toHaveAttribute('aria-selected', 'true')
    await expect.element(day).toHaveAttribute('aria-current', 'date')
    await screen.getByRole('gridcell', { name: /November 19.*1 event: Trip/ }).click()
    expect(screen.emitted('update:date')).toEqual([['2026-11-19']])
    await expectAccessible(screen.container)
  })

  it('moves the selection with the arrow keys', async () => {
    const screen = await render(UiCalendar, {
      props: {
        events: [],
        label: 'November',
        today: '2026-11-16',
        date: '2026-11-16',
        'onUpdate:date': (value: string) => screen.rerender({ date: value }),
      },
    })
    await screen.getByRole('gridcell', { name: /November 16/ }).click()
    await userEvent.keyboard('{ArrowDown}')
    await expect.element(screen.getByRole('gridcell', { name: /November 23/ })).toHaveFocus()
  })

  it('groups the week by day and reads times and deadlines in full', async () => {
    const screen = await render(UiCalendar, {
      props: { events, view: 'week', label: 'Week', today: '2026-11-16', date: '2026-11-16' },
    })
    const monday = screen.getByRole('group', { name: 'Monday, November 16', exact: true })
    await expect
      .element(monday.getByRole('link', { name: /^10:00\s?–11:00 Meeting$/ }))
      .toBeVisible()
    expect(monday.element().textContent).toContain('Due 18:00')
    await expectAccessible(screen.container)
  })

  it('places overlapping events side by side in the day view', async () => {
    const screen = await render(UiCalendar, {
      props: { events, view: 'day', label: 'November 16', today: '2026-11-16', date: '2026-11-16' },
    })
    const meeting = screen.getByRole('link', { name: /Meeting/ }).element() as HTMLElement
    const review = screen.container.querySelector<HTMLElement>('.ui-calendar__event:not(a)')!
    expect(meeting.getBoundingClientRect().right).toBeLessThanOrEqual(
      review.getBoundingClientRect().left,
    )
  })
})
