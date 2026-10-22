<script setup lang="ts">
import { shallowRef } from 'vue'
import { UiButton, UiPhotoAlbumViewer } from '@wing-land/ui'
import sample from './assets/sample.svg'
const viewer = shallowRef<{
  open: (album: { title: string; photos: { src: string; alt: string }[] }) => void
} | null>(null)
</script>
<template>
  <div class="demo">
    <UiButton
      @click="
        viewer?.open({
          title: 'Mountain photos',
          photos: [
            { src: sample, alt: 'Abstract illustration of mountains' },
            { src: sample, alt: 'Second illustration' },
          ],
        })
      "
      >View photos</UiButton
    ><UiPhotoAlbumViewer ref="viewer" />
  </div>
</template>
<style scoped>
.demo {
  padding: 1rem 0;
}
</style>
