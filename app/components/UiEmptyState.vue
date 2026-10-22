<script setup lang="ts">
import type { UiIconName } from '../lib/icons'
import UiIcon from './UiIcon.vue'

withDefaults(
  defineProps<{
    title: string
    description?: string
    icon?: UiIconName
    headingLevel?: 2 | 3 | 4
  }>(),
  { description: undefined, icon: undefined, headingLevel: 3 },
)
</script>

<template>
  <div class="ui-empty-state">
    <UiIcon v-if="icon" class="ui-empty-state__icon" :name="icon" />
    <component :is="`h${headingLevel}`" class="ui-empty-state__title">{{ title }}</component>
    <p v-if="description" class="ui-empty-state__description">{{ description }}</p>
    <slot />
    <div v-if="$slots.actions" class="ui-empty-state__actions"><slot name="actions" /></div>
  </div>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

.ui-empty-state {
  padding: var(--space-8) var(--space-2);
  color: var(--color-muted);
}
.ui-empty-state__icon {
  width: 24px;
  height: 24px;
  margin-bottom: var(--space-3);
}
.ui-empty-state__title {
  margin: 0;
  color: var(--color-text);
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
}
.ui-empty-state__description {
  margin: var(--space-1) 0 0;
}
.ui-empty-state__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-4);
}
</style>
