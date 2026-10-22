<script setup lang="ts">
import { shallowRef } from 'vue'
import {
  createIntlDateFormatter,
  ja,
  UiConfigProvider,
  UiPostDate,
  UiTagFilter,
} from '@wing-land/ui'
const tag = shallowRef<string | null>(null)
const config = { locale: ja, formatDate: createIntlDateFormatter({ dateStyle: 'long' }) }
</script>
<template>
  <div class="demo">
    <section>
      <p class="label">Default (en)</p>
      <UiPostDate date="2026-10-20" kind="published" />
      <UiTagFilter v-model="tag" :tags="['Vue', 'Nuxt']" label="Tags" />
    </section>
    <UiConfigProvider :config="config">
      <section>
        <p class="label">ja + Intl dates</p>
        <UiPostDate date="2026-10-20" kind="published" />
        <UiTagFilter v-model="tag" :tags="['Vue', 'Nuxt']" label="タグ" />
      </section>
    </UiConfigProvider>
  </div>
</template>
<style scoped>
.demo {
  display: grid;
  gap: 24px;
  padding: 1rem 0;
}
section {
  display: grid;
  gap: 12px;
  justify-items: start;
}
p.label {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}
</style>
