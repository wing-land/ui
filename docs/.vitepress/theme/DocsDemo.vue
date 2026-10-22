<script setup lang="ts">
import { computed, defineAsyncComponent, type Component } from 'vue'
import UiConfigProvider from '../../../app/components/UiConfigProvider.vue'
import { en } from '../../../app/lib/messages'
import DocsDemoLink from './DocsDemoLink.vue'

// Article components are shown with the prose styles they are designed for.
const props = defineProps<{ name: string; prose?: boolean }>()
const demos = import.meta.glob<{ default: Component }>('../../demos/*.vue')
const demo = computed(() => {
  const load = demos[`../../demos/${props.name}.vue`]
  if (!load) throw new Error(`Unknown demo: ${props.name}`)
  return defineAsyncComponent(load)
})
// Demos show the library defaults, so they use English even though the docs are in Japanese.
const config = { locale: en, linkComponent: DocsDemoLink }
</script>

<template>
  <div class="docs-demo" :class="{ 'ui-not-prose': !prose }">
    <UiConfigProvider :config="config"><component :is="demo" /></UiConfigProvider>
  </div>
</template>

<style scoped>
.docs-demo {
  margin-block: 16px 32px;
  padding: 8px 20px;
  border: 1px solid var(--color-line);
  border-radius: 4px;
  overflow-wrap: anywhere;
}

@media (max-width: 600px) {
  .docs-demo {
    padding-inline: 12px;
  }
}
</style>
