<script setup lang="ts">
import { shallowRef } from 'vue'
import { UiTagFilter } from '@wing-land/ui'
const selected = shallowRef<string | null>(null)
</script>
<template>
  <div class="demo">
    <UiTagFilter v-model="selected" :tags="['Vue', 'Nuxt']" label="Filter by tag" />
    <p>Selected: {{ selected ?? 'All' }}</p>
  </div>
</template>
<style scoped>
.demo {
  padding: 1rem 0;
}
</style>
