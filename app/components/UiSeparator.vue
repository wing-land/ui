<script setup lang="ts">
withDefaults(
  defineProps<{
    orientation?: 'horizontal' | 'vertical'
    /** Hides the line from assistive technology when it only separates visually. */
    decorative?: boolean
  }>(),
  { orientation: 'horizontal' },
)
</script>

<template>
  <div
    class="ui-separator"
    :class="`ui-separator--${orientation}`"
    :role="decorative ? 'none' : 'separator'"
    :aria-orientation="!decorative && orientation === 'vertical' ? 'vertical' : undefined"
  />
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

.ui-separator {
  flex: none;
  background: var(--color-line);

  &--horizontal {
    height: 1px;
    margin-block: var(--space-4);
  }

  &--vertical {
    align-self: stretch;
    width: 1px;
    min-height: 1em;
    margin-inline: var(--space-2);
  }
}
</style>
