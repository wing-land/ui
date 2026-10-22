<script setup lang="ts">
import { nextTick, shallowRef, watch } from 'vue'
import { useUiConfig } from '../lib/config'
import UiButton from './UiButton.vue'

const props = withDefaults(
  defineProps<{
    loading?: boolean
    /** When false, the button is removed. */
    hasMore?: boolean
    label?: string
    /** Announced when it changes, such as "Showing 40 of 120". */
    status?: string
  }>(),
  { hasMore: true, label: undefined, status: undefined },
)
const emit = defineEmits<{ load: [] }>()

const ui = useUiConfig()
const root = shallowRef<HTMLElement | null>(null)
const statusElement = shallowRef<HTMLElement | null>(null)

// When the last page arrives the focused button disappears, so keep focus nearby.
watch(
  () => props.hasMore,
  async (hasMore) => {
    if (hasMore || !root.value?.contains(document.activeElement)) return
    await nextTick()
    statusElement.value?.focus()
  },
  { flush: 'pre' },
)
</script>

<template>
  <div ref="root" class="ui-load-more">
    <p ref="statusElement" class="ui-load-more__status" role="status" tabindex="-1">
      {{ status }}
    </p>
    <UiButton v-if="hasMore" :loading="loading" @click="emit('load')">{{
      label ?? ui.messages.list.loadMore
    }}</UiButton>
  </div>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

.ui-load-more {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  margin-block: var(--space-6);
}
.ui-load-more__status {
  margin: 0;
  color: var(--color-muted);
  font-size: var(--font-size-small);

  &:focus {
    outline: none;
  }
}
</style>
