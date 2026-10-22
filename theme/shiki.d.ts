export interface SyntaxTheme {
  name: string
  type: 'light' | 'dark'
  colors: Record<string, string>
  settings: { scope?: string[]; settings: { foreground?: string; background?: string } }[]
}

export declare const syntaxThemes: { default: SyntaxTheme; dark: SyntaxTheme }
