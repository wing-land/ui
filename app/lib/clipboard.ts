import { getCurrentScope, onScopeDispose, shallowRef } from 'vue'

export type ClipboardStatus = 'idle' | 'copied' | 'error'

export interface UseClipboardOptions {
  /** Milliseconds before `copied` returns to `idle`. Errors stay until the next copy or reset. */
  resetAfter?: number
}

export function useClipboard({ resetAfter = 2000 }: UseClipboardOptions = {}) {
  const status = shallowRef<ClipboardStatus>('idle')
  let resetTimer: ReturnType<typeof setTimeout> | undefined

  function reset() {
    clearTimeout(resetTimer)
    status.value = 'idle'
  }

  async function copy(text: string) {
    clearTimeout(resetTimer)
    try {
      await navigator.clipboard.writeText(text)
      status.value = 'copied'
      if (resetAfter > 0) resetTimer = setTimeout(reset, resetAfter)
      return true
    } catch {
      status.value = 'error'
      return false
    }
  }

  if (getCurrentScope()) onScopeDispose(() => clearTimeout(resetTimer))

  return { status, copy, reset }
}
