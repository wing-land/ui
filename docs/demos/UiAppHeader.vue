<script setup lang="ts">
import { shallowRef } from 'vue'
import { UiAppHeader, UiButton, UiConnectionStatus, UiThemePicker } from '@wing-land/ui'
const theme = shallowRef('system')
const menuCount = shallowRef(0)
</script>
<template>
  <div class="demo">
    <UiAppHeader
      brand-href="/"
      brand-label="Docs home"
      :navigation="[
        { href: '/guide', label: 'Guide' },
        { href: '/components', label: 'Components' },
      ]"
      active-href="/components"
    >
      <template #brand>Docs</template>
      <template #actions><UiThemePicker v-model="theme" /></template>
    </UiAppHeader>
    <UiAppHeader menu @menu="menuCount++">
      <template #brand>Sample</template>
      <UiConnectionStatus status="connected" compact />
      <template #actions><UiButton size="sm">Share</UiButton></template>
    </UiAppHeader>
    <p>Menu pressed {{ menuCount }} times.</p>
  </div>
</template>
<style scoped>
.demo {
  display: grid;
  gap: 16px;
  padding: 1rem 0;
}
p {
  margin: 0;
  color: var(--color-muted);
  font-size: 14px;
}
</style>
