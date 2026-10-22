<script setup lang="ts">
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'reka-ui'
import { useUiConfig, type UiLinkComponent } from '../lib/config'
import type { UiMenuItem } from '../lib/types'
import UiIcon from './UiIcon.vue'

withDefaults(
  defineProps<{
    items: readonly UiMenuItem[]
    /** Accessible name of the menu. Defaults to the trigger's name. */
    label?: string
    side?: 'top' | 'right' | 'bottom' | 'left'
    align?: 'start' | 'center' | 'end'
    linkComponent?: UiLinkComponent
  }>(),
  { label: undefined, side: 'bottom', align: 'start', linkComponent: undefined },
)
const emit = defineEmits<{ select: [value: string] }>()
defineSlots<{ trigger?: () => unknown }>()
const open = defineModel<boolean>('open', { default: false })
const ui = useUiConfig()

function onSelect(item: Extract<UiMenuItem, { label: string; type?: 'item' }>, event: Event) {
  item.onSelect?.(event)
  emit('select', item.value ?? item.label)
}
</script>

<template>
  <DropdownMenuRoot v-model:open="open">
    <DropdownMenuTrigger as-child><slot name="trigger" /></DropdownMenuTrigger>
    <DropdownMenuPortal>
      <DropdownMenuContent
        class="ui-dropdown-menu"
        :side="side"
        :align="align"
        :side-offset="6"
        :collision-padding="8"
        :aria-label="label"
      >
        <template v-for="(item, index) in items" :key="index">
          <DropdownMenuSeparator
            v-if="item.type === 'separator'"
            class="ui-dropdown-menu__separator"
          />
          <DropdownMenuLabel v-else-if="item.type === 'label'" class="ui-dropdown-menu__label">{{
            item.label
          }}</DropdownMenuLabel>
          <DropdownMenuItem
            v-else
            class="ui-dropdown-menu__item"
            :class="{ 'is-danger': item.tone === 'danger' }"
            :disabled="item.disabled"
            :as-child="Boolean(item.href)"
            @select="onSelect(item, $event)"
          >
            <component :is="linkComponent ?? ui.linkComponent" v-if="item.href" :href="item.href"
              ><UiIcon v-if="item.icon" :name="item.icon" /><span class="ui-dropdown-menu__text">{{
                item.label
              }}</span></component
            >
            <template v-else
              ><UiIcon v-if="item.icon" :name="item.icon" /><span class="ui-dropdown-menu__text">{{
                item.label
              }}</span
              ><kbd v-if="item.shortcut" class="ui-dropdown-menu__shortcut">{{
                item.shortcut
              }}</kbd></template
            >
          </DropdownMenuItem>
        </template>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>

<!-- Not scoped: Reka UI teleports these panels, so the scoped attribute does not reach them. -->
<style lang="scss">
@use '../assets/scss/component-base';
@use '../assets/scss/floating';

@include component-base.base("[class*='ui-dropdown-menu']");

.ui-dropdown-menu {
  @include floating.panel;

  min-width: 180px;
  padding: 4px;
}
.ui-dropdown-menu__item {
  @include floating.item;

  &.is-danger {
    color: var(--color-danger);
  }
}
.ui-dropdown-menu__text {
  flex: 1;
}
.ui-dropdown-menu__shortcut {
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: 12px;
}
.ui-dropdown-menu__label {
  padding: 6px 10px 2px;
  color: var(--color-muted);
  font-size: 12px;
  font-weight: 600;
}
.ui-dropdown-menu__separator {
  height: 1px;
  margin: 4px -4px;
  background: var(--color-line);
}
</style>
