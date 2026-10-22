import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { defineLoader } from 'vitepress'
import { createChecker, type ComponentMeta } from 'vue-component-meta'
import { parse } from 'yaml'
import { uiIcons } from '../../app/lib/icons'

export interface ApiRow {
  name: string
  type: string
  default?: string
  required?: boolean
  /** `v-model` argument when the prop is bound with v-model. */
  model?: string
  description: string
}

export interface ComponentApi {
  props: ApiRow[]
  events: ApiRow[]
  slots: ApiRow[]
  exposed: ApiRow[]
}

type Section = keyof ComponentApi
type Description = string | { type?: string; description: string }
type Descriptions = Partial<Record<Section, Record<string, Description>>>

declare const data: Record<string, ComponentApi>
export { data }

const sections: Section[] = ['props', 'events', 'slots', 'exposed']
// Short aliases read better spelled out than as names the reader has to look up.
const expandedAliases: Record<string, string> = {
  UiNavMatch: "'exact' | 'prefix'",
  UiDateInput: 'string | number | Date',
}
const iconNames = new Set(Object.keys(uiIcons))
const root = fileURLToPath(new URL('../../', import.meta.url))

export default defineLoader({
  watch: ['../components/*.md', '../../app/components/Ui*.vue'],
  async load(files) {
    const checker = createChecker(`${root}tests/tsconfig.json`, {
      forceUseTs: true,
      printer: { newLine: 1 },
    })
    const result: Record<string, ComponentApi> = {}
    const problems: string[] = []
    const pages = files.filter((path) => path.endsWith('.md'))
    const documented = await Promise.all(
      pages.map(async (file) => Object.entries(readDescriptions(await readFile(file, 'utf8')))),
    )
    for (const [name, descriptions] of documented.flat()) {
      const meta = checker.getComponentMeta(`${root}app/components/${name}.vue`)
      const api = collect(meta)
      for (const section of sections) {
        const given = descriptions[section] ?? {}
        const used = new Set<string>()
        for (const row of api[section]) {
          const entry = given[row.name]
          used.add(row.name)
          // A `type` replaces a type that is too long to read.
          if (typeof entry === 'object' && entry.type) row.type = entry.type
          row.description = formatInline(
            typeof entry === 'string' ? entry : (entry?.description ?? ''),
          )
          if (!row.description) row.description = defaultDescription(section, row)
          if (!row.description) problems.push(`${name} ${section}.${row.name}: no description`)
        }
        // Exposed members that share a prop name are missing from the metadata, so pages declare them.
        for (const [key, entry] of Object.entries(given)) {
          if (used.has(key)) continue
          if (section === 'exposed' && typeof entry === 'object' && entry.type) {
            api.exposed.push({
              name: key,
              type: entry.type,
              description: formatInline(entry.description),
            })
          } else {
            problems.push(`${name} ${section}.${key}: not part of the component`)
          }
        }
      }
      result[name] = api
    }
    if (problems.length) {
      const message = `API descriptions are out of date:\n${problems.join('\n')}`
      if (process.argv.includes('build')) throw new Error(message)
      console.warn(message)
    }
    return result
  },
})

// A page's `api` frontmatter maps each component it documents to that component's descriptions.
function readDescriptions(source: string): Record<string, Descriptions> {
  const match = /^---\n([\s\S]*?)\n---/.exec(source)
  return (match ? parse(match[1]!)?.api : undefined) ?? {}
}

function collect(meta: ComponentMeta): ComponentApi {
  const models = new Set(
    meta.events
      .filter((event) => event.name.startsWith('update:'))
      .map((event) => event.name.slice(7)),
  )
  return {
    props: meta.props
      .filter((prop) => !prop.global)
      .map((prop) => ({
        name: prop.name,
        type: formatType(prop.type, !prop.required),
        default: formatDefault(prop.default, formatType(prop.type, !prop.required)),
        required: prop.required || undefined,
        model: models.has(prop.name)
          ? prop.name === 'modelValue'
            ? 'v-model'
            : `v-model:${prop.name}`
          : undefined,
        description: '',
      })),
    events: meta.events.map((event) => ({
      name: event.name,
      type: formatPayload(event.type),
      description: '',
    })),
    slots: meta.slots.map((slot) => ({
      name: slot.name,
      type: slot.type === '{}' ? '' : formatType(slot.type.replace(/;\s*}$/, ' }'), false),
      description: '',
    })),
    exposed: meta.exposed
      .filter(
        (member) =>
          !member.name.startsWith('$') && !meta.props.some((prop) => prop.name === member.name),
      )
      .map((member) => ({
        name: member.name,
        type: formatType(member.type, false),
        description: '',
      })),
  }
}

function defaultDescription(section: Section, row: ApiRow) {
  if (section === 'events' && row.name.startsWith('update:')) {
    const prop = row.name.slice(7)
    return `Emitted when the <code>${prop === 'modelValue' ? 'v-model' : `v-model:${prop}`}</code> value changes.`
  }
  return ''
}

function splitUnion(type: string) {
  const parts: string[] = []
  let depth = 0
  let current = ''
  for (const [index, char] of [...type].entries()) {
    if ('([{<'.includes(char)) depth++
    if (')]}'.includes(char) || (char === '>' && type[index - 1] !== '=')) depth--
    if (char === '|' && depth === 0) {
      parts.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }
  parts.push(current.trim())
  return parts
}

function formatType(type: string, optional: boolean) {
  let parts = splitUnion(type.replaceAll('"', "'"))
  if (optional) parts = parts.filter((part) => part !== 'undefined')
  const icons = parts.filter((part) => iconNames.has(part.slice(1, -1)))
  if (icons.length === iconNames.size) {
    parts = parts.filter((part) => !icons.includes(part))
    parts.unshift('UiIconName')
  }
  return parts
    .map((part) => expandedAliases[part] ?? part)
    .join(' | ')
    .replace(/^\((.*)\)$/, '$1')
}

function formatPayload(type: string) {
  return type === '[]' ? '' : type.replace(/^\[(.*)\]$/, '($1)').replaceAll('"', "'")
}

// Vue casts an absent boolean prop to false; an explicit `undefined` default keeps it unset.
function formatDefault(value: string | undefined, type: string) {
  if (value === undefined) return type === 'boolean' ? 'false' : undefined
  if (value === 'undefined') return undefined
  return value.replaceAll('"', "'")
}

function escapeHtml(text: string) {
  return text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

// Descriptions are one-line Markdown with code spans and links only.
function formatInline(text: string) {
  return escapeHtml(text.trim())
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label: string, href: string) => {
      return `<a href="${href.replace(/\.md(#|$)/, '.html$1')}">${label}</a>`
    })
}
