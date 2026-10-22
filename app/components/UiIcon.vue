<script setup lang="ts">
import { computed } from 'vue'
import { uiIcons, type UiIconName } from '../lib/icons'

const props = defineProps<{ name: UiIconName; label?: string; size?: string | number }>()
const icon = computed(() => uiIcons[props.name])
</script>

<template>
  <svg
    class="ui-icon"
    :viewBox="icon.viewBox"
    :width="size ?? '1em'"
    :height="size ?? '1em'"
    fill="none"
    stroke="currentColor"
    :stroke-width="icon.strokeWidth"
    stroke-linecap="round"
    stroke-linejoin="round"
    :role="label ? 'img' : undefined"
    :aria-label="label || undefined"
    :aria-hidden="label ? undefined : 'true'"
    focusable="false"
  >
    <path v-for="path in icon.paths" :key="path" :d="path" />
  </svg>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

.ui-icon {
  flex: none;
  vertical-align: -0.125em;
}
</style>
