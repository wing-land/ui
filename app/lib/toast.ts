import { inject, type App, type InjectionKey } from 'vue'
import { createToastManager, type ToastAddOptions, type ToastUpdateOptions } from 'reka-ui'

export type UiToastTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger'

export interface UiToastOptions {
  /** Adding a toast with an existing `id` replaces it, for example to update a progress message. */
  id?: string
  title: string
  description?: string
  tone?: UiToastTone
  /** Milliseconds before the toast closes. `0` keeps it open until closed. */
  duration?: number
  /** Announces at once instead of politely. Use it for results of the reader's own action. */
  important?: boolean
  action?: {
    label: string
    /** How to do the same thing without the toast, for screen reader users who cannot reach it. */
    altText: string
    onClick?: (event: MouseEvent) => void
  }
}

export interface UiToastData {
  tone?: UiToastTone
}

type Manager = ReturnType<typeof createToastManager<UiToastData>>

const toastKey: InjectionKey<Manager> = Symbol('wing-land-ui-toast')
let fallback: Manager | undefined

export function provideToastManager(app: App) {
  app.provide(toastKey, createToastManager<UiToastData>())
}

// Apps without createUi() share one manager in the browser.
export function useToastManagerInstance(): Manager {
  return inject(toastKey, null) ?? (fallback ??= createToastManager<UiToastData>())
}

function toOptions(options: Partial<UiToastOptions>): ToastUpdateOptions<UiToastData> {
  return {
    title: options.title,
    description: options.description,
    duration: options.duration,
    type: options.important ? 'foreground' : 'background',
    data: { tone: options.tone },
    actionProps: options.action
      ? {
          label: options.action.label,
          altText: options.action.altText,
          onClick: options.action.onClick,
        }
      : undefined,
  }
}

export function useToast() {
  const manager = useToastManagerInstance()
  return {
    show: (options: UiToastOptions) =>
      manager.add({ ...toOptions(options), id: options.id } as ToastAddOptions<UiToastData>),
    update: (id: string, options: Partial<UiToastOptions>) =>
      manager.update(id, toOptions(options)),
    close: (id?: string) => manager.close(id),
    /** Shows `loading` until the promise settles, then `success` or `error`. */
    promise: <Value>(
      promise: Promise<Value>,
      messages: { loading: string; success: string | ((value: Value) => string); error: string },
    ) =>
      manager.promise<Value, UiToastData>(promise, {
        loading: { title: messages.loading, duration: 0 },
        success: (value: Value) => ({
          title:
            typeof messages.success === 'function' ? messages.success(value) : messages.success,
          data: { tone: 'success' },
        }),
        error: { title: messages.error, data: { tone: 'danger' } },
      }),
  }
}
