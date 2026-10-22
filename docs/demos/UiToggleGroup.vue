<script setup lang="ts">
import { shallowRef } from 'vue'
import { UiToggleGroup } from '@wing-land/ui'
const single = shallowRef<string | null>(null)
const scopes = shallowRef<readonly string[]>(['read'])
</script>
<template>
  <div class="demo">
    <UiToggleGroup v-model="single" :items="['Vue', 'Nuxt', 'CSS']" label="Tags" all-option />
    <UiToggleGroup
      v-model="scopes"
      multiple
      label="Scopes"
      :items="[
        { value: 'read', label: 'Read', count: 12 },
        { value: 'write', label: 'Write', count: 3 },
        { value: 'admin', label: 'Admin', disabled: true },
      ]"
    />
    <p>Single: {{ single ?? 'All' }} / Multiple: {{ scopes.join(', ') || 'None' }}</p>
  </div>
</template>
<style scoped>
.demo {
  display: grid;
  gap: 16px;
  padding: 1rem 0;
}
</style>
