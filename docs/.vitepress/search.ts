import type { Options, SearchOptions } from 'minisearch'

// Splits on word boundaries in any language, so the index keeps working when the docs move to English.
const segmenter = new Intl.Segmenter(undefined, { granularity: 'word' })

function words(text: string) {
  return [...segmenter.segment(text)]
    .filter((segment) => segment.isWordLike)
    .map((segment) => segment.segment)
}

// Indexes the parts of a component name too, so "toolbar" finds UiToolbarButton.
function withNameParts(word: string) {
  const parts = word.split(/(?<=[a-z])(?=[A-Z])/)
  return parts.length > 1 ? [word, ...parts] : [word]
}

export const searchIndexOptions = {
  fields: ['title', 'titles', 'text'],
  storeFields: ['title', 'titles'],
  tokenize: (text: string) => words(text).flatMap(withNameParts),
} satisfies Options

export const searchQueryOptions = {
  tokenize: words,
  prefix: true,
  fuzzy: 0.2,
  combineWith: 'AND',
  boost: { title: 4, text: 2, titles: 1 },
} satisfies SearchOptions
