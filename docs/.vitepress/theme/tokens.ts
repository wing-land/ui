// Reads the token values from tokens.css itself, so the Design page never shows stale values.
import css from '../../../app/assets/css/tokens.css?raw'

function readBlock(selector: RegExp): Record<string, string> {
  const body = selector.exec(css)?.[1]
  if (!body) throw new Error(`tokens.css has no block for ${selector}`)
  const values: Record<string, string> = {}
  for (const [, name, value] of body.matchAll(/--([\w-]+):\s*([^;]+);/g)) {
    values[name!] = value!.replace(/\s+/g, ' ').trim()
  }
  return values
}

export const lightTokens = readBlock(/:root\s*\{([^}]*)\}/)
export const darkTokens = readBlock(/:root\[data-theme='dark'\]\s*\{([^}]*)\}/)
