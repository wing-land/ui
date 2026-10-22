<script setup lang="ts">
import { provideUiConfig, type UiConfigInput } from '../lib/config'

const props = defineProps<{ config: UiConfigInput }>()
provideUiConfig(() => props.config)
</script>

<template>
  <slot />
</template>
