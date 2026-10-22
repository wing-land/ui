<script setup lang="ts">
import { computed, onBeforeUnmount, shallowRef } from 'vue'
import { useClipboard } from '../lib/clipboard'
import { useUiConfig } from '../lib/config'
import type { UiPhotoAlbum as Album } from '../lib/types'
import UiModal from './UiModal.vue'

const props = withDefaults(
  defineProps<{
    albumLabel?: string
    albumSuffix?: string
    photoLabel?: string
    previousLabel?: string
    nextLabel?: string
  }>(),
  {
    albumLabel: undefined,
    albumSuffix: undefined,
    photoLabel: undefined,
    previousLabel: undefined,
    nextLabel: undefined,
  },
)
const emit = defineEmits<{ close: [] }>()
const ui = useUiConfig()
const text = computed(() => {
  const { photoAlbum, common } = ui.value.messages
  return {
    album: props.albumLabel ?? photoAlbum.viewer,
    albumSuffix: props.albumSuffix ?? photoAlbum.album,
    photo: props.photoLabel ?? photoAlbum.photo,
    previous: props.previousLabel ?? common.previous,
    next: props.nextLabel ?? common.next,
  }
})
const { status: copyState, copy, reset: resetCopy } = useClipboard({ resetAfter: 0 })
const copyStatus = computed(() =>
  copyState.value === 'copied'
    ? ui.value.messages.clipboard.linkCopied
    : copyState.value === 'error'
      ? ui.value.messages.clipboard.copyLinkFailed
      : '',
)

const modal = shallowRef<{ open: () => void } | null>(null)
const activeAlbum = shallowRef<Album | null>(null)
const activePhotoIndex = shallowRef(0)
const modalOpen = shallowRef(false)
const activePhoto = computed(() => activeAlbum.value?.photos[activePhotoIndex.value])

function open(album: Album, photoIndex = 0) {
  if (!album.photos.length) return
  activeAlbum.value = album
  resetCopy()
  activePhotoIndex.value = Math.max(0, Math.min(photoIndex, album.photos.length - 1))
  modal.value?.open()
}

function movePhoto(direction: -1 | 1) {
  if (!activeAlbum.value) return
  const next = activePhotoIndex.value + direction
  if (next >= 0 && next < activeAlbum.value.photos.length) activePhotoIndex.value = next
}

function onKeydown(event: KeyboardEvent) {
  if (!modalOpen.value || event.altKey || event.ctrlKey || event.metaKey) return
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault()
    movePhoto(event.key === 'ArrowLeft' ? -1 : 1)
  }
}

function onModalOpen() {
  modalOpen.value = true
  window.addEventListener('keydown', onKeydown)
}

function onModalClose() {
  modalOpen.value = false
  window.removeEventListener('keydown', onKeydown)
  activeAlbum.value = null
  resetCopy()
  emit('close')
}

async function copyLink() {
  if (!activeAlbum.value?.href) return
  await copy(new URL(activeAlbum.value.href, window.location.origin).href)
}

onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
defineExpose({ open })
</script>

<template>
  <UiModal
    ref="modal"
    class="ui-photo-album-viewer"
    :label="activeAlbum ? `${activeAlbum.title} ${text.albumSuffix}` : text.album"
    size="large"
    @open="onModalOpen"
    @close="onModalClose"
  >
    <template #header>
      <div v-if="activeAlbum" class="viewer-heading">
        <h2>{{ activeAlbum.title }}</h2>
        <span class="viewer-count" aria-live="polite"
          >{{ activePhotoIndex + 1 }} / {{ activeAlbum.photos.length }}</span
        >
      </div>
    </template>
    <div v-if="modalOpen && activeAlbum && activePhoto" class="viewer">
      <figure>
        <div class="viewer-image-wrap">
          <img
            :key="activePhoto.src"
            :src="activePhoto.src"
            :alt="activePhoto.alt"
            decoding="async"
          />
        </div>
        <figcaption v-if="activePhoto.caption" aria-live="polite">
          {{ activePhoto.caption }}
        </figcaption>
      </figure>
      <div class="viewer-controls">
        <button
          type="button"
          :disabled="activePhotoIndex === 0"
          :aria-label="`${text.previous} ${text.photo}`"
          @click="movePhoto(-1)"
        >
          <span aria-hidden="true">←</span><span>{{ text.previous }}</span>
        </button>
        <button
          type="button"
          :disabled="activePhotoIndex === activeAlbum.photos.length - 1"
          :aria-label="`${text.next} ${text.photo}`"
          @click="movePhoto(1)"
        >
          <span>{{ text.next }}</span
          ><span aria-hidden="true">→</span>
        </button>
      </div>
      <button v-if="activeAlbum.href" type="button" class="viewer-copy-link" @click="copyLink">
        {{ ui.messages.clipboard.copyLink }}
      </button>
      <span v-if="copyStatus" class="viewer-copy-status" role="status">{{ copyStatus }}</span>
    </div>
  </UiModal>
</template>

<style scoped lang="scss">
@use '../assets/scss/component-base';

@include component-base.base;

.viewer-heading {
  display: flex;
  align-items: baseline;
  gap: 16px;
  min-width: 0;

  h2 {
    overflow: hidden;
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.viewer-count {
  flex: none;
  color: var(--color-muted);
  font-size: 14px;
  font-variant-numeric: tabular-nums;
}
.viewer figure {
  margin: 0;
}
.viewer-image-wrap {
  display: grid;
  place-items: center;
  min-height: min(60dvh, 650px);
  background: var(--color-surface);

  img {
    display: block;
    max-width: 100%;
    max-height: min(60dvh, 650px);
    width: auto;
    height: auto;
    object-fit: contain;

    @media (max-width: 650px) {
      max-height: min(55dvh, 500px);
    }
  }

  @media (max-width: 650px) {
    min-height: 0;
  }
}
.viewer figcaption {
  min-height: 28px;
  padding-top: 12px;
  color: var(--color-muted);
  font-size: 14px;
  line-height: 1.5;
}
.viewer-controls {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding-top: 8px;

  button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    min-height: 44px;
    padding: 4px 10px;
    border: 0;
    border-radius: var(--radius-control);
    background: transparent;
    color: var(--color-text);
    font: inherit;
    font-size: 14px;
    cursor: pointer;

    &:hover:not(:disabled) {
      background: var(--color-surface);
      color: var(--color-accent);
    }

    &:disabled {
      color: var(--color-muted);
      opacity: 0.5;
      cursor: default;
    }
  }
}
.viewer-copy-link {
  display: table;
  margin: 8px 0 0 auto;
  padding: 8px 0;
  border: 0;
  background: transparent;
  color: var(--color-text);
  font: inherit;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    color: var(--color-accent);
  }
}
.viewer-copy-status {
  display: block;
  color: var(--color-muted);
  font-size: 13px;
  text-align: right;
}
</style>
