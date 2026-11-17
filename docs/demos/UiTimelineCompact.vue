<script setup lang="ts">
import { UiBadge, UiTimeline } from '@wing-land/ui'

const items = [
  {
    date: '2026-11-16',
    dateLabel: 'All day',
    title: 'Release week',
    href: '#release',
    tone: 'neutral',
  },
  {
    date: '2026-11-16T10:00',
    dateLabel: '10:00',
    title: 'Weekly meeting',
    href: '#meeting',
    filled: true,
    tone: 'info',
  },
  {
    date: '2026-11-16T18:00',
    dateLabel: '18:00',
    title: 'Send the report',
    href: '#report',
    tone: 'warning',
  },
] as const
</script>
<template>
  <div class="demo">
    <UiTimeline :items="items" density="compact">
      <template #meta="{ item }">
        <UiBadge :tone="item.tone">{{ item.tone === 'warning' ? 'Due' : 'Event' }}</UiBadge>
      </template>
    </UiTimeline>
  </div>
</template>
<style scoped>
.demo {
  max-width: 420px;
  padding: 1rem 0;
}
</style>
