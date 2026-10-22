<script setup lang="ts">
import UiToggleGroup from './UiToggleGroup.vue'

defineProps<{ tags: readonly string[]; label: string; allLabel?: string }>()
const selected = defineModel<string | null>({ required: true })
</script>

<template>
  <UiToggleGroup
    :model-value="selected"
    class="ui-tag-filter"
    :items="tags"
    :label="label"
    :all-option="allLabel ?? true"
    @update:model-value="selected = $event as string | null"
  />
</template>
