<script setup lang="ts">
import { UiArticleEnding } from '@wing-land/ui'
</script>
<template>
  <div class="demo">
    <UiArticleEnding
      list-href="/"
      :older="{ href: '/', title: 'Previous post', publishedAt: '2026-10-01' }"
      :newer="{ href: '/UiButton', title: 'Next post without a date' }"
    />
  </div>
</template>
<style scoped>
.demo {
  padding: 1rem 0;
}
</style>
