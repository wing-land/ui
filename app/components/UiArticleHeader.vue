<script setup lang="ts">
import { useUiConfig } from '../lib/config'
import type { UiDateInput } from '../lib/date'
import UiPostDate from './UiPostDate.vue'

withDefaults(
  defineProps<{
    title: string
    publishedAt?: UiDateInput
    updatedAt?: UiDateInput
    datesLabel?: string
  }>(),
  { publishedAt: undefined, updatedAt: undefined, datesLabel: undefined },
)
const ui = useUiConfig()
</script>

<template>
  <header class="ui-article-header">
    <h1>{{ title }}</h1>
    <div
      v-if="publishedAt || updatedAt"
      class="article-meta"
      :aria-label="datesLabel ?? ui.messages.date.dates"
    >
      <UiPostDate v-if="publishedAt" :date="publishedAt" kind="published" />
      <UiPostDate v-if="updatedAt" :date="updatedAt" kind="updated" />
    </div>
  </header>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

.ui-article-header {
  margin-bottom: 32px;

  // Low specificity so the prose.css heading size still applies inside `.prose`.
  :where(h1) {
    font-size: clamp(26px, 3vw, 32px);
    line-height: 1.5;
    font-weight: 600;
  }

  .article-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 20px;
    color: var(--color-muted);
    font-size: 14px;
  }
}
</style>
