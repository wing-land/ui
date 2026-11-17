<script setup lang="ts" generic="T extends UiCalendarEvent">
import { computed, nextTick, useTemplateRef } from 'vue'
import {
  addDays,
  addMonths,
  layoutLanes,
  minutesOf,
  monthDays,
  parseDate,
  startOfWeek,
  weekdayIndex,
} from '../lib/calendar'
import { useUiConfig, type UiLinkComponent } from '../lib/config'
import type { UiCalendarEvent } from '../lib/types'
import UiVisuallyHidden from './UiVisuallyHidden.vue'

const props = withDefaults(
  defineProps<{
    events: readonly T[]
    /** Accessible name of the calendar, such as the period it shows. */
    label: string
    view?: 'month' | 'week' | 'day'
    /** Today as `YYYY-MM-DD`, in the time zone the app shows. */
    today: string
    weekStartsOn?: 0 | 1
    /** First and last hours of the time grid in the week and day views. */
    startHour?: number
    endHour?: number
    /** Events shown in a month cell before the rest are counted. */
    maxPerDay?: number
    linkComponent?: UiLinkComponent
  }>(),
  {
    view: 'month',
    weekStartsOn: 0,
    startHour: 8,
    endHour: 21,
    maxPerDay: 3,
    linkComponent: undefined,
  },
)
defineSlots<{ event?: (props: { event: T }) => unknown }>()
/** The selected day as `YYYY-MM-DD`. It also decides which month, week, or day is shown. */
const date = defineModel<string>('date', { required: true })
const ui = useUiConfig()
const grid = useTemplateRef<HTMLElement>('grid')

const hourHeight = 44
const defaultMinutes = 30

interface Placed {
  event: T
  allDay: boolean
  deadline: boolean
  /** Inclusive first day and exclusive last day. */
  from: string
  until: string
  start: number
  end: number
}

const placed = computed<Placed[]>(() =>
  props.events.map((event) => {
    const allDay = event.start.length <= 10
    const deadline = event.kind === 'deadline'
    const from = event.start.slice(0, 10)
    if (allDay) {
      const until =
        event.end && event.end.slice(0, 10) > from ? event.end.slice(0, 10) : addDays(from, 1)
      return { event, allDay, deadline, from, until, start: 0, end: 0 }
    }
    const start = minutesOf(event.start)
    const sameDayEnd = event.end && event.end.slice(0, 10) === from ? minutesOf(event.end) : null
    const end = deadline ? start : Math.max(sameDayEnd ?? start + defaultMinutes, start + 15)
    return { event, allDay, deadline, from, until: addDays(from, 1), start, end }
  }),
)

function eventsOn(day: string): Placed[] {
  return placed.value
    .filter((item) => item.from <= day && day < item.until)
    .sort((a, b) => Number(b.allDay) - Number(a.allDay) || a.start - b.start)
}

const weekdayFormat = computed(
  () => new Intl.DateTimeFormat(ui.value.locale, { weekday: 'short', timeZone: 'UTC' }),
)
const fullFormat = computed(
  () =>
    new Intl.DateTimeFormat(ui.value.locale, {
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      timeZone: 'UTC',
    }),
)
const weekdayName = (day: string) => weekdayFormat.value.format(parseDate(day))
const weekdayLongFormat = computed(
  () => new Intl.DateTimeFormat(ui.value.locale, { weekday: 'long', timeZone: 'UTC' }),
)
const weekdayLongName = (day: string) => weekdayLongFormat.value.format(parseDate(day))
const dayNumber = (day: string) => Number(day.slice(8, 10))
const timeText = (minutes: number) =>
  `${Math.floor(minutes / 60)}:${String(minutes % 60).padStart(2, '0')}`

// Event chips in month cells are hidden from screen readers, so the day's name lists their titles instead.
function dayDetails(day: string) {
  const items = eventsOn(day)
  const parts: string[] = []
  if (day === props.today) parts.push(ui.value.messages.calendar.today)
  if (items.length) {
    const titles = items.map((item) => item.event.title).join(', ')
    parts.push(`${ui.value.messages.calendar.events(items.length)}: ${titles}`)
  }
  return parts.join(', ')
}

function dayLabel(day: string) {
  return [fullFormat.value.format(parseDate(day)), dayDetails(day)].filter(Boolean).join(', ')
}

const weekend = (day: string) => {
  const index = weekdayIndex(day)
  return index === 0 ? 'is-sunday' : index === 6 ? 'is-saturday' : ''
}

