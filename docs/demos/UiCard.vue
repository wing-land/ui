<script setup lang="ts">
import { UiCard } from '@wing-land/ui'
</script>
<template>
  <div class="demo">
    <UiCard href="/">
      <span class="ui-card__title">Link card</span>
      <span>The whole card is one link.</span>
    </UiCard>
    <UiCard href="/">
      <template #media>
        <svg viewBox="0 0 160 80" aria-hidden="true">
          <rect width="160" height="80" class="media-fill" />
          <circle cx="80" cy="40" r="16" class="media-mark" />
        </svg>
      </template>
      <span class="ui-card__title">Card with media</span>
      <span>An image or illustration spans the top edge to edge.</span>
    </UiCard>
    <UiCard button>
      <span class="ui-card__title">Button card</span>
      <span>Choosing it runs an action.</span>
    </UiCard>
    <UiCard>
      <strong>Static card</strong>
      <span>A group of information with no action.</span>
    </UiCard>
  </div>
</template>
<style scoped>
.demo {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  padding: 1rem 0;
}
.ui-card__title {
  font-weight: 600;
}
.media-fill {
  fill: var(--color-surface);
}
.media-mark {
  fill: var(--color-accent);
}
</style>
