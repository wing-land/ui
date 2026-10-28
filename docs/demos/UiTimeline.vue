<script setup lang="ts">
import { UiTimeline } from '@wing-land/ui'
</script>
<template>
  <div class="demo">
    <UiTimeline
      :items="[
        { date: '2026-10', title: 'Launched', description: 'First public release' },
        {
          date: '2026-08',
          title: 'Public beta',
          description: 'Opened sign-ups to everyone',
          filled: true,
        },
        { date: '2026-05', title: 'Private beta' },
      ]"
    />
  </div>
</template>
<style scoped>
.demo {
  padding: 1rem 0;
}
</style>
