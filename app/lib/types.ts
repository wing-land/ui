import type { UiDateInput } from './date'
import type { UiIconName } from './icons'

export interface UiNavItem {
  href: string
  label: string
}

export interface UiNavGroup {
  label: string
  items: readonly UiNavItem[]
}

export interface UiFooterLink extends UiNavItem {
  external?: boolean
}

export interface UiEntryListItem {
  href: string
  title: string
  description?: string
  date?: UiDateInput
  dateLabel?: string
  /** Defaults to `href`. Set it when two items share a link. */
  key?: string
  external?: boolean
}

export interface UiTimelineItem {
  date: UiDateInput
  /** Text shown instead of the formatted date, such as a time of day. `date` stays in the `datetime` attribute. */
  dateLabel?: string
  title: string
  /** Makes the title a link. */
  href?: string
  description?: string
  filled?: boolean
  /** Defaults to the date and title. Set it when two events share both. */
  key?: string
}

export interface UiAccountItem {
  /** Defaults to `href`. Set it when two items share a link. */
  id?: string
  href: string
  label: string
  /** Replaces the visible label as the link's accessible name, so it should contain the label. */
  accessibleLabel?: string
  iconSrc: string
}

export interface TocLink {
  id: string
  text: string
  children?: TocLink[]
}

export interface Neighbor {
  href: string
  title: string
  publishedAt?: UiDateInput
}

export interface UiPhoto {
  src: string
  alt: string
  caption?: string
}

export interface UiPhotoAlbum {
  title: string
  href?: string
  photos: readonly UiPhoto[]
}

export interface ThemeLabels {
  theme: string
  current: string
  system: string
  light: string
  dark: string
}

export interface UiToggleGroupItem {
  value: string
  label: string
  count?: number
  disabled?: boolean
}

export interface UiSelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface UiChoiceOption extends UiSelectOption {
  description?: string
}

export interface UiBreadcrumbItem {
  label: string
  href?: string
}

export interface UiAvatarGroupItem {
  name: string
  src?: string
}

export type UiConnectionState = 'connected' | 'connecting' | 'reconnecting' | 'offline'

export type UiMenuItem =
  | {
      type?: 'item'
      label: string
      /** Passed to the `select` event. Defaults to `label`. */
      value?: string
      icon?: UiIconName
      href?: string
      tone?: 'neutral' | 'danger'
      disabled?: boolean
      /** Shortcut shown on the right, such as "Ctrl+D". It does not bind the key. */
      shortcut?: string
      onSelect?: (event: Event) => void
    }
  | { type: 'separator' }
  | { type: 'label'; label: string }

export type UiSuggestItem =
  | {
      type?: 'item'
      /** Passed to the `select` event and used as the `active` value. */
      value: string
      label: string
      /** Secondary text on the right, such as an update date or a username. */
      meta?: string
      icon?: UiIconName
      /** Shows an avatar instead of an icon. */
      avatar?: { name: string; src?: string }
      tone?: 'neutral' | 'muted'
    }
  | { type: 'separator' }
  | { type: 'label'; label: string }

export interface UiTabItem {
  value: string
  label: string
  icon?: UiIconName
  /** Small count or status after the label, such as the number of backlinks. */
  badge?: string | number
  disabled?: boolean
}
