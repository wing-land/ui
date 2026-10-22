---
api:
  UiPhotoAlbumCard:
    props:
      cover: 'URL of the cover image.'
      coverAlt: 'Description of the cover image.'
      title: 'Title of the album.'
      countLabel: 'Photo count text. Pass it formatted, such as "2 photos". Not shown when omitted.'
      tags: 'Tags shown below the title, separated by " · ".'
      openLabel: 'Accessible name of the card. Replaces the visible text, so include the title. When omitted, the visible text is used.'
      coverSize: '`width` and `height` attributes of the cover `<img>`.'
      href: 'Renders the card as a link. When omitted, it is a button that opens the viewer.'
      linkComponent: 'Component used for internal links. Defaults to `linkComponent` in the [config](../config.md).'
  UiPhotoAlbumViewer:
    props:
      albumLabel: 'Accessible name of the dialog when no album is open. Defaults to the locale text.'
      albumSuffix: 'Text announced after the album title. Defaults to the locale text.'
      photoLabel: "Prefix of each photo's accessible name. Defaults to the locale text."
      previousLabel: 'Accessible name of the previous photo button. Defaults to the locale text.'
      nextLabel: 'Accessible name of the next photo button. Defaults to the locale text.'
    events:
      close: 'Emitted when the viewer closes.'
    exposed:
      open: 'Opens an album. `photoIndex` picks the first photo shown.'
  UiImageLightbox:
    props:
      src: 'URL of the image to enlarge.'
      alt: 'Image description. Also used in the accessible name of the button.'
      caption: 'Caption shown in the enlarged view.'
      label: 'Accessible name of the enlarged view dialog. Defaults to the locale text.'
    slots:
      default: 'Image shown inside the button.'
---

# Photo Album

Components for showing photos: an album card, a modal for browsing an album, and an enlarged view of a single image.

## UiPhotoAlbumCard

A card that shows the cover, title, photo count, and tags of a photo album.

<DocsDemo name="UiPhotoAlbumCard" />

### Code

<<< ../demos/UiPhotoAlbumCard.vue{vue}

### Usage

By default it is a button that opens [UiPhotoAlbumViewer](#uiphotoalbumviewer). If each album has its own page, pass `href` to make the card a link. The card fills the width of its container, such as a grid cell. When the card is 300px or narrower, the photo count moves below the title. It sizes its layout from its container, so it cannot shrink to fit its content: in a flex item without a width, `width: fit-content`, or an absolutely positioned box, give it a width.

### Accessibility

The whole card is a single button or link. By default its accessible name comes from its visible text: the cover description, title, count, and tags. To say what happens instead, pass `openLabel`, such as "Open the summer trip album"; it replaces the visible text, so keep the title in it for voice control users.

### API

<DocsApi name="UiPhotoAlbumCard" />

## UiPhotoAlbumViewer

Browses a photo album one photo at a time in a modal. The previous and next buttons, or the Left and Right arrow keys, move between photos.

<DocsDemo name="UiPhotoAlbumViewer" />

### Code

<<< ../demos/UiPhotoAlbumViewer.vue{vue}

### Usage

Place the component on the page and open it by passing an album to `open()`. Pass `photoIndex` to start from that photo.

### Accessibility

Opens in a [UiModal](./dialog.md#uimodal) and returns focus to the element that opened it when closed. Moving between photos announces the position, such as "3 / 10", and the caption with `aria-live`.

### API

<DocsApi name="UiPhotoAlbumViewer" />

## UiImageLightbox

Shows an image large in a modal when it is pressed.

<DocsDemo name="UiImageLightbox" prose />

### Code

<<< ../demos/UiImageLightbox.vue{vue}

### Usage

Put the image shown in the body in the default slot, and pass the URL of the image to enlarge as `src`. The large image loads only when the modal opens. To also show a caption, use [UiFigure](./figure.md#uifigure).

### Accessibility

The image becomes a button that opens the enlarged view, with an accessible name that includes `alt`. The modal is a [UiModal](./dialog.md#uimodal); it closes with Escape, the close button, or a click on the backdrop, and returns focus to the image.

### API

<DocsApi name="UiImageLightbox" />
