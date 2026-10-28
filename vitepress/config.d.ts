import type { UserConfig } from 'vitepress'
import type { DocsThemeConfig } from './types'

export type { DocsLabels, DocsNavItem, DocsSidebarGroup, DocsThemeConfig } from './types'

export interface ThemeConfigOptions {
  /** localStorage key for the saved light or dark choice. Default: `'wing-ui-color-mode'`. */
  colorModeStorageKey?: string
}

export declare function createThemeConfig(options?: ThemeConfigOptions): UserConfig<DocsThemeConfig>

declare const config: UserConfig<DocsThemeConfig>
export default config
