---
api:
  UiSiteFooter:
    props:
      links: 'Links. `{ href, label, external? }`. With `external`, the link is shown as external.'
      linkComponent: 'Component used for internal links. Defaults to `linkComponent` in the [config](../config.md).'
    slots:
      brand: 'Site name or similar content placed on the left.'
---

# Footer

## UiSiteFooter

A footer with the site name and links at the bottom of the page. Use it for secondary links such as a privacy policy or external accounts.

<DocsDemo name="UiSiteFooter" />

### Code

<<< ../demos/UiSiteFooter.vue{vue}

### Usage

Links with `external` are shown with UiExternalLink and get the external link icon. To align the width with the rest of the page, put it inside UiContainer.

### Accessibility

Renders a `<footer>` element. External links are marked with the icon only, without the "external site" text that UiExternalLink announces.

### API

<DocsApi name="UiSiteFooter" />
