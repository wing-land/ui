<script setup lang="ts">
import { Content, onContentUpdated, useData, useRoute, withBase } from 'vitepress'
import { computed, onMounted, onUnmounted, provide, shallowRef, watch } from 'vue'
import UiAppHeader from '../app/components/UiAppHeader.vue'
import UiContainer from '../app/components/UiContainer.vue'
import UiDrawer from '../app/components/UiDrawer.vue'
import UiArticleToc from '../app/components/UiArticleToc.vue'
import UiSidebarNav from '../app/components/UiSidebarNav.vue'
import UiSiteFooter from '../app/components/UiSiteFooter.vue'
import UiThemePicker from '../app/components/UiThemePicker.vue'
import { isExternalHref, provideUiConfig } from '../app/lib/config'
import { en, ja } from '../app/lib/messages'
import DocsSearch from './DocsSearch.vue'
import { docsLabelsKey } from './inject'
import { fill, isJapanese, resolveLabels } from './labels'
import type { DocsThemeConfig } from './types'

type ThemeMode = 'system' | 'light' | 'dark'

defineSlots<{ brand?: () => unknown }>()

const { site, theme, page, lang } = useData<DocsThemeConfig>()
const route = useRoute()
const themeMode = shallowRef<ThemeMode>('system')
const sidebarOpen = shallowRef(false)
let systemMedia: MediaQueryList | undefined

const storageKey = computed(() => theme.value.colorModeStorageKey ?? 'wing-ui-color-mode')
const labels = computed(() => resolveLabels(lang.value, theme.value.labels))
provide(docsLabelsKey, labels)
provideUiConfig(() => ({ locale: isJapanese(lang.value) ? ja : en }))

const nav = computed(() => theme.value.nav ?? [])
const navigation = computed(() =>
  nav.value.map((item) => ({ href: withBase(item.link), label: item.text })),
)
const activeNavigation = computed(() => {
  const current = route.path.replace(/\.html$/, '').replace(/\/$/, '')
  const matched = [...nav.value].reverse().find((item) => {
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
  (theme.value.sidebar ?? []).map((group) => ({
    label: group.text,
    items: group.items.map((item) => ({ href: withBase(item.link), label: item.text })),
  })),
)
const currentHref = computed(() => route.path)
const footerLinks = computed(() =>
  (theme.value.footerLinks ?? []).map((item) => {
    const external = isExternalHref(item.link)
    return { href: external ? item.link : withBase(item.link), label: item.text, external }
  }),
)

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
    if (title) anchor.setAttribute('aria-label', fill(labels.value.headingLink, { title }))
  })
})

onMounted(() => {
  try {
    const stored = localStorage.getItem(storageKey.value)
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
    localStorage.setItem(storageKey.value, mode)
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
      :menu-label="labels.openPageList"
      :navigation="navigation"
      :active-href="activeNavigation"
      :brand-href="withBase('/')"
      :brand-label="fill(labels.home, { title: site.title })"
      :navigation-label="labels.mainNavigation"
      skip-target="#main"
      @menu="sidebarOpen = true"
    >
      <template #brand>
        <slot name="brand">{{ site.title }}</slot>
      </template>
      <template #actions>
        <DocsSearch />
        <UiThemePicker v-model="themeMode" />
      </template>
    </UiAppHeader>

    <UiContainer>
      <div class="docs-layout">
        <aside class="docs-sidebar">
          <UiSidebarNav
            :groups="sidebarGroups"
            :current-href="currentHref"
            :navigation-label="labels.pages"
          />
        </aside>

        <main id="main" class="docs-main">
          <Content class="prose docs-content" />
        </main>

        <aside v-if="headings.length" class="docs-outline">
          <UiArticleToc
            :links="outlineLinks"
            :depth="2"
            :title="labels.onThisPage"
            layout="rail"
            density="compact"
            :numbered="false"
            track-active
          />
        </aside>
      </div>
    </UiContainer>

    <UiDrawer v-model:open="sidebarOpen" :title="labels.pages">
      <UiSidebarNav
        :groups="sidebarGroups"
        :current-href="currentHref"
        :navigation-label="labels.pages"
      />
    </UiDrawer>

    <UiContainer>
      <UiSiteFooter :links="footerLinks">
        <template #brand>
          <slot name="brand">{{ site.title }}</slot>
        </template>
      </UiSiteFooter>
    </UiContainer>
  </div>
</template>
