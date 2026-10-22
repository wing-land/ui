<script setup lang="ts">
import { shallowRef } from 'vue'
import { UiButton, UiDropdownMenu, type UiMenuItem } from '@wing-land/ui'
const last = shallowRef('—')
const items: UiMenuItem[] = [
  { type: 'label', label: 'Note' },
  { label: 'Rename', value: 'rename', icon: 'edit', shortcut: 'F2' },
  { label: 'Copy link', value: 'copy-link', icon: 'copy' },
  { label: 'Open example.com', href: 'https://example.com/', icon: 'external' },
  { type: 'separator' },
  { label: 'Archive', value: 'archive', disabled: true },
  { label: 'Delete', value: 'delete', tone: 'danger' },
]
</script>
<template>
  <div class="demo">
    <UiDropdownMenu :items="items" @select="last = $event">
      <template #trigger>
        <UiButton icon="more" label="Note actions" />
      </template>
    </UiDropdownMenu>
    <p>Selected: {{ last }}</p>
  </div>
</template>
<style scoped>
.demo {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 1rem 0;
}
p {
  margin: 0;
}
</style>
