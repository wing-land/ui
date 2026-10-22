import { reactive } from 'vue'

export interface UiConfirmOptions {
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  tone?: 'neutral' | 'danger'
}

/**
 * Promise-based confirmation for one UiConfirmDialog in the calling component:
 * `<UiConfirmDialog v-bind="dialog" />`, then `if (await confirm({ title })) …`.
 */
export function useConfirm() {
  let settle: ((value: boolean) => void) | undefined

  function finish(value: boolean) {
    settle?.(value)
    settle = undefined
    dialog.open = false
  }

  const dialog = reactive({
    open: false,
    title: '',
    description: undefined as string | undefined,
    confirmLabel: undefined as string | undefined,
    cancelLabel: undefined as string | undefined,
    tone: 'neutral' as 'neutral' | 'danger',
    'onUpdate:open': (value: boolean) => {
      if (!value) finish(false)
    },
    onConfirm: () => finish(true),
    onCancel: () => finish(false),
  })

  function confirm(options: UiConfirmOptions) {
    settle?.(false)
    Object.assign(
      dialog,
      { description: undefined, confirmLabel: undefined, cancelLabel: undefined },
      {
        tone: 'neutral',
        ...options,
        open: true,
      },
    )
    return new Promise<boolean>((resolve) => {
      settle = resolve
    })
  }

  return { dialog, confirm }
}
