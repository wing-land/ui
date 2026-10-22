import { computed, inject, markRaw, provide, toValue } from 'vue'
import type { App, Component, ComputedRef, InjectionKey, MaybeRefOrGetter, Plugin } from 'vue'
import { formatDotDate, type UiDateFormatter, type UiDateInput } from './date'
import { provideToastManager } from './toast'
import {
  en,
  mergeMessages,
  type UiLocale,
  type UiMessages,
  type UiMessagesOverride,
} from './messages'

export type UiLinkComponent = string | Component
export type UiRequiredIndicator = 'text' | 'asterisk'

export interface UiConfig {
  locale: string
  messages: UiMessages
  linkComponent: UiLinkComponent
  timeZone?: string
  formatDate: (value: UiDateInput, kind?: string) => string
  isExternalLink: (href: string) => boolean
  requiredIndicator: UiRequiredIndicator
}

export interface UiConfigInput {
  locale?: UiLocale
  messages?: UiMessagesOverride
  linkComponent?: UiLinkComponent
  timeZone?: string
  formatDate?: UiDateFormatter
  isExternalLink?: (href: string) => boolean
  /** How form fields mark required inputs. `text` shows the localized word "Required". */
  requiredIndicator?: UiRequiredIndicator
}

interface ResolvedInput {
  locale: UiLocale
  messages?: UiMessagesOverride
  linkComponent: UiLinkComponent
  timeZone?: string
  dateFormatter: UiDateFormatter
  isExternalLink: (href: string) => boolean
  requiredIndicator: UiRequiredIndicator
}

const externalHrefPattern = /^(https?:)?\/\//i

export function isExternalHref(href: string) {
  return externalHrefPattern.test(href)
}

const defaultInput: ResolvedInput = {
  locale: en,
  linkComponent: 'a',
  dateFormatter: formatDotDate,
  isExternalLink: isExternalHref,
  requiredIndicator: 'text',
}

// Keep the unresolved input so a nested provider can replace the locale and still inherit overrides.
interface UiConfigState {
  input: ResolvedInput
  config: UiConfig
}

const uiConfigKey: InjectionKey<ComputedRef<UiConfigState>> = Symbol('wing-land-ui-config')

function rawLinkComponent(component: UiLinkComponent) {
  return typeof component === 'string' ? component : markRaw(component)
}

function mergeOverrides(parent?: UiMessagesOverride, child?: UiMessagesOverride) {
  if (!parent || !child) return child ?? parent
  const merged: Record<string, unknown> = { ...parent }
  for (const [section, values] of Object.entries(child)) {
    merged[section] = { ...parent[section as keyof UiMessagesOverride], ...values }
  }
  return merged as UiMessagesOverride
}

// Message overrides belong to a locale, so switching locales drops the parent's overrides.
function mergeInput(parent: ResolvedInput, input: UiConfigInput): ResolvedInput {
  const localeChanged = Boolean(input.locale && input.locale !== parent.locale)
  return {
    locale: input.locale ?? parent.locale,
    messages: localeChanged ? input.messages : mergeOverrides(parent.messages, input.messages),
    linkComponent: input.linkComponent
      ? rawLinkComponent(input.linkComponent)
      : parent.linkComponent,
    timeZone: input.timeZone ?? parent.timeZone,
    dateFormatter: input.formatDate ?? parent.dateFormatter,
    isExternalLink: input.isExternalLink ?? parent.isExternalLink,
    requiredIndicator: input.requiredIndicator ?? parent.requiredIndicator,
  }
}

function resolve(input: ResolvedInput): UiConfigState {
  const locale = input.locale.code
  return {
    input,
    config: {
      locale,
      messages: mergeMessages(input.locale.messages, input.messages),
      linkComponent: input.linkComponent,
      timeZone: input.timeZone,
      formatDate: (value, kind) =>
        input.dateFormatter(value, { locale, timeZone: input.timeZone, kind }),
      isExternalLink: input.isExternalLink,
      requiredIndicator: input.requiredIndicator,
    },
  }
}

const defaultState = computed(() => resolve(defaultInput))

function createState(parent: ComputedRef<UiConfigState>, input: MaybeRefOrGetter<UiConfigInput>) {
  return computed(() => resolve(mergeInput(parent.value.input, toValue(input))))
}

export function provideUiConfig(input: MaybeRefOrGetter<UiConfigInput>) {
  const state = createState(inject(uiConfigKey, defaultState), input)
  provide(uiConfigKey, state)
  return computed(() => state.value.config)
}

export function createUi(input: MaybeRefOrGetter<UiConfigInput> = {}): Plugin {
  return {
    install(app: App) {
      const parent = app.runWithContext(() => inject(uiConfigKey, defaultState))
      app.provide(uiConfigKey, createState(parent, input))
      provideToastManager(app)
    },
  }
}

export function useUiConfig(): ComputedRef<UiConfig> {
  const state = inject(uiConfigKey, defaultState)
  return computed(() => state.value.config)
}
