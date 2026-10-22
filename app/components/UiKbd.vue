<script setup lang="ts">
defineSlots<{ default?: () => unknown }>()
</script>

<template>
  <kbd class="ui-kbd"><slot /></kbd>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

.ui-kbd {
  display: inline-block;
  min-width: 1.6em;
  padding: 0 0.4em;
  border: 1px solid var(--color-line);
  border-bottom-width: 3px;
  border-radius: var(--radius-control);
  background: var(--color-field);
  color: var(--color-text);
  font-family: var(--font-mono);
  font-size: 0.8125em;
  line-height: 1.6;
  text-align: center;
  white-space: nowrap;
}
</style>
