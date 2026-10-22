<script setup lang="ts">
import { onBeforeUnmount, onMounted, shallowRef, watch } from 'vue'
import { useUiConfig } from '../lib/config'
import UiAppHeader from './UiAppHeader.vue'
import UiDrawer from './UiDrawer.vue'

withDefaults(
  defineProps<{
    sidebarLabel?: string
    asideLabel?: string
    menuLabel?: string
    skipLabel?: string
    mainId?: string
  }>(),
  {
    sidebarLabel: undefined,
    asideLabel: undefined,
    menuLabel: undefined,
    skipLabel: undefined,
    mainId: 'main',
  },
)
defineSlots<{
  header?: (props: { toggleAside: () => void; asideCollapsed: boolean }) => unknown
  sidebar?: () => unknown
  default?: () => unknown
  aside?: () => unknown
}>()
const sidebarOpen = defineModel<boolean>('sidebarOpen', { default: false })
const asideOpen = defineModel<boolean>('asideOpen', { default: false })

const ui = useUiConfig()
// The shell's own width decides the layout, so it also works inside a smaller frame.
// Both start false so the server and the first client render match; CSS hides the columns until then.
const root = shallowRef<HTMLElement | null>(null)
const sidebarCollapsed = shallowRef(false)
const asideCollapsed = shallowRef(false)
let observer: ResizeObserver | undefined

onMounted(() => {
  observer = new ResizeObserver(([entry]) => {
    const width = entry?.contentRect.width ?? 0
    sidebarCollapsed.value = width <= 960
    asideCollapsed.value = width <= 1200
  })
  if (root.value) observer.observe(root.value)
})
onBeforeUnmount(() => observer?.disconnect())
watch(sidebarCollapsed, (collapsed) => {
  if (!collapsed) sidebarOpen.value = false
})
watch(asideCollapsed, (collapsed) => {
  if (!collapsed) asideOpen.value = false
})

function toggleAside() {
  asideOpen.value = !asideOpen.value
}
</script>

<template>
  <div
    ref="root"
    class="ui-app-shell"
    :class="{ 'has-sidebar': $slots.sidebar, 'has-aside': $slots.aside }"
  >
    <a class="ui-app-shell__skip" :href="`#${mainId}`">{{
      skipLabel ?? ui.messages.navigation.skipToContent
    }}</a>
    <UiAppHeader
      class="ui-app-shell__header"
      :menu="sidebarCollapsed && Boolean($slots.sidebar)"
      :menu-label="menuLabel"
      @menu="sidebarOpen = true"
    >
      <slot name="header" v-bind="{ toggleAside, asideCollapsed }" />
    </UiAppHeader>
    <div class="ui-app-shell__body">
      <div
        v-if="$slots.sidebar && !sidebarCollapsed"
        class="ui-app-shell__sidebar"
        role="region"
        :aria-label="sidebarLabel ?? ui.messages.navigation.sidebar"
      >
        <slot name="sidebar" />
      </div>
      <main :id="mainId" class="ui-app-shell__main" tabindex="0"><slot /></main>
      <aside
        v-if="$slots.aside && !asideCollapsed"
        class="ui-app-shell__aside"
        :aria-label="asideLabel"
        tabindex="0"
      >
        <slot name="aside" />
      </aside>
    </div>
    <UiDrawer
      v-if="$slots.sidebar && sidebarCollapsed"
      v-model:open="sidebarOpen"
      side="start"
      :label="sidebarLabel ?? ui.messages.navigation.sidebar"
    >
      <slot name="sidebar" />
    </UiDrawer>
    <UiDrawer
      v-if="$slots.aside && asideCollapsed"
      v-model:open="asideOpen"
      side="end"
      :label="asideLabel"
    >
      <slot name="aside" />
    </UiDrawer>
  </div>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

.ui-app-shell {
  container: ui-app-shell / inline-size;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  grid-template-columns: minmax(0, 1fr);
  height: 100dvh;
}
.ui-app-shell__skip {
  position: fixed;
  top: 8px;
  left: 8px;
  z-index: var(--z-toast);
  padding: 8px 12px;
  background: var(--color-canvas);
  transform: translateY(-200%);

  &:focus {
    transform: none;
  }
}
.ui-app-shell__body {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  min-height: 0;

  .has-sidebar & {
    grid-template-columns: 240px minmax(0, 1fr);
  }

  .has-aside & {
    grid-template-columns: minmax(0, 1fr) 280px;
  }

  .has-sidebar.has-aside & {
    grid-template-columns: 240px minmax(0, 1fr) 280px;
  }
}
.ui-app-shell__sidebar,
.ui-app-shell__main,
.ui-app-shell__aside {
  min-height: 0;
  overflow-y: auto;
}
.ui-app-shell__sidebar {
  padding-block: var(--space-4);
  border-inline-end: 1px solid var(--color-line);
}
.ui-app-shell__main {
  padding: var(--space-6);
}
// Scrolling columns take focus so that keyboard users can scroll them.
.ui-app-shell__main,
.ui-app-shell__aside {
  &:focus-visible {
    outline-offset: calc(var(--focus-ring-width) * -1);
  }
}
.ui-app-shell__aside {
  padding: var(--space-4);
  border-inline-start: 1px solid var(--color-line);
}

// Before JavaScript decides where the columns go, a narrow shell shows only the main column.
@container ui-app-shell (max-width: 1200px) {
  .has-aside .ui-app-shell__body {
    grid-template-columns: minmax(0, 1fr);
  }

  .has-sidebar .ui-app-shell__body {
    grid-template-columns: 240px minmax(0, 1fr);
  }

  .ui-app-shell__aside {
    display: none;
  }
}
@container ui-app-shell (max-width: 960px) {
  .has-sidebar .ui-app-shell__body {
    grid-template-columns: minmax(0, 1fr);
  }

  .ui-app-shell__sidebar {
    display: none;
  }

  .ui-app-shell__main {
    padding: var(--space-4);
  }
}
</style>
