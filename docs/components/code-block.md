---
api:
  UiCodeBlock:
    props:
      code: 'Text to copy. Shown as is when there is no `default` slot.'
      language: 'Language name. Shown at the top when there is no `filename`.'
      filename: 'File name shown at the top.'
      codeClass: 'Class added to the `<pre>`.'
      codeAriaLabel: 'Accessible name of the `<pre>`. Defaults to the locale text with the language name.'
      copyLabel: 'Accessible name of the copy button. Defaults to the locale text.'
      copiedLabel: 'Text announced when copying succeeds. Defaults to the locale text.'
      copyErrorLabel: 'Text shown when copying fails. Defaults to the locale text.'
    slots:
      default: 'A highlighted `<code>` element. When omitted, `code` is shown as is.'
---

# Code Block

## UiCodeBlock

Shows multi-line code with the language name or file name and a copy icon button.

<DocsDemo name="UiCodeBlock" />

### Code

<<< ../demos/UiCodeBlock.vue{vue}

### Usage

Pass the text to copy as `code`. This component does not highlight syntax, so pass a `<code>` element highlighted with a tool such as Shiki in the default slot. The library's color themes can be imported from `@wing-land/ui/theme/shiki`. Long lines scroll horizontally within the code area.

### Accessibility

The `<pre>` that holds the code gets an accessible name and is focusable, so it can be scrolled with the keyboard. The copy button shows only an icon, with `copyLabel` as its accessible name. After copying, the icon changes to a check mark and the result is announced with `role="status"`. The visible button is 30px wide, but its hit area extends to about 42px.

### API

<DocsApi name="UiCodeBlock" />
