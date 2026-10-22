<script setup lang="ts">
import { UiSpinner } from '@wing-land/ui'
</script>
<template>
  <div class="demo">
    <UiSpinner label="Loading" />
    <span><UiSpinner /> Syncing</span>
    <UiSpinner :size="32" />
  </div>
</template>
<style scoped>
.demo {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 1rem 0;
}
</style>
