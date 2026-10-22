<script setup lang="ts">
import { shallowRef } from 'vue'
import { UiAppShell, UiButton, UiConnectionStatus, UiSidebarNav } from '@wing-land/ui'
const sidebarOpen = shallowRef(false)
</script>
<template>
  <div class="demo">
    <UiAppShell v-model:sidebar-open="sidebarOpen" main-id="demo-main" aside-label="Backlinks">
      <template #header="{ toggleAside, asideCollapsed }">
        <div class="header">
          <strong>Sample</strong>
          <UiConnectionStatus status="connected" compact />
          <UiButton v-if="asideCollapsed" size="sm" variant="ghost" @click="toggleAside"
            >Backlinks</UiButton
          >
        </div>
      </template>
      <template #sidebar>
        <UiSidebarNav
          :groups="[
            {
              label: 'Workspace',
              items: [
                { href: '#inbox', label: 'Inbox' },
                { href: '#projects', label: 'Projects' },
              ],
            },
          ]"
          current-href="#inbox"
          @click="sidebarOpen = false"
        />
      </template>
      <p>The main column scrolls on its own.</p>
      <p v-for="n in 12" :key="n">Note {{ n }}</p>
      <template #aside>
        <p>3 notes link here.</p>
      </template>
    </UiAppShell>
  </div>
</template>
<style scoped>
.demo {
  overflow: hidden;
  border: 1px solid var(--color-line);
}
.demo :deep(.ui-app-shell) {
  height: 420px;
}
.header {
  display: flex;
  align-items: center;
  gap: 12px;
}
.header strong {
  flex: 1;
}
p {
  margin: 0 0 8px;
}
</style>