// Month view
const cells = computed(() =>
  monthDays(date.value, props.weekStartsOn).map((day) => {
    const items = eventsOn(day)
    return {
      day,
      inMonth: day.slice(0, 7) === date.value.slice(0, 7),
      shown: items.slice(0, props.maxPerDay),
      hidden: Math.max(0, items.length - props.maxPerDay),
    }
  }),
)
const weekdayHeaders = computed(() => cells.value.slice(0, 7).map((cell) => cell.day))
const weeks = computed(() =>
  Array.from({ length: cells.value.length / 7 }, (_, index) =>
    cells.value.slice(index * 7, index * 7 + 7),
  ),
)

async function moveSelection(event: KeyboardEvent) {
  const steps: Record<string, () => string> = {
    ArrowLeft: () => addDays(date.value, -1),
    ArrowRight: () => addDays(date.value, 1),
    ArrowUp: () => addDays(date.value, -7),
    ArrowDown: () => addDays(date.value, 7),
    Home: () => startOfWeek(date.value, props.weekStartsOn),
    End: () => addDays(startOfWeek(date.value, props.weekStartsOn), 6),
    PageUp: () => addMonths(date.value, -1),
    PageDown: () => addMonths(date.value, 1),
  }
  const step = steps[event.key]
  if (!step) return
  event.preventDefault()
  date.value = step()
  await nextTick()
  grid.value?.querySelector<HTMLElement>(`[data-day="${date.value}"]`)?.focus()
}

// Week and day views
const columns = computed(() => {
  if (props.view === 'day') return [date.value]
  const first = startOfWeek(date.value, props.weekStartsOn)
  return Array.from({ length: 7 }, (_, index) => addDays(first, index))
})
const hours = computed(() =>
  Array.from(
    { length: Math.max(1, props.endHour - props.startHour) },
    (_, index) => props.startHour + index,
  ),
)
const gridHeight = computed(() => hours.value.length * hourHeight)

function offset(minutes: number) {
  const clamped = Math.min(Math.max(minutes, props.startHour * 60), props.endHour * 60)
  return ((clamped - props.startHour * 60) / 60) * hourHeight
}

const timeline = computed(() =>
  columns.value.map((day) => {
    const items = eventsOn(day)
    const timed = items.filter((item) => !item.allDay && !item.deadline)
    const lanes = layoutLanes(timed)
    return {
      day,
      allDay: items.filter((item) => item.allDay),
      timed: timed.map((item, index) => {
        const top = offset(item.start)
        const height = Math.max(offset(item.end) - top, 20)
        const { lane, lanes: count } = lanes[index]!
        return {
          item,
          style: {
            top: `${top + 1}px`,
            height: `${height - 3}px`,
            left: `calc(${(lane / count) * 100}% + 3px)`,
            width: `calc(${100 / count}% - 6px)`,
          },
        }
      }),
      deadlines: items
        .filter((item) => !item.allDay && item.deadline)
        .map((item) => ({ item, style: { top: `${offset(item.start)}px` } })),
    }
  }),
)
</script>

