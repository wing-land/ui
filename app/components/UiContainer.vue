<template>
  <div class="ui-container"><slot /></div>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

.ui-container {
  width: min(var(--width-site), calc(100% - 2 * var(--gutter)));
  margin-inline: auto;
}
</style>
