// VitePress builds this module when `themeConfig.search.provider` is `local`: one lazy index per locale.
declare module '@localSearchIndex' {
  const indexes: Record<string, () => Promise<{ default: string }>>
  export default indexes
}
