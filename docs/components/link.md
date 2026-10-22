---
api:
  UiLink:
    props:
      href: 'Link target.'
      external: 'Shows the link as external. When omitted, `isExternalLink` in the [config](../config.md) decides (by default, URLs starting with `http(s)://` or `//`).'
      target: '`target` of the link.'
      linkComponent: 'Component used for internal links. Defaults to `linkComponent` in the [config](../config.md).'
      announcement: 'Text announced for external links. Pass an empty string to omit it. Defaults to the locale text.'
    slots:
      default: 'Link text.'
  UiExternalLink:
    props:
      href: 'URL of the external site.'
      target: '`target` of the link.'
      linkComponent: 'Component used for internal links. Defaults to `linkComponent` in the [config](../config.md).'
      announcement: 'Text announced to say the link goes to an external site. Pass an empty string to omit it. Defaults to the locale text.'
    slots:
      default: 'Link text.'
  UiTextArrowLink:
    props:
      href: 'Link target.'
      linkComponent: 'Component used for internal links. Defaults to `linkComponent` in the [config](../config.md).'
    slots:
      default: 'Link text.'
---

# Link

Links to other pages. UiLink tells internal and external links apart on its own, and two more components offer different looks.

## UiLink

A link that checks whether its target is internal or external and changes how it looks. Use it where the target is not known in advance, such as links in body text.

<DocsDemo name="UiLink" />

### Code

<<< ../demos/UiLink.vue{vue}

### Usage

External links look the same as UiExternalLink, and internal links render with `linkComponent` from the [config](../config.md). Nuxt uses NuxtLink, so internal links navigate without a full page reload. To change how links are classified, pass `external` or change `isExternalLink` in the config.

### Accessibility

For external links, it announces the same "external site" text as UiExternalLink.

### API

<DocsApi name="UiLink" />

## UiExternalLink

A link to an external site. It adds an external link icon after the text.

<DocsDemo name="UiExternalLink" />

### Code

<<< ../demos/UiExternalLink.vue{vue}

### Usage

Use it where the target is known to be external. It opens in the same tab by default; pass `target="_blank"` to open a new tab.

### Accessibility

The icon is decorative; instead, UiVisuallyHidden announces "external site". Change the text with `announcement`, or pass an empty string to omit it.

### API

<DocsApi name="UiExternalLink" />

## UiTextArrowLink

A link with a right arrow after the text. Use it for a standalone link that leads to a list or details, such as "See all posts".

<DocsDemo name="UiTextArrowLink" />

### Code

<<< ../demos/UiTextArrowLink.vue{vue}

### Usage

Place it on its own after a paragraph or list, not in the middle of body text. The link renders with `linkComponent` from the [config](../config.md).

### Accessibility

The arrow is decorative and hidden from screen readers. Only the text is underlined, and the focus outline surrounds both the text and the arrow.

### API

<DocsApi name="UiTextArrowLink" />
