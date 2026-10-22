<script setup lang="ts">
import { isExternalHref } from '../../../app/lib/config'

const props = defineProps<{ href: string }>()

// Demo links point at app routes that do not exist on the docs site, so clicking them does nothing.
function onClick(event: MouseEvent) {
  if (!isExternalHref(props.href) && !props.href.startsWith('#')) event.preventDefault()
}
</script>

<template>
  <!-- `vp-raw` keeps VitePress's router, which handles clicks before this link does, away from it. -->
  <a class="vp-raw" :href="href" @click="onClick"><slot /></a>
</template>
