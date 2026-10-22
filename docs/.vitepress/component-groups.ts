export type ComponentPage = {
  text: string
  slug: string
  description: string
  components: string[]
}

export type ComponentGroup = {
  id: string
  text: string
  description: string
  pages: ComponentPage[]
}

export const componentGroups: ComponentGroup[] = [
  {
    id: 'foundation',
    text: 'Foundation',
    description: 'Config, icons, and screen reader text that other components build on.',
    pages: [
      {
        text: 'Config Provider',
        slug: 'config-provider',
        description: 'Config such as the locale, links, and date format',
        components: ['UiConfigProvider'],
      },
      {
        text: 'Icon',
        slug: 'icon',
        description: 'Built-in line icons',
        components: ['UiIcon'],
      },
      {
        text: 'Visually Hidden',
        slug: 'visually-hidden',
        description: 'Content for screen readers only',
        components: ['UiVisuallyHidden'],
      },
    ],
  },
  {
    id: 'layout',
    text: 'Layout',
    description: 'Page width and the overall frame of the screen.',
    pages: [
      {
        text: 'Container',
        slug: 'container',
        description: 'Maximum width and side margins of content',
        components: ['UiContainer'],
      },
      {
        text: 'Header',
        slug: 'header',
        description: 'Headers for sites and apps',
        components: ['UiSiteHeader', 'UiAppHeader'],
      },
      {
        text: 'Footer',
        slug: 'footer',
        description: 'Footer at the bottom of the page',
        components: ['UiSiteFooter'],
      },
      {
        text: 'Shell',
        slug: 'shell',
        description: 'Frame with a header, sidebar, main content, and side panel',
        components: ['UiAppShell'],
      },
      {
        text: 'Separator',
        slug: 'separator',
        description: 'Line that separates content',
        components: ['UiSeparator'],
      },
    ],
  },
  {
    id: 'actions',
    text: 'Actions',
    description: 'Components that perform actions or switch views.',
    pages: [
      {
        text: 'Button',
        slug: 'button',
        description: 'Button that performs an action',
        components: ['UiButton'],
      },
      {
        text: 'Toggle Group',
        slug: 'toggle-group',
        description: 'Buttons with a pressed state, and tag filters',
        components: ['UiToggleGroup', 'UiTagFilter'],
      },
      {
        text: 'Toolbar',
        slug: 'toolbar',
        description: 'Toolbar navigated with arrow keys, with its buttons and separators',
        components: ['UiToolbar', 'UiToolbarButton', 'UiToolbarSeparator'],
      },
      {
        text: 'Theme Picker',
        slug: 'theme-picker',
        description: 'Button for choosing the color theme',
        components: ['UiThemePicker'],
      },
    ],
  },
  {
    id: 'forms',
    text: 'Forms',
    description:
      'Inputs tied to labels, descriptions, and errors, and the display of submit errors.',
    pages: [
      {
        text: 'Field',
        slug: 'field',
        description: 'Label, description, and errors of a field, and an error summary',
        components: ['UiField', 'UiFormErrorSummary'],
      },
      {
        text: 'Input',
        slug: 'input',
        description: 'Single-line, multi-line, search, and copy fields',
        components: ['UiInput', 'UiTextarea', 'UiSearchInput', 'UiCopyField'],
      },
      {
        text: 'Select',
        slug: 'select',
        description: 'Pick from a list, or type to narrow down options',
        components: ['UiSelect', 'UiCombobox'],
      },
      {
        text: 'Checkbox',
        slug: 'checkbox',
        description: 'Checkboxes and checkbox groups',
        components: ['UiCheckbox', 'UiCheckboxGroup'],
      },
      {
        text: 'Radio',
        slug: 'radio',
        description: 'Group of radio buttons for choosing one option',
        components: ['UiRadioGroup'],
      },
      {
        text: 'Switch',
        slug: 'switch',
        description: 'Toggle for settings that take effect immediately',
        components: ['UiSwitch'],
      },
    ],
  },
  {
    id: 'navigation',
    text: 'Navigation',
    description: 'Components that move between pages or switch the content shown.',
    pages: [
      {
        text: 'Link',
        slug: 'link',
        description: 'Link that detects internal and external targets, and link variants',
        components: ['UiLink', 'UiExternalLink', 'UiTextArrowLink'],
      },
      {
        text: 'Sidebar Nav',
        slug: 'sidebar-nav',
        description: 'Grouped navigation for a sidebar',
        components: ['UiSidebarNav'],
      },
      {
        text: 'Tabs',
        slug: 'tabs',
        description: 'Switch content shown in the same place',
        components: ['UiTabs'],
      },
      {
        text: 'Breadcrumb',
        slug: 'breadcrumb',
        description: 'Trail of levels above the current page',
        components: ['UiBreadcrumb'],
      },
      {
        text: 'Pagination',
        slug: 'pagination',
        description: 'Page numbers and loading more items',
        components: ['UiPagination', 'UiLoadMore'],
      },
    ],
  },
  {
    id: 'data-display',
    text: 'Data display',
    description: 'Components that organize information such as lists, dates, and profiles.',
    pages: [
      {
        text: 'Account List',
        slug: 'account-list',
        description: 'Account links with icons',
        components: ['UiAccountList'],
      },
      {
        text: 'Avatar',
        slug: 'avatar',
        description: 'Images of people, groups of people, and profiles',
        components: ['UiAvatar', 'UiAvatarGroup', 'UiProfileIdentity'],
      },
      {
        text: 'Badge',
        slug: 'badge',
        description: 'Small label for the status of an item',
        components: ['UiBadge'],
      },
      {
        text: 'Card',
        slug: 'card',
        description: 'Group of information inside a border',
        components: ['UiCard'],
      },
      {
        text: 'Connection Status',
        slug: 'connection-status',
        description: 'Connection to the server',
        components: ['UiConnectionStatus'],
      },
      {
        text: 'Date',
        slug: 'date',
        description: 'Dates, relative time, and post dates',
        components: ['UiDate', 'UiPostDate'],
      },
      {
        text: 'Entry List',
        slug: 'entry-list',
        description: 'List of links to posts or updates',
        components: ['UiEntryList'],
      },
      {
        text: 'Table Scroll',
        slug: 'table-scroll',
        description: 'Horizontal scrolling for wide tables',
        components: ['UiTableScroll'],
      },
      {
        text: 'Timeline',
        slug: 'timeline',
        description: 'Dated events in order',
        components: ['UiTimeline'],
      },
    ],
  },
  {
    id: 'content',
    text: 'Content',
    description: 'Components for presenting post content and photos.',
    pages: [
      {
        text: 'Article',
        slug: 'article',
        description: 'Post title and dates, table of contents, and closing links',
        components: ['UiArticleHeader', 'UiArticleToc', 'UiArticleEnding'],
      },
      {
        text: 'Code Block',
        slug: 'code-block',
        description: 'Code with a copy button',
        components: ['UiCodeBlock'],
      },
      {
        text: 'Disclosure',
        slug: 'disclosure',
        description: 'Content that opens and closes from a heading',
        components: ['UiDisclosure'],
      },
      {
        text: 'Figure',
        slug: 'figure',
        description: 'Image with a caption and an enlarged view',
        components: ['UiFigure'],
      },
      {
        text: 'Kbd',
        slug: 'kbd',
        description: 'Keyboard keys',
        components: ['UiKbd'],
      },
      {
        text: 'Note',
        slug: 'note',
        description: 'Note alongside body text',
        components: ['UiNote'],
      },
      {
        text: 'Photo Album',
        slug: 'photo-album',
        description: 'Album cards, an album viewer, and enlarged images',
        components: ['UiPhotoAlbumCard', 'UiPhotoAlbumViewer', 'UiImageLightbox'],
      },
    ],
  },
  {
    id: 'overlay',
    text: 'Overlay',
    description: 'Panels, menus, and hints that float next to their trigger.',
    pages: [
      {
        text: 'Dropdown Menu',
        slug: 'dropdown-menu',
        description: 'Menu of actions that opens from a button',
        components: ['UiDropdownMenu'],
      },
      {
        text: 'Popover',
        slug: 'popover',
        description: 'Panel that floats next to its trigger',
        components: ['UiPopover'],
      },
      {
        text: 'Tooltip',
        slug: 'tooltip',
        description: 'Hint shown on hover and focus',
        components: ['UiTooltip'],
      },
    ],
  },
  {
    id: 'feedback',
    text: 'Feedback',
    description: 'Status messages, dialogs, and loading or empty states.',
    pages: [
      {
        text: 'Alert',
        slug: 'alert',
        description: 'Box for information, success, warnings, and errors',
        components: ['UiAlert'],
      },
      {
        text: 'Dialog',
        slug: 'dialog',
        description: 'Modal, confirmation dialog, and drawer',
        components: ['UiModal', 'UiConfirmDialog', 'UiDrawer'],
      },
      {
        text: 'Loading & Empty',
        slug: 'loading-empty',
        description: 'Loading, empty, and error states',
        components: ['UiListStatus', 'UiEmptyState', 'UiSpinner', 'UiSkeleton'],
      },
      {
        text: 'Toaster',
        slug: 'toaster',
        description: 'Short messages about the result of an action',
        components: ['UiToaster'],
      },
    ],
  },
]

export function pageLink(page: ComponentPage) {
  return `/components/${page.slug}`
}
