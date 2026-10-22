<script setup lang="ts">
import { useUiConfig } from '../lib/config'
import type { UiDateInput } from '../lib/date'
import UiDate from './UiDate.vue'

defineProps<{ date: UiDateInput; kind: 'published' | 'updated'; label?: string }>()
const ui = useUiConfig()
</script>

<template>
  <UiDate
    class="post-date ui-post-date"
    :date="date"
    :kind="kind"
    :label="label ?? ui.messages.date[kind]"
    :icon="kind === 'published' ? 'calendar' : 'edit'"
  />
</template>
