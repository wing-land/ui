<script setup lang="ts">
import { computed } from 'vue'
import { useUiConfig } from '../lib/config'
import type { UiAvatarGroupItem } from '../lib/types'
import UiAvatar from './UiAvatar.vue'

const props = withDefaults(
  defineProps<{
    items: readonly UiAvatarGroupItem[]
    /** Accessible name of the group, such as "People editing this note". */
    label: string
    /** Avatars shown before the rest are counted as "+N". */
    max?: number
    size?: number
  }>(),
  { max: 4, size: 32 },
)
const ui = useUiConfig()
// "+1" would take the same space as the avatar it hides, so show that avatar instead.
const visible = computed(() =>
  props.items.length <= props.max + 1 ? props.items : props.items.slice(0, props.max),
)
const rest = computed(() => props.items.length - visible.value.length)
const sizePx = computed(() => `${props.size}px`)
const fontSizePx = computed(() => `${Math.round(props.size * 0.375)}px`)
</script>

<template>
  <ul class="ui-avatar-group" :aria-label="label">
    <li v-for="(item, index) in visible" :key="`${index}-${item.name}`">
      <UiAvatar :name="item.name" :src="item.src" :size="size" />
    </li>
    <li v-if="rest" class="ui-avatar-group__rest">
      <span aria-hidden="true">+{{ rest }}</span
      ><span class="is-visually-hidden">{{ ui.messages.avatarGroup.more(rest) }}</span>
    </li>
  </ul>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

.ui-avatar-group {
  display: inline-flex;
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    display: inline-flex;
    margin: 0;
    border-radius: 50%;
    box-shadow: 0 0 0 2px var(--color-canvas);
  }

  li + li {
    margin-inline-start: -8px;
  }
}
.ui-avatar-group__rest {
  align-items: center;
  justify-content: center;
  width: v-bind(sizePx);
  height: v-bind(sizePx);
  background: var(--color-surface);
  color: var(--color-muted);
  font-size: v-bind(fontSizePx);
  font-weight: 600;
}
// Last, so it wins ties with the rules above on the same element.
.is-visually-hidden {
  @include component-base.visually-hidden;
}
</style>
