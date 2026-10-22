<script setup lang="ts">
import { UiBreadcrumb } from '@wing-land/ui'
</script>
<template>
  <div class="demo">
    <UiBreadcrumb
      :items="[
        { label: 'Workspace', href: '/' },
        { label: 'Projects', href: '/projects' },
        { label: 'Roadmap' },
      ]"
    />
  </div>
</template>
<style scoped>
.demo {
  padding: 1rem 0;
}
</style>