<template>
  <section
    class="ui-calendar"
    :class="`ui-calendar--${view}`"
    :aria-label="view === 'month' ? undefined : label"
  >
    <table
      v-if="view === 'month'"
      ref="grid"
      class="ui-calendar__month"
      role="grid"
      :aria-label="label"
    >
      <thead>
        <tr>
          <th v-for="day in weekdayHeaders" :key="day" scope="col" :class="weekend(day)">
            <span aria-hidden="true">{{ weekdayName(day) }}</span>
            <UiVisuallyHidden>{{ weekdayLongName(day) }}</UiVisuallyHidden>
          </th>
        </tr>
      </thead>
      <tbody @keydown="moveSelection">
        <tr v-for="(week, index) in weeks" :key="index">
          <!-- Selection follows focus, so the arrow keys both move and select, as in a date grid. -->
          <td
            v-for="cell in week"
            :key="cell.day"
            class="ui-calendar__day"
            :class="{ 'is-outside': !cell.inMonth }"
            :data-day="cell.day"
            :aria-selected="cell.day === date"
            :aria-current="cell.day === today ? 'date' : undefined"
            :aria-label="dayLabel(cell.day)"
            :tabindex="cell.day === date ? 0 : -1"
            @click="date = cell.day"
          >
            <div class="ui-calendar__cell" aria-hidden="true">
              <span
                class="ui-calendar__number"
                :class="[weekend(cell.day), { 'is-today': cell.day === today }]"
                >{{ dayNumber(cell.day) }}</span
              >
              <span
                v-for="item in cell.shown"
                :key="item.event.key"
                class="ui-calendar__chip"
                :class="{ 'is-highlighted': item.event.highlighted }"
              >
                <span class="ui-calendar__mark" :class="{ 'is-deadline': item.deadline }" />
                <span class="ui-calendar__chip-text"
                  ><slot name="event" :event="item.event">{{ item.event.title }}</slot></span
                >
              </span>
              <span v-if="cell.hidden" class="ui-calendar__more">{{
                ui.messages.calendar.more(cell.hidden)
              }}</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <template v-else>
      <div class="ui-calendar__columns ui-calendar__heads">
        <span />
        <template v-if="view === 'week'">
          <!-- Named by its visible text so that voice control matches it; the rest is read after it. -->
          <button
            v-for="column in timeline"
            :key="column.day"
            type="button"
            class="ui-calendar__head"
            :aria-pressed="column.day === date"
            :aria-current="column.day === today ? 'date' : undefined"
            @click="date = column.day"
          >
            <span :class="weekend(column.day)">{{ weekdayName(column.day) }}</span>
            <span
              class="ui-calendar__number"
              :class="[weekend(column.day), { 'is-today': column.day === today }]"
              >{{ dayNumber(column.day) }}</span
            >
            <UiVisuallyHidden v-if="dayDetails(column.day)">{{
              `, ${dayDetails(column.day)}`
            }}</UiVisuallyHidden>
          </button>
        </template>
      </div>
      <div class="ui-calendar__columns ui-calendar__all-day">
        <span class="ui-calendar__axis-label" aria-hidden="true">{{
          ui.messages.calendar.allDay
        }}</span>
        <div
          v-for="column in timeline"
          :key="column.day"
          class="ui-calendar__all-day-cell"
          role="group"
          :aria-label="`${fullFormat.format(parseDate(column.day))}, ${ui.messages.calendar.allDay}`"
        >
          <component
            :is="item.event.href ? (linkComponent ?? ui.linkComponent) : 'span'"
            v-for="item in column.allDay"
            :key="item.event.key"
            :href="item.event.href"
            class="ui-calendar__event is-static"
            :class="{ 'is-highlighted': item.event.highlighted }"
            ><slot name="event" :event="item.event">{{ item.event.title }}</slot></component
          >
        </div>
      </div>
      <div class="ui-calendar__columns ui-calendar__body">
        <div class="ui-calendar__hours" aria-hidden="true">
          <span v-for="hour in hours" :key="hour">{{ hour }}:00</span>
        </div>
        <div
          v-for="column in timeline"
          :key="column.day"
          class="ui-calendar__track"
          :class="{ 'is-today': column.day === today }"
          role="group"
          :aria-label="fullFormat.format(parseDate(column.day))"
          :style="{ height: `${gridHeight}px` }"
        >
          <component
            :is="item.event.href ? (linkComponent ?? ui.linkComponent) : 'span'"
            v-for="{ item, style } in column.timed"
            :key="item.event.key"
            :href="item.event.href"
            class="ui-calendar__event"
            :class="{ 'is-highlighted': item.event.highlighted }"
            :style="style"
            ><span class="ui-calendar__time"
              >{{ timeText(item.start)
              }}<UiVisuallyHidden>–{{ timeText(item.end) }}</UiVisuallyHidden></span
            >
            <slot name="event" :event="item.event">{{ item.event.title }}</slot></component
          >
          <component
            :is="item.event.href ? (linkComponent ?? ui.linkComponent) : 'span'"
            v-for="{ item, style } in column.deadlines"
            :key="item.event.key"
            :href="item.event.href"
            class="ui-calendar__deadline"
            :style="style"
            ><span
              ><UiVisuallyHidden>{{ `${ui.messages.calendar.due} ` }}</UiVisuallyHidden
              >{{ timeText(item.start) }}
              <slot name="event" :event="item.event">{{ item.event.title }}</slot></span
            ></component
          >
        </div>
      </div>
    </template>
  </section>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

