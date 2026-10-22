<script setup lang="ts">
import { UiSkeleton } from '@wing-land/ui'
</script>
<template>
  <div class="demo" aria-busy="true">
    <UiSkeleton width="40%" height="1.5em" />
    <UiSkeleton :lines="3" />
  </div>
</template>
<style scoped>
.demo {
  display: grid;
  gap: 16px;
  max-width: 480px;
  padding: 1rem 0;
}
</style>
