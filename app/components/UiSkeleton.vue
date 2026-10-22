<script setup lang="ts">
withDefaults(
  defineProps<{
    /** Number of text lines. The last line is shorter so the block reads as a paragraph. */
    lines?: number
    width?: string
    height?: string
  }>(),
  { lines: 1, width: '100%', height: '1em' },
)
</script>

<template>
  <span class="ui-skeleton" aria-hidden="true">
    <span
      v-for="line in lines"
      :key="line"
      class="ui-skeleton__line"
      :style="{ width: line === lines && lines > 1 ? '60%' : width, height }"
    />
  </span>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

.ui-skeleton {
  display: grid;
  gap: 0.6em;
}
.ui-skeleton__line {
  display: block;
  max-width: 100%;
  border-radius: var(--radius-control);
  background: var(--color-surface);
}
</style>
