<script setup lang="ts">
import { UiArticleToc } from '@wing-land/ui'
</script>
<template>
  <div class="demo">
    <UiArticleToc
      :links="[
        {
          id: 'demo-overview',
          text: 'Overview',
          children: [{ id: 'demo-details', text: 'Details' }],
        },
      ]"
      :depth="3"
      layout="inline"
    />
    <p id="demo-overview">Overview</p>
    <p id="demo-details">Details</p>
  </div>
</template>
<style scoped>
.demo {
  padding: 1rem 0;
}
</style>
