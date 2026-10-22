<script setup lang="ts">
import { UiAvatarGroup } from '@wing-land/ui'
import sample from './assets/sample.svg'
const editors = [
  { name: 'Margaret Hamilton', src: sample },
  { name: 'Ada Lovelace' },
  { name: 'Grace Hopper' },
  { name: 'Alan Turing' },
  { name: 'Barbara Liskov' },
  { name: 'Ken Thompson' },
]
</script>
<template>
  <div class="demo">
    <UiAvatarGroup :items="editors" label="People editing this note" />
    <UiAvatarGroup :items="editors.slice(0, 3)" label="Viewers" :size="24" />
  </div>
</template>
<style scoped>
.demo {
  display: grid;
  gap: 16px;
  justify-items: start;
  padding: 1rem 0;
}
</style>
