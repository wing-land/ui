<script setup lang="ts">
import { shallowRef } from 'vue'
import { UiButton, UiDrawer } from '@wing-land/ui'
const navigation = shallowRef(false)
const backlinks = shallowRef(false)
</script>
<template>
  <div class="demo">
    <UiButton icon="menu" @click="navigation = true">Navigation</UiButton>
    <UiButton @click="backlinks = true">Backlinks</UiButton>
    <UiDrawer v-model:open="navigation" title="Workspace">
      <p>Inbox, projects and archived notes.</p>
    </UiDrawer>
    <UiDrawer v-model:open="backlinks" side="end" title="Backlinks" size="large">
      <p>3 notes link to this note.</p>
    </UiDrawer>
  </div>
</template>
<style scoped>
.demo {
  display: flex;
  gap: 8px;
  padding: 1rem 0;
}
</style>
