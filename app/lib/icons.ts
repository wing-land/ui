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
  link: large([
    'M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1',
    'M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1',
  ]),
  download: large(['M12 4v11', 'M7 10l5 5 5-5', 'M5 20h14']),
  archive: large([
    'M4 5h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z',
    'M5 9v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9',
    'M10 13h4',
  ]),
  'layout-grid': large([
    'M5 4h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z',
    'M15 4h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z',
    'M5 14h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1Z',
    'M15 14h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1Z',
  ]),
  list: large(['M9 6h11M9 12h11M9 18h11', 'M4 6h.01M4 12h.01M4 18h.01']),
  filter: large(['M4 5h16l-6 7.5V18l-4 2v-7.5L4 5Z']),
  'list-checks': large([
    'M12 6h8M12 12h8M12 18h8',
    'M4 6l1.5 1.5L8.5 4.5',
    'M4 12l1.5 1.5 3-3',
    'M4 18l1.5 1.5 3-3',
  ]),
  code: large(['M8 7l-5 5 5 5', 'M16 7l5 5-5 5', 'M14 4l-4 16']),
  paperclip: large([
    'M20 11.5l-8.3 8.3a5 5 0 0 1-7.1-7.1l8.6-8.6a3.3 3.3 0 0 1 4.7 4.7l-8.6 8.6a1.7 1.7 0 0 1-2.4-2.4l7.9-7.9',
  ]),
  table: large([
    'M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z',
    'M3 10h18M3 15h18M9 4v16',
  ]),
  undo: large(['M9 14 4 9l5-5', 'M4 9h10.5a5.5 5.5 0 0 1 0 11H11']),
  redo: large(['M15 14l5-5-5-5', 'M20 9H9.5a5.5 5.5 0 0 0 0 11H13']),
  image: large([
    'M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z',
    'M8.5 8a1.5 1.5 0 1 0 0 3a1.5 1.5 0 1 0 0-3Z',
    'M21 15l-5-5L5 20',
  ]),
  bold: large(['M6 4h7a4 4 0 0 1 0 8H6Z', 'M6 12h8a4 4 0 0 1 0 8H6Z']),
  italic: large(['M19 4h-9M14 20H5M15 4 9 20']),
  strikethrough: large(['M16 4H9a3 3 0 0 0-2.8 4', 'M14 12a4 4 0 0 1 0 8H6', 'M4 12h16']),
  'heading-2': large(['M4 6v12M12 6v12M4 12h8', 'M15 11a2.5 2.5 0 0 1 5 0c0 1.5-1 2.3-2.5 3.5L15 18h5']),
  'heading-3': large(['M4 6v12M12 6v12M4 12h8', 'M15.5 9h4l-2.5 3.5a2.5 2.5 0 1 1-1.8 4.3']),
  pilcrow: large(['M13 4v16M17 4v16', 'M19 4H9.5a4.5 4.5 0 0 0 0 9H13']),
  quote: large(['M17 6H3M21 12H8M21 18H8M3 12v6']),
  'list-ordered': large(['M10 6h11M10 12h11M10 18h11', 'M4 6h1v4M4 10h2', 'M6 18H4c0-1 2-2 2-3s-1-1.5-2-1']),
  info: large(['M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18Z', 'M12 11v5M12 8h.01']),
  warning: large(['M12 4 2.5 20h19L12 4Z', 'M12 10v4M12 17h.01']),
  error: large(['M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18Z', 'M9 9l6 6M15 9l-6 6']),
  success: large(['M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18Z', 'M8 12.5l2.5 2.5L16 9.5']),
} satisfies Record<string, UiIconDefinition>

export type UiIconName = keyof typeof uiIcons
