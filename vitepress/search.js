// Plain JS: VitePress loads its config in Node, which does not strip types inside node_modules.

// Splits on word boundaries in any language, so Japanese and English pages are indexed alike.
const segmenter = new Intl.Segmenter(undefined, { granularity: 'word' })

/** @param {string} text */
function words(text) {
  return [...segmenter.segment(text)]
    .filter((segment) => segment.isWordLike)
    .map((segment) => segment.segment)
}

// Indexes the parts of a component name too, so "toolbar" finds UiToolbarButton.
/** @param {string} word */
function withNameParts(word) {
  const parts = word.split(/(?<=[a-z])(?=[A-Z])/)
  return parts.length > 1 ? [word, ...parts] : [word]
}

/** @type {import('./search').SearchIndexOptions} */
export const searchIndexOptions = {
  fields: ['title', 'titles', 'text'],
  storeFields: ['title', 'titles'],
  tokenize: (text) => words(text).flatMap(withNameParts),
}

/** @type {import('./search').SearchQueryOptions} */
export const searchQueryOptions = {
  tokenize: words,
  prefix: true,
  fuzzy: 0.2,
  combineWith: 'AND',
  boost: { title: 4, text: 2, titles: 1 },
}
