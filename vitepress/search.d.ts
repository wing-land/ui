import type { Options, SearchOptions } from 'minisearch'

export type SearchIndexOptions = Options & { fields: string[]; storeFields: string[] }
export type SearchQueryOptions = SearchOptions

export declare const searchIndexOptions: SearchIndexOptions
export declare const searchQueryOptions: SearchQueryOptions
