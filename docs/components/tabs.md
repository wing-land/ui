---
api:
  UiTabs:
    props:
      items: 'Tabs. `{ value, label, icon?, badge?, disabled? }`.'
      label: 'Accessible name of the tab list.'
      activationMode: 'With `manual`, tabs switch only when Enter or Space is pressed. Use it when panels are slow to show.'
      orientation: 'Layout direction of the tabs.'
      keepMounted: 'Keeps hidden panels on the page, preserving content such as unsaved input.'
      modelValue: '`value` of the selected tab. Defaults to the first tab.'
    slots:
      panel: "Content of each panel. Receives `item`. A slot named after an item's `value` takes precedence."
      end: 'Controls at the end of the tab row, such as a search box or a view switch. Horizontal tabs only.'
---

# Tabs

## UiTabs

Tabs that switch the content shown in the same place. Use them to compare related content without leaving the page.

<DocsDemo name="UiTabs" />

### Code

<<< ../demos/UiTabs.vue{vue}

### Usage

Put each panel's content in a slot named after the item's `value`. If every panel has the same shape, write it once in the `panel` slot. Hidden panels are removed by default; to keep unsaved input, set `keepMounted`.

To put controls that act on the panel, such as a search box, a sort label, or a view switch, on the same row as the tabs, use the `end` slot. The row keeps one line under both, and the controls move below the tabs when the row runs out of space. Do not give a tab the value `end`, because that name is taken by the slot.

### Accessibility

Renders the tabs with `role="tablist"` and `role="tab"`, and the panels with `role="tabpanel"`. The arrow keys move between tabs and switch them, and the Tab key moves into the panel. Built on Reka UI Tabs.

### API

<DocsApi name="UiTabs" />
