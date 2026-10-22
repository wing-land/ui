<script setup lang="ts">
import UiImageLightbox from './UiImageLightbox.vue'
defineProps<{ src: string; alt: string; caption?: string }>()
</script>

<template>
  <figure class="ui-figure">
    <UiImageLightbox :src="src" :alt="alt" :caption="caption"><slot /></UiImageLightbox>
    <figcaption v-if="caption">{{ caption }}</figcaption>
  </figure>
</template>
