<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, shallowRef } from 'vue'
import { useUiConfig } from '../lib/config'
import { toDateTimeAttribute, type UiDateInput } from '../lib/date'
import type { UiIconName } from '../lib/icons'
import { formatRelativeTime } from '../lib/relative-time'
import UiIcon from './UiIcon.vue'

const props = withDefaults(
  defineProps<{
    date: UiDateInput
    /** Passed to the configured date formatter, for example `published` or `updated`. */
    kind?: string
    /** What the date means. Shown as a tooltip and read before the date. */
    label?: string
    icon?: UiIconName
    /** Shows "3 minutes ago" after hydration. The server always renders the absolute date. */
    relative?: boolean
    /** Fixed reference time for relative output, mainly for tests. */
    now?: Date
  }>(),
  { kind: undefined, label: undefined, icon: undefined, now: undefined },
)
const ui = useUiConfig()
const mounted = shallowRef(false)
const tick = shallowRef(Date.now())
let timer: ReturnType<typeof setInterval> | undefined

const parsed = computed(() => {
  const value = props.date instanceof Date ? props.date : new Date(props.date)
  return Number.isNaN(value.getTime()) ? null : value
})
const absolute = computed(() => ui.value.formatDate(props.date, props.kind))
const showRelative = computed(() => props.relative && mounted.value && parsed.value)
const display = computed(() =>
  showRelative.value
    ? formatRelativeTime(parsed.value!, props.now ?? new Date(tick.value), ui.value.locale)
    : absolute.value,
)
const fullDate = computed(() => {
  if (!parsed.value) return absolute.value
  return new Intl.DateTimeFormat(ui.value.locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: ui.value.timeZone,
  }).format(parsed.value)
})
const title = computed(() =>
  showRelative.value ? [props.label, fullDate.value].filter(Boolean).join(': ') : props.label,
)

onMounted(() => {
  mounted.value = true
  if (props.relative && !props.now) timer = setInterval(() => (tick.value = Date.now()), 60_000)
})
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <time
    class="ui-date"
    :datetime="toDateTimeAttribute(date)"
    :title="title"
    :aria-label="label ? `${label}: ${display}` : undefined"
  >
    <UiIcon v-if="icon" :name="icon" />
    <span :aria-hidden="label ? 'true' : undefined">{{ display }}</span>
  </time>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

.ui-date {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  color: var(--color-muted);
  font-size: var(--font-size-small);
  font-variant-numeric: tabular-nums;

  .ui-icon {
    width: 16px;
    height: 16px;
  }
}
</style>
