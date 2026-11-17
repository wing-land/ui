<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    /** Progress from 0 to `max`. Omit it, or pass `null`, while the total is unknown. */
    value?: number | null
    max?: number
    /** Accessible name, such as "Uploading review-board.png". */
    label: string
  }>(),
  { value: null, max: 100 },
)

const ratio = computed(() =>
  props.value === null
    ? null
    : Math.min(1, Math.max(0, props.value / (props.max > 0 ? props.max : 100))),
)
</script>

<template>
  <div
    class="ui-progress"
    :class="{ 'is-indeterminate': ratio === null }"
    role="progressbar"
    :aria-label="label"
    aria-valuemin="0"
    :aria-valuemax="max"
    :aria-valuenow="ratio === null ? undefined : (value ?? undefined)"
  >
    <span
      class="ui-progress__bar"
      :style="ratio === null ? undefined : { width: `${ratio * 100}%` }"
    />
  </div>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

.ui-progress {
  position: relative;
  display: block;
  width: 100%;
  height: 6px;
  overflow: hidden;
  border-radius: 999px;
  background: var(--color-surface);
}
.ui-progress__bar {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: var(--color-accent);
  transition: width 200ms ease-out;
}
.is-indeterminate .ui-progress__bar {
  width: 40%;
  animation: ui-progress-slide 1.2s ease-in-out infinite;
}
@keyframes ui-progress-slide {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(250%);
  }
}
@media (prefers-reduced-motion: reduce) {
  .ui-progress__bar {
    transition: none;
  }
  .is-indeterminate .ui-progress__bar {
    animation: none;
  }
}
</style>
