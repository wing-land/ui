---
api:
  UiFigure:
    props:
      src: 'URL of the image to enlarge.'
      alt: 'Image description.'
      caption: 'Caption. Also shown in the enlarged view.'
    slots:
      default: 'Image shown in the body. Pass an `<img>` or `<picture>`.'
---

# Figure

## UiFigure

Adds a caption and an enlarged view to an image in a post.

<DocsDemo name="UiFigure" prose />

### Code

<<< ../demos/UiFigure.vue{vue}

### Usage

Put the image shown in the body in the default slot, and pass the URL of the image to enlarge as `src`. Pressing the image opens it in [UiImageLightbox](./photo-album.md#uiimagelightbox), and the caption is shown both below the image and at the top of the enlarged view.

### Accessibility

Renders `<figure>` and `<figcaption>`. The image becomes a button that opens the enlarged view, with an accessible name that includes `alt`, such as "View larger image: description".

### API

<DocsApi name="UiFigure" />
