<script setup lang="ts">
// No imports: the layer auto-imports these composables.
const ui = useUiConfig()
const { dialog, confirm } = useConfirm()
const open = shallowRef(false)
const tag = shallowRef<string | null>(null)
const name = shallowRef('')
</script>

<template>
  <UiContainer>
    <UiSiteHeader
      :navigation="[{ href: '/', label: 'Home' }]"
      active-href="/"
      brand-href="/"
      brand-label="Home"
    />
    <main id="main">
      <p data-link-component>{{ typeof ui.linkComponent === 'string' ? 'string' : 'component' }}</p>
      <UiLink href="/">Internal</UiLink>
      <UiLink href="https://example.com/">External</UiLink>
      <UiButton href="/">Link button</UiButton>
      <UiButton @click="open = true">Open</UiButton>
      <UiButton tone="danger" @click="confirm({ title: 'Delete?' })">Delete</UiButton>
      <UiToggleGroup v-model="tag" :items="[{ value: 'vue', label: 'Vue' }]" label="Tags" />
      <UiDate date="2026-10-20T00:00:00Z" relative />
      <UiModal v-model:open="open" title="Modal"><p>Body</p></UiModal>
      <UiConfirmDialog v-bind="dialog" />
      <UiBreadcrumb :items="[{ label: 'Home', href: '/' }, { label: 'Notes' }]" />
      <UiPagination :total="100" />
      <UiTabs
        :items="[
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' },
        ]"
        label="Tabs"
      />
      <UiDropdownMenu :items="[{ label: 'Rename' }]">
        <template #trigger><UiButton icon="more" label="Actions" /></template>
      </UiDropdownMenu>
      <UiTooltip text="Hint"><UiButton>Tip</UiButton></UiTooltip>
      <UiToolbar label="Formatting"><UiToolbarButton>B</UiToolbarButton></UiToolbar>
      <UiCombobox :items="['one', 'two']" aria-label="Pick" />
      <UiToaster />
      <UiField label="Name" description="Shown to others" required>
        <UiInput v-model="name" />
      </UiField>
    </main>
  </UiContainer>
</template>
