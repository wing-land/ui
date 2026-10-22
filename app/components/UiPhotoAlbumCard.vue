<script setup lang="ts">
import { useUiConfig, type UiLinkComponent } from '../lib/config'

withDefaults(
  defineProps<{
    cover: string
    coverAlt: string
    title: string
    countLabel?: string
    tags?: readonly string[]
    /** Replaces the visible text as the accessible name, so it should contain the title. */
    openLabel?: string
    coverSize?: number
    /** Renders the card as a link instead of a button that opens a viewer. */
    href?: string
    linkComponent?: UiLinkComponent
  }>(),
  {
    countLabel: undefined,
    tags: () => [],
    openLabel: undefined,
    coverSize: 640,
    href: undefined,
    linkComponent: undefined,
  },
)
const ui = useUiConfig()
</script>

<template>
  <component
    :is="href ? (linkComponent ?? ui.linkComponent) : 'button'"
    class="ui-photo-album-card"
    :href="href"
    :type="href ? undefined : 'button'"
    :aria-label="openLabel"
  >
    <span class="album-cover"
      ><img
        :src="cover"
        :alt="coverAlt"
        :width="coverSize"
        :height="coverSize"
        loading="lazy"
        decoding="async"
    /></span>
    <span class="album-info"
      ><span class="album-title">{{ title }}</span
      ><span v-if="countLabel" class="album-count">{{ countLabel }}</span></span
    >
    <span v-if="tags.length" class="album-tags">{{ tags.join(' · ') }}</span>
  </component>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

.ui-photo-album-card {
  // A size container cannot take its width from its content, so the card fills its grid cell.
  container: ui-photo-album-card / inline-size;
  display: block;
  width: 100%;
  min-width: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--color-text);
  font: inherit;
  text-align: left;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    .album-cover img {
      transform: scale(1.035);
    }

    .album-title {
      color: var(--color-accent);
    }
  }
}
.album-cover {
  display: block;
  overflow: hidden;
  aspect-ratio: 1;
  background: var(--color-surface);

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 180ms ease;

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  }
}
.album-info {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 8px;
  margin-top: 12px;

  @container ui-photo-album-card (max-width: 300px) {
    display: block;
    margin-top: 8px;
  }
}
.album-title {
  min-width: 0;
  font-size: 17px;
  font-weight: 600;
  line-height: 1.5;
}
.album-count {
  flex: none;
  color: var(--color-muted);
  font-size: 13px;

  @container ui-photo-album-card (max-width: 300px) {
    display: block;
    margin-top: 2px;
  }
}
.album-tags {
  display: block;
  margin-top: 4px;
  color: var(--color-muted);
  font-size: 13px;
}
</style>
