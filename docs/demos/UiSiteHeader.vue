<script setup lang="ts">
import { UiAvatar, UiSiteHeader } from '@wing-land/ui'
</script>
<template>
  <div class="demo">
    <UiSiteHeader
      :navigation="[
        { href: '/', label: 'Examples' },
        { href: '/UiSiteHeader', label: 'Header' },
        { href: '/UiButton', label: 'Button' },
      ]"
      brand-href="/"
      brand-label="Sample home"
      active-href="/UiSiteHeader"
      collapsible
    >
      <template #brand>Sample</template>
      <template #user><UiAvatar name="Ada Lovelace" :size="32" /></template>
    </UiSiteHeader>
    <p>At 600px wide or less, the menu button opens and closes the navigation.</p>
  </div>
</template>
<style scoped>
.demo {
  padding: 1rem 0;
}
</style>
