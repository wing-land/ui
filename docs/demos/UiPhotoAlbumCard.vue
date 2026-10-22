<script setup lang="ts">
import { shallowRef } from 'vue'
import { UiPhotoAlbumCard } from '@wing-land/ui'
import sample from './assets/sample.svg'
const openCount = shallowRef(0)
</script>
<template>
  <div class="demo">
    <UiPhotoAlbumCard
      :cover="sample"
      cover-alt="Abstract illustration of mountains"
      title="Mountain photos"
      count-label="2 photos"
      :tags="['Nature']"
      open-label="Open the mountain photos album"
      @click="openCount++"
    />
    <p>Opened: {{ openCount }}</p>
  </div>
</template>
<style scoped>
.demo {
  padding: 1rem 0;
}
</style>
