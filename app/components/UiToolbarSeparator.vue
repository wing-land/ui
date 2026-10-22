<script setup lang="ts">
import { ToolbarSeparator } from 'reka-ui'
</script>

<template>
  <ToolbarSeparator class="ui-toolbar-separator" />
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

.ui-toolbar-separator {
  align-self: stretch;
  width: 1px;
  margin: 4px;
  background: var(--color-line);

  .ui-toolbar--vertical & {
    width: auto;
    height: 1px;
  }
}
</style>
