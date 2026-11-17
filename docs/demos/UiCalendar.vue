<script setup lang="ts">
import { UiCalendar, UiTabs } from '@wing-land/ui'
import { ref } from 'vue'

const date = ref('2026-11-16')
const view = ref<'month' | 'week' | 'day'>('month')
const views = [
  { value: 'month', label: 'Month' },
  { value: 'week', label: 'Week' },
  { value: 'day', label: 'Day' },
]
const events = [
  { key: 'release', title: 'Release week', start: '2026-11-16', end: '2026-11-21' },
  {
    key: 'meeting',
    title: 'Weekly meeting',
    start: '2026-11-16T10:00',
    end: '2026-11-16T11:00',
    href: '#meeting',
  },
  {
    key: 'review',
    title: 'Design review',
    start: '2026-11-16T10:30',
    end: '2026-11-16T12:00',
    highlighted: true,
  },
  { key: 'report', title: 'Send the report', start: '2026-11-16T18:00', kind: 'deadline' as const },
  { key: 'reading', title: 'Reading club', start: '2026-11-19T19:00', end: '2026-11-19T20:30' },
]
</script>
<template>
  <div class="demo">
    <UiTabs v-model="view" :items="views" label="Period" />
    <UiCalendar
      v-model:date="date"
      :view="view"
      :events="events"
      today="2026-11-16"
      label="November 2026"
    />
  </div>
</template>
<style scoped>
.demo {
  display: grid;
  gap: 12px;
  padding: 1rem 0;
}
</style>
