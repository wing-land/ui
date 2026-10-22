export interface UiMessages {
  common: {
    close: string
    previous: string
    next: string
    retry: string
    all: string
    externalSite: string
    loading: string
    cancel: string
    confirm: string
    menu: string
  }
  clipboard: {
    copy: string
    copied: string
    copyLink: string
    linkCopied: string
    copyLinkFailed: string
    copyFailed: string
  }
  date: {
    published: string
    updated: string
    dates: string
  }
  navigation: {
    main: string
    sidebar: string
    skipToContent: string
    breadcrumb: string
  }
  article: {
    end: string
    adjacent: string
    older: string
    newer: string
    allPosts: string
  }
  toc: {
    title: string
    navigation: string
    show: string
    hide: string
  }
  codeBlock: {
    copyFailed: string
    region: (language: string) => string
  }
  image: {
    preview: string
    viewLarger: (alt: string) => string
  }
  photoAlbum: {
    viewer: string
    album: string
    photo: string
  }
  table: {
    region: string
  }
  form: {
    required: string
    errorSummary: string
    search: string
    clear: string
    /** Screen reader text for the character count, such as "12 of 100 characters". */
    characterCount: (length: number, max: number) => string
  }
  pagination: {
    navigation: string
    page: (page: number) => string
  }
  list: {
    loadMore: string
  }
  avatarGroup: {
    /** Screen reader text for avatars that do not fit, such as "and 3 more". */
    more: (count: number) => string
  }
  toast: {
    label: string
    /** Landmark name of the notification area. `{hotkey}` becomes the key that focuses it. */
    region: string
  }
  combobox: {
    empty: string
  }
  connection: {
    connected: string
    connecting: string
    reconnecting: string
    offline: string
  }
  theme: {
    theme: string
    current: string
    system: string
    light: string
    dark: string
  }
}

export interface UiLocale {
  code: string
  messages: UiMessages
}

export type UiMessagesOverride = { [Section in keyof UiMessages]?: Partial<UiMessages[Section]> }

export const en: UiLocale = {
  code: 'en',
  messages: {
    common: {
      close: 'Close',
      previous: 'Previous',
      next: 'Next',
      retry: 'Retry',
      all: 'All',
      externalSite: '(external site)',
      loading: 'Loading',
      cancel: 'Cancel',
      confirm: 'OK',
      menu: 'Menu',
    },
    clipboard: {
      copy: 'Copy',
      copied: 'Copied',
      copyLink: 'Copy link',
      linkCopied: 'Link copied.',
      copyLinkFailed: 'Could not copy link.',
      copyFailed: 'Could not copy. Select the text and copy it.',
    },
    date: { published: 'Published', updated: 'Updated', dates: 'Post dates' },
    navigation: {
      main: 'Main navigation',
      sidebar: 'Sidebar navigation',
      skipToContent: 'Skip to content',
      breadcrumb: 'Breadcrumb',
    },
    article: {
      end: 'Article end',
      adjacent: 'Adjacent posts',
      older: 'Older post',
      newer: 'Newer post',
      allPosts: 'All posts',
    },
    toc: { title: 'Contents', navigation: 'Table of contents', show: 'Show', hide: 'Hide' },
    codeBlock: {
      copyFailed: 'Could not copy. Select the code and copy it.',
      region: (language) => `${language} code. Scroll horizontally for long lines.`,
    },
    image: {
      preview: 'Image preview',
      viewLarger: (alt) => (alt ? `View larger image: ${alt}` : 'View larger image'),
    },
    photoAlbum: { viewer: 'Album viewer', album: 'album', photo: 'photo' },
    table: { region: 'Table (scroll horizontally if needed)' },
    form: {
      required: 'Required',
      errorSummary: 'There is a problem',
      search: 'Search',
      clear: 'Clear',
      characterCount: (length, max) => `${length} of ${max} characters`,
    },
    pagination: { navigation: 'Pagination', page: (page) => `Page ${page}` },
    list: { loadMore: 'Load more' },
    avatarGroup: { more: (count) => `and ${count} more` },
    toast: { label: 'Notification', region: 'Notifications ({hotkey})' },
    combobox: { empty: 'No results' },
    connection: {
      connected: 'Connected',
      connecting: 'Connecting',
      reconnecting: 'Reconnecting',
      offline: 'Offline',
    },
    theme: { theme: 'Theme', current: 'current', system: 'System', light: 'Light', dark: 'Dark' },
  },
}

export const ja: UiLocale = {
  code: 'ja',
  messages: {
    common: {
      close: '閉じる',
      previous: '前へ',
      next: '次へ',
      retry: '再試行',
      all: 'すべて',
      externalSite: '（外部サイト）',
      loading: '読み込み中',
      cancel: 'キャンセル',
      confirm: 'OK',
      menu: 'メニュー',
    },
    clipboard: {
      copy: 'コピー',
      copied: 'コピーしました',
      copyLink: 'リンクをコピー',
      linkCopied: 'リンクをコピーしました。',
      copyLinkFailed: 'リンクをコピーできませんでした。',
      copyFailed: 'コピーできませんでした。文字を選択してコピーしてください。',
    },
    date: { published: '公開日', updated: '更新日', dates: '投稿日' },
    navigation: {
      main: 'メインナビゲーション',
      sidebar: 'サイドナビゲーション',
      skipToContent: '本文へ移動',
      breadcrumb: 'パンくずリスト',
    },
    article: {
      end: '記事の終わり',
      adjacent: '前後の記事',
      older: '前の記事',
      newer: '次の記事',
      allPosts: '記事一覧',
    },
    toc: { title: '目次', navigation: '目次', show: '表示', hide: '隠す' },
    codeBlock: {
      copyFailed: 'コピーできませんでした。コードを選択してコピーしてください。',
      region: (language) => `${language} のコード。長い行は横にスクロールできます。`,
    },
    image: {
      preview: '画像の拡大表示',
      viewLarger: (alt) => (alt ? `画像を拡大: ${alt}` : '画像を拡大'),
    },
    photoAlbum: { viewer: 'アルバムビューアー', album: 'アルバム', photo: '写真' },
    table: { region: '表（必要に応じて横にスクロール）' },
    form: {
      required: '必須',
      errorSummary: '入力内容を確認してください',
      search: '検索',
      clear: 'クリア',
      characterCount: (length, max) => `${max}文字中${length}文字`,
    },
    pagination: { navigation: 'ページ送り', page: (page) => `${page} ページ` },
    list: { loadMore: 'さらに読み込む' },
    avatarGroup: { more: (count) => `ほか ${count} 人` },
    toast: { label: '通知', region: '通知（{hotkey}）' },
    combobox: { empty: '見つかりません' },
    connection: {
      connected: '接続中',
      connecting: '接続しています',
      reconnecting: '再接続しています',
      offline: 'オフライン',
    },
    theme: {
      theme: 'テーマ',
      current: '現在',
      system: '自動',
      light: 'ライト',
      dark: 'ダーク',
    },
  },
}

export function mergeMessages(base: UiMessages, override?: UiMessagesOverride): UiMessages {
  if (!override) return base
  const merged = { ...base } as Record<string, unknown>
  for (const [section, values] of Object.entries(override)) {
    if (values) merged[section] = { ...base[section as keyof UiMessages], ...values }
  }
  return merged as unknown as UiMessages
}
