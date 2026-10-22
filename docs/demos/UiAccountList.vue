<script setup lang="ts">
import { UiAccountList } from '@wing-land/ui'
import sample from './assets/sample.svg'
const items = [
  { href: 'https://github.com', label: 'GitHub', iconSrc: sample },
  { href: 'https://example.com/feed', label: 'Feed', iconSrc: sample },
  { href: 'https://example.com/mail', label: 'Mail', iconSrc: sample },
  { href: 'https://example.com/blog', label: 'Blog', iconSrc: sample },
]
</script>
<template>
  <div class="demo">
    <UiAccountList :items="items.slice(0, 2)" />
    <UiAccountList :items="items" variant="tiles" :columns="2" />
  </div>
</template>
<style scoped>
.demo {
  display: grid;
  gap: 24px;
  padding: 1rem 0;
}
</style>
