import { expect, test } from 'vitest'
import { render } from 'vitest-browser-vue'
import UiTimeline from '../../app/components/UiTimeline.vue'

test('shows a date label, links the title, and renders the meta slot', async () => {
  const items = [
    { date: '2026-11-16T10:00', dateLabel: '10:00', title: 'Meeting', href: '/notes/meeting' },
  ]
  const screen = await render(UiTimeline, {
    props: { items, density: 'compact' },
    slots: { meta: '<span class="probe-meta">Event</span>' },
  })
  const time = screen.container.querySelector('time')!
  expect(time.textContent).toBe('10:00')
  expect(time.getAttribute('datetime')).toBe('2026-11-16T10:00')
  await expect
    .element(screen.getByRole('link', { name: 'Meeting' }))
    .toHaveAttribute('href', '/notes/meeting')
  expect(screen.container.querySelector('.timeline-meta .probe-meta')).not.toBeNull()
})

test('keeps the date beside the title in a narrow compact timeline', async () => {
  const items = [{ date: '2026-11-16', dateLabel: 'All day', title: 'Release' }]
  const screen = await render(UiTimeline, {
    props: { items, density: 'compact' },
    container: Object.assign(document.body.appendChild(document.createElement('div')), {
      style: 'width: 320px',
    }),
  })
  const time = screen.container.querySelector('time')!.getBoundingClientRect()
  const title = screen.container.querySelector('.timeline-title')!.getBoundingClientRect()
  expect(time.right).toBeLessThanOrEqual(title.left)
})
