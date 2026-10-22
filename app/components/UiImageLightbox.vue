<script setup lang="ts">
import { shallowRef } from 'vue'
import { useUiConfig } from '../lib/config'
import UiModal from './UiModal.vue'

defineProps<{ src: string; alt: string; caption?: string; label?: string }>()
const ui = useUiConfig()
const modal = shallowRef<{ open: () => void } | null>(null)
const isOpen = shallowRef(false)
</script>

<template>
  <button
    class="image-trigger ui-image-lightbox"
    type="button"
    :aria-label="ui.messages.image.viewLarger(alt)"
    @click="modal?.open()"
  >
    <slot />
  </button>
  <UiModal
    ref="modal"
    :label="label ?? ui.messages.image.preview"
    size="large"
    @open="isOpen = true"
    @close="isOpen = false"
  >
    <template v-if="caption" #header
      ><p class="image-caption">{{ caption }}</p></template
    >
    <img v-if="isOpen" class="image-preview" :src="src" :alt="alt" />
  </UiModal>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

.image-trigger {
  display: block;
  width: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  text-align: left;
  cursor: zoom-in;
}
.image-caption {
  margin: 0;
  color: var(--color-muted);
  font-size: 14px;
  line-height: 1.6;
  overflow-wrap: anywhere;
}
.image-preview {
  display: block;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: calc(100dvh - 104px);
  margin-inline: auto;
  object-fit: contain;
}
</style>
