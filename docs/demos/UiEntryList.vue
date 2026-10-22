<script setup lang="ts">
import { UiEntryList } from '@wing-land/ui'
</script>
<template>
  <div class="demo">
    <UiEntryList
      :items="[
        { href: '/', title: 'Post title', description: 'A short description.', date: '2026-10-01' },
        { href: '/UiButton', title: 'Item with metadata', date: '2026-09-20', key: 'meta' },
        { href: 'https://example.com', title: 'External page', external: true },
      ]"
    >
      <template #meta="{ item }">
        <span v-if="item.key === 'meta'">Tags: Vue, Nuxt</span>
      </template>
    </UiEntryList>
  </div>
</template>
<style scoped>
.demo {
  padding: 1rem 0;
}
</style>
