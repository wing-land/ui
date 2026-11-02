export interface UiIconDefinition {
  viewBox: string
  strokeWidth: number
  paths: readonly string[]
}

const small = (paths: string[]): UiIconDefinition => ({
  viewBox: '0 0 16 16',
  strokeWidth: 1.5,
  paths,
})
const large = (paths: string[]): UiIconDefinition => ({
  viewBox: '0 0 24 24',
  strokeWidth: 1.7,
  paths,
})

export const uiIcons = {
  'arrow-right': small(['M3 8h10M9 4l4 4-4 4']),
  'arrow-left': small(['M13 8H3M7 4 3 8l4 4']),
  external: small(['M4 12l8-8M4 4h8v8']),
  close: small(['M4 4l8 8M12 4l-8 8']),
  check: small(['M3 8.5l3.5 3.5L13 4.5']),
  'chevron-down': small(['M4 6l4 4 4-4']),
  'chevron-right': small(['M6 4l4 4-4 4']),
  plus: small(['M8 3v10M3 8h10']),
  menu: large(['M4 7h16M4 12h16M4 17h16']),
  more: large([
    'M5 11a1 1 0 1 0 0 2a1 1 0 1 0 0-2Z',
    'M12 11a1 1 0 1 0 0 2a1 1 0 1 0 0-2Z',
    'M19 11a1 1 0 1 0 0 2a1 1 0 1 0 0-2Z',
  ]),
  search: large(['M10.5 4a6.5 6.5 0 1 0 0 13a6.5 6.5 0 1 0 0-13ZM15.5 15.5 20 20']),
  copy: large([
    'M10 8h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2Z',
    'M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2',
  ]),
  calendar: large([
    'M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z',
    'M7 3v4M17 3v4M3 10h18',
  ]),
  edit: large(['M4 20h4l11-11-4-4L4 16v4ZM13 7l4 4']),
  sun: large([
    'M8 12a4 4 0 1 0 8 0a4 4 0 1 0-8 0',
    'M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5',
  ]),
  moon: large(['M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z']),
  monitor: large([
    'M5 4h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z',
    'M8 21h8M12 17v4',
  ]),
  globe: large([
    'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18Z',
    'M3 12h18',
    'M12 3c2.4 2.5 3.6 5.5 3.6 9s-1.2 6.5-3.6 9c-2.4-2.5-3.6-5.5-3.6-9s1.2-6.5 3.6-9Z',
  ]),
  info: large(['M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18Z', 'M12 11v5M12 8h.01']),
  warning: large(['M12 4 2.5 20h19L12 4Z', 'M12 10v4M12 17h.01']),
  error: large(['M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18Z', 'M9 9l6 6M15 9l-6 6']),
  success: large(['M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18Z', 'M8 12.5l2.5 2.5L16 9.5']),
} satisfies Record<string, UiIconDefinition>

export type UiIconName = keyof typeof uiIcons
