// Plain JS so Node can load it from node_modules, e.g. in vite.config.ts.
import palette from './palette.json' with { type: 'json' }

/** @param {'light' | 'dark'} mode */
function createTheme(mode) {
  const colors = palette.themes[mode]
  return {
    name: `wine-${mode}`,
    type: mode,
    colors: { 'editor.background': colors.background, 'editor.foreground': colors.foreground },
    settings: [
      { settings: { foreground: colors.foreground, background: colors.background } },
      { scope: ['keyword', 'storage', 'entity.name.tag'], settings: { foreground: colors.wine } },
      {
        scope: ['entity.name.type', 'support.type', 'support.class'],
        settings: { foreground: colors.type },
      },
      { scope: ['string'], settings: { foreground: colors.string } },
      {
        scope: ['constant.numeric', 'constant.language'],
        settings: { foreground: colors.literal },
      },
      { scope: ['comment'], settings: { foreground: colors.comment } },
      { scope: ['invalid'], settings: { foreground: colors.error } },
      {
        scope: ['keyword.operator', 'punctuation', 'variable', 'entity.name.function'],
        settings: { foreground: colors.foreground },
      },
      { scope: ['punctuation.definition.comment'], settings: { foreground: colors.comment } },
      { scope: ['punctuation.definition.string'], settings: { foreground: colors.string } },
    ],
  }
}

export const syntaxThemes = { default: createTheme('light'), dark: createTheme('dark') }
