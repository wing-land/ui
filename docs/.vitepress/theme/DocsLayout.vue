<script setup lang="ts">
import { Content, onContentUpdated, useData, useRoute, withBase } from 'vitepress'
import { computed, onMounted, onUnmounted, shallowRef, watch } from 'vue'
import UiAppHeader from '../../../app/components/UiAppHeader.vue'
import UiContainer from '../../../app/components/UiContainer.vue'
import UiDrawer from '../../../app/components/UiDrawer.vue'
import UiArticleToc from '../../../app/components/UiArticleToc.vue'
import UiSidebarNav from '../../../app/components/UiSidebarNav.vue'
import UiSiteFooter from '../../../app/components/UiSiteFooter.vue'
import UiThemePicker from '../../../app/components/UiThemePicker.vue'
import DocsSearch from './DocsSearch.vue'
import DocsWordmark from './DocsWordmark.vue'

type NavigationItem = { text: string; link: string }
type SidebarGroup = { text: string; items: NavigationItem[] }
type DocsThemeConfig = { nav: NavigationItem[]; sidebar: SidebarGroup[] }
type ThemeMode = 'system' | 'light' | 'dark'

const { site, theme, page } = useData<DocsThemeConfig>()
const route = useRoute()
const themeMode = shallowRef<ThemeMode>('system')
const sidebarOpen = shallowRef(false)
let systemMedia: MediaQueryList | undefined
const themeLabels = {
  theme: 'Theme',
  current: 'current',
  system: 'System',
  light: 'Light',
  dark: 'Dark',
}

const navigation = computed(() =>
  theme.value.nav.map((item) => ({ href: withBase(item.link), label: item.text })),
)
const activeNavigation = computed(() => {
  const current = route.path.replace(/\.html$/, '').replace(/\/$/, '')
  const matched = [...theme.value.nav].reverse().find((item) => {
    const target = withBase(item.link).replace(/\/$/, '')
    return target && (current === target || current.startsWith(`${target}/`))
  })
  return matched ? withBase(matched.link) : withBase('/')
})
const headings = computed(() => page.value.headers.filter((header) => header.level === 2))
const outlineLinks = computed(() =>
  headings.value.map((header) => ({ id: header.slug, text: header.title })),
)
const sidebarGroups = computed(() =>
  theme.value.sidebar.map((group) => ({
    label: group.text,
    items: group.items.map((item) => ({ href: withBase(item.link), label: item.text })),
  })),
)
const currentHref = computed(() => route.path)

function applyTheme(mode: ThemeMode) {
  document.documentElement.classList.toggle(
    'dark',
    mode === 'dark' ||
      (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches),
  )
}

function onSystemThemeChange() {
  if (themeMode.value === 'system') applyTheme('system')
}

onContentUpdated(() => {
  document.querySelectorAll<HTMLAnchorElement>('.docs-content .header-anchor').forEach((anchor) => {
    const title = anchor.parentElement?.textContent?.replaceAll('\u200b', '').trim()
    if (title) anchor.setAttribute('aria-label', `Link to "${title}"`)
  })
})

onMounted(() => {
  try {
    const stored = localStorage.getItem('wingland-docs-theme')
    if (stored === 'light' || stored === 'dark') themeMode.value = stored
  } catch {
    // Theme switching still works when storage is unavailable.
  }
  applyTheme(themeMode.value)
  systemMedia = window.matchMedia('(prefers-color-scheme: dark)')
  systemMedia.addEventListener('change', onSystemThemeChange)
})
onUnmounted(() => {
  systemMedia?.removeEventListener('change', onSystemThemeChange)
})
watch(themeMode, (mode) => {
  applyTheme(mode)
  try {
    localStorage.setItem('wingland-docs-theme', mode)
  } catch {
    // Theme switching still works when storage is unavailable.
  }
})
watch(
  () => route.path,
  () => {
    sidebarOpen.value = false
  },
)
</script>

<template>
  <div class="docs-shell">
    <UiAppHeader
      class="docs-header"
      contained
      sticky
      menu
      menu-label="Open page list"
      :navigation="navigation"
      :active-href="activeNavigation"
      :brand-href="withBase('/')"
      :brand-label="`${site.title} home`"
      navigation-label="Main"
      skip-target="#main"
      skip-label="Skip to content"
      @menu="sidebarOpen = true"
    >
      <template #brand><DocsWordmark /></template>
      <template #actions>
        <DocsSearch />
        <UiThemePicker v-model="themeMode" :labels="themeLabels" />
      </template>
    </UiAppHeader>

    <UiContainer>
      <div class="docs-layout">
        <aside class="docs-sidebar">
          <UiSidebarNav
            :groups="sidebarGroups"
            :current-href="currentHref"
            navigation-label="Pages"
          />
        </aside>

        <main id="main" class="docs-main">
          <Content class="prose docs-content" />
        </main>

        <aside v-if="headings.length" class="docs-outline">
          <UiArticleToc
            :links="outlineLinks"
            :depth="2"
            title="On this page"
            navigation-label="Table of contents"
            layout="rail"
            density="compact"
            :numbered="false"
            track-active
          />
        </aside>
      </div>
    </UiContainer>

    <UiDrawer v-model:open="sidebarOpen" title="Pages">
      <UiSidebarNav :groups="sidebarGroups" :current-href="currentHref" navigation-label="Pages" />
    </UiDrawer>

    <UiContainer>
      <UiSiteFooter
        :links="[{ href: 'https://github.com/wing-land/ui', label: 'GitHub', external: true }]"
      >
        <template #brand><DocsWordmark /></template>
      </UiSiteFooter>
    </UiContainer>
  </div>
</template>
