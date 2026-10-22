<script setup lang="ts">
import { UiButton, UiToaster, useToast } from '@wing-land/ui'
const toast = useToast()

function save() {
  toast.promise(new Promise((resolve) => setTimeout(resolve, 1200)), {
    loading: 'Saving…',
    success: 'Saved',
    error: 'Could not save',
  })
}
</script>
<template>
  <div class="demo">
    <UiButton @click="toast.show({ title: 'Link copied', tone: 'success', important: true })"
      >Copy link</UiButton
    >
    <UiButton
      @click="
        toast.show({
          title: 'Note archived',
          description: 'You can restore it from the archive.',
          action: { label: 'Undo', altText: 'Open the archive to restore the note' },
        })
      "
      >Archive</UiButton
    >
    <UiButton @click="save">Save</UiButton>
    <UiButton
      @click="
        toast.show({
          id: 'offline',
          title: 'Offline',
          description: 'Changes are kept on this device.',
          tone: 'warning',
          duration: 0,
        })
      "
      >Go offline</UiButton
    >
    <!-- Place one UiToaster near the root of the app. -->
    <UiToaster />
  </div>
</template>
<style scoped>
.demo {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 1rem 0;
}
</style>
