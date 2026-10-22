<script setup lang="ts">
import { UiDate } from '@wing-land/ui'
// A fixed clock keeps the example reading "5 minutes ago" whenever the page is opened.
const now = new Date('2026-10-20T12:00:00Z')
</script>
<template>
  <div class="demo">
    <UiDate date="2026-10-20" />
    <UiDate date="2026-10-20T01:23:45Z" kind="updated" label="Updated" icon="edit" />
    <UiDate date="2026-10-20T11:55:00Z" label="Last synced" relative :now="now" />
  </div>
</template>
<style scoped>
.demo {
  display: grid;
  gap: 8px;
  justify-items: start;
  padding: 1rem 0;
}
</style>
