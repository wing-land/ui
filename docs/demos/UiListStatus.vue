<script setup lang="ts">
import { shallowRef } from 'vue'
import { UiListStatus } from '@wing-land/ui'
const retryCount = shallowRef(0)
</script>
<template>
  <div class="demo">
    <UiListStatus kind="error" message="Could not load items." @retry="retryCount++" />
    <p>Retries: {{ retryCount }}</p>
  </div>
</template>
<style scoped>
.demo {
  padding: 1rem 0;
}
</style>
