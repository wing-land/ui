<script setup lang="ts">
import { UiSidebarNav } from '@wing-land/ui'
</script>
<template>
  <div class="demo">
    <UiSidebarNav
      navigation-label="Pages"
      current-href="#components"
      :groups="[
        {
          label: 'Guide',
          items: [
            { href: '#start', label: 'Getting started' },
            { href: '#components', label: 'Components' },
          ],
        },
        {
          label: 'Reference',
          items: [{ href: '#design', label: 'Design and tokens' }],
        },
      ]"
    />
  </div>
</template>

<style scoped>
.demo {
  width: 240px;
  padding: 1rem 10px;
}
</style>
