<script setup lang="ts">
import { UiLink } from '@wing-land/ui'
</script>
<template>
  <div class="demo">
    <p>
      <UiLink href="/UiButton">Internal link (rendered with the configured link component)</UiLink>
    </p>
    <p><UiLink href="https://example.com">External link (detected automatically)</UiLink></p>
    <p><UiLink href="/UiButton" external>Marked with external</UiLink></p>
  </div>
</template>
<style scoped>
.demo {
  padding: 1rem 0;
}
</style>
