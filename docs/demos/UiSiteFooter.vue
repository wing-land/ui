<script setup lang="ts">
import { UiSiteFooter } from '@wing-land/ui'
</script>
<template>
  <div class="demo">
    <UiSiteFooter :links="[{ href: 'https://example.com', label: 'Example', external: true }]"
      ><template #brand>Sample</template></UiSiteFooter
    >
  </div>
</template>
<style scoped>
.demo {
  padding: 1rem 0;
}
</style>