.ui-calendar {
  container: ui-calendar / inline-size;
  min-width: 0;
  border: 1px solid var(--color-line);
  border-radius: var(--radius-control);
  overflow: hidden;
}
.is-sunday {
  color: var(--color-danger);
}
.is-saturday {
  color: var(--color-info);
}
.ui-calendar__month {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;

  th {
    padding: 6px 0;
    color: var(--color-muted);
    font-size: 12px;
    font-weight: 400;
    text-align: center;

    &.is-sunday {
      color: var(--color-danger);
    }

    &.is-saturday {
      color: var(--color-info);
    }

    & + th {
      border-left: 1px solid var(--color-line);
    }
  }
}
.ui-calendar__day {
  height: 112px;
  padding: 0;
  border-top: 1px solid var(--color-line);
  vertical-align: top;
  cursor: pointer;

  & + & {
    border-left: 1px solid var(--color-line);
  }

  &:hover {
    background: var(--color-surface);
  }

  &[aria-selected='true'] {
    box-shadow: inset 0 0 0 2px var(--color-accent);
  }

  &:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: -2px;
  }

  @container ui-calendar (max-width: 560px) {
    height: 64px;
  }
}
.ui-calendar__cell {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 4px;
  padding: 6px 8px;

  // Muted rather than faded, so that days of the neighbouring months keep enough contrast.
  .is-outside & .ui-calendar__number:not(.is-today) {
    color: var(--color-muted);
  }

  .is-outside & .ui-calendar__chip {
    opacity: 0.6;
  }

  @container ui-calendar (max-width: 560px) {
    padding: 4px;
  }
}
.ui-calendar__number {
  display: inline-grid;
  width: 28px;
  height: 28px;
  place-items: center;
  border-radius: 50%;
  font-size: 15px;
  font-variant-numeric: tabular-nums;

  &.is-today {
    background: var(--color-accent);
    color: var(--color-on-accent);
    font-weight: 700;
  }
}
.ui-calendar__chip {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 5px;
  padding: 0 6px;
  border-radius: 3px;
  background: var(--color-surface);
  font-size: 12px;
  line-height: 1.75;

  &.is-highlighted {
    box-shadow: inset 3px 0 0 var(--color-accent);
  }

  @container ui-calendar (max-width: 560px) {
    padding: 4px;
  }
}
.ui-calendar__mark {
  width: 7px;
  height: 7px;
  flex: none;
  border-radius: 50%;
  background: var(--color-muted);

  &.is-deadline {
    border: 1.5px solid var(--color-muted);
    border-radius: 2px;
    background: transparent;
  }
}
.ui-calendar__chip-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @container ui-calendar (max-width: 560px) {
    display: none;
  }
}
.ui-calendar__more {
  color: var(--color-muted);
  font-size: 11px;
}
.ui-calendar__columns {
  display: grid;
  grid-template-columns: 52px repeat(var(--ui-calendar-columns, 7), minmax(0, 1fr));

  .ui-calendar--day & {
    --ui-calendar-columns: 1;
  }
}
.ui-calendar__heads,
.ui-calendar__all-day {
  border-bottom: 1px solid var(--color-line);
}
.ui-calendar--day .ui-calendar__heads {
  display: none;
}
.ui-calendar__head {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px 0;
  border: 0;
  border-left: 1px solid var(--color-line);
  background: transparent;
  color: var(--color-muted);
  font: inherit;
  font-size: 12px;
  cursor: pointer;

  &:hover,
  &[aria-pressed='true'] {
    background: var(--color-surface);
  }

  &:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: -2px;
  }
}
.ui-calendar__axis-label {
  padding: 6px 6px 0 0;
  color: var(--color-muted);
  font-size: 11px;
  text-align: right;
}
.ui-calendar__all-day-cell {
  display: flex;
  min-width: 0;
  min-height: 32px;
  flex-direction: column;
  gap: 2px;
  padding: 3px;
  border-left: 1px solid var(--color-line);
}
.ui-calendar__hours {
  display: flex;
  flex-direction: column;

  span {
    height: 44px;
    padding-right: 6px;
    color: var(--color-muted);
    font-size: 11px;
    line-height: 1;
    text-align: right;
    transform: translateY(-5px);
  }

  span:first-child {
    transform: none;
  }
}
.ui-calendar__track {
  position: relative;
  border-left: 1px solid var(--color-line);
  background-image: repeating-linear-gradient(
    to bottom,
    var(--color-line) 0,
    var(--color-line) 1px,
    transparent 1px,
    transparent 44px
  );

  &.is-today {
    background-color: color-mix(in srgb, var(--color-accent) 5%, transparent);
  }
}
.ui-calendar__event {
  position: absolute;
  overflow: hidden;
  padding: 2px 6px;
  border-left: 3px solid var(--color-muted);
  border-radius: 3px;
  background: var(--color-surface);
  color: var(--color-text);
  font-size: 12px;
  line-height: 1.4;
  text-decoration: none;
  overflow-wrap: anywhere;

  &.is-static {
    position: static;
  }

  &.is-highlighted {
    border-left-color: var(--color-accent);
  }

  &:is(a):hover {
    background: color-mix(in srgb, var(--color-surface) 70%, var(--color-line));
  }
}
.ui-calendar__time {
  display: inline-block;
  margin-right: 4px;
  white-space: nowrap;
  color: var(--color-muted);
  font-variant-numeric: tabular-nums;
}
.ui-calendar__deadline {
  position: absolute;
  right: 0;
  left: 0;
  height: 0;
  border-top: 2px dashed var(--color-muted);
  color: inherit;
  text-decoration: none;

  span {
    position: absolute;
    top: -11px;
    right: 4px;
    max-width: calc(100% - 8px);
    overflow: hidden;
    padding: 0 6px;
    border-radius: 999px;
    background: var(--color-warning-surface);
    color: var(--color-warning);
    font-size: 11px;
    font-weight: 600;
    line-height: 20px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
