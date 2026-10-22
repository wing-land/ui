<script setup lang="ts">
import { computed, onMounted, shallowRef, useTemplateRef, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    /** Used for the initials fallback and, when `alt` is omitted, as the image description. */
    name: string
    src?: string
    /** Pass an empty string when the name is already shown next to the avatar. */
    alt?: string
    /** Rendered size in pixels. Override with CSS for responsive sizes. */
    size?: number
    /** Intrinsic image size for the `width` and `height` attributes. Defaults to `size`. */
    imageSize?: number
  }>(),
  { src: undefined, alt: undefined, size: 40, imageSize: undefined },
)
const failed = shallowRef(false)
const image = useTemplateRef<HTMLImageElement>('image')
// With SSR the image can fail before hydration, so the error event is never seen.
onMounted(() => {
  if (image.value?.complete && image.value.naturalWidth === 0) failed.value = true
})
watch(
  () => props.src,
  () => (failed.value = false),
)
const initials = computed(() =>
  Array.from(props.name.trim())
    .filter((_, index, chars) => index === 0 || chars[index - 1] === ' ')
    .slice(0, 2)
    .join('')
    .toUpperCase(),
)
const description = computed(() => props.alt ?? props.name)
const sizePx = computed(() => `${props.size}px`)
const fontSizePx = computed(() => `${Math.round(props.size * 0.4)}px`)
</script>

<template>
  <span class="ui-avatar">
    <img
      v-if="src && !failed"
      ref="image"
      :src="src"
      :alt="description"
      :width="imageSize ?? size"
      :height="imageSize ?? size"
      decoding="async"
      @error="failed = true"
    />
    <span
      v-else
      class="ui-avatar__initials"
      :role="description ? 'img' : undefined"
      :aria-label="description || undefined"
      :aria-hidden="description ? undefined : 'true'"
      >{{ initials }}</span
    >
  </span>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

.ui-avatar {
  display: inline-flex;
  flex: none;
  width: v-bind(sizePx);
  height: v-bind(sizePx);
  overflow: hidden;
  border-radius: 50%;
  background: var(--color-surface);
  color: var(--color-muted);
  vertical-align: middle;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.ui-avatar__initials {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  font-size: v-bind(fontSizePx);
  font-weight: 600;
  line-height: 1;
}
</style>
