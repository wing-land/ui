---
api:
  UiAvatar:
    props:
      name: 'Name of the person. Used for the initials when there is no image, and as the image description when `alt` is omitted.'
      src: 'Image URL. Initials are shown if it fails to load.'
      alt: 'Image description. Pass an empty string when the name is shown next to the avatar.'
      size: 'Display size in px.'
      imageSize: '`width` and `height` attributes of the `<img>`. Defaults to `size`.'
  UiAvatarGroup:
    props:
      items: 'People. `{ name, src? }`.'
      label: 'Accessible name of the group.'
      max: 'Maximum number shown. The rest are shown as a count. If only one person is left over, that person is shown too.'
      size: 'Size of each avatar in px.'
  UiProfileIdentity:
    props:
      name: 'Name. Shown as a heading.'
      alias: 'Alternate name shown small after the name.'
      description: 'Description below the name.'
      imageSrc: 'Image URL. The initials of `name` are shown when omitted.'
      imageAlt: 'Image description. Empty by default, because the name is shown next to the image.'
      headingId: '`id` of the heading. Generated when omitted.'
      headingLevel: 'Heading level of the name.'
      imageSize: '`width` and `height` attributes of the `<img>`.'
    slots:
      description: 'Content placed where the description goes. Use it to include links.'
---

# Avatar

Images that represent people. Covers a single person, a group of people, and a profile with a name and description.

## UiAvatar

A round image that represents a person or account. When there is no image, or it fails to load, it shows the initials of the name.

<DocsDemo name="UiAvatar" />

### Code

<<< ../demos/UiAvatar.vue{vue}

### Usage

The initials are the first letter of each word in the name, up to two letters. To change the size with the screen width, override `width` and `height` in your own CSS.

### Accessibility

The image description is `alt`, or `name` when omitted. When the name is shown next to the avatar, pass an empty `alt` so it is not read twice. When initials are shown, the same description is given with `role="img"`.

### API

<DocsApi name="UiAvatar" />

## UiAvatarGroup

Avatars of several people, slightly overlapping. Use it to show who is involved at a glance, such as the people working on a document.

<DocsDemo name="UiAvatarGroup" />

### Code

<<< ../demos/UiAvatarGroup.vue{vue}

### Usage

`max` sets how many people are shown. The rest are shown as a count such as "+3". If only one person is left over, that person is shown instead of "+1".

### Accessibility

Renders a `<ul>` list with `label` as the group's accessible name. "+3" is announced as "and 3 more".

### API

<DocsApi name="UiAvatarGroup" />

## UiProfileIdentity

Shows the name, image, and short description of a profile together. Use it at the top of a profile page or to introduce an author.

<DocsDemo name="UiProfileIdentity" />

### Code

<<< ../demos/UiProfileIdentity.vue{vue}

### Usage

The name is shown as a heading; change its level with `headingLevel`. To include links in the description, use the `description` slot instead of the `description` prop. The text moves below the image when the component is too narrow to fit both side by side, and the image shrinks at 560px or narrower. It sizes its layout from its container, so it cannot shrink to fit its content: in a flex item without a width, `width: fit-content`, or an absolutely positioned box, give it a width.

### Accessibility

Renders a `<section>` named by the name heading. Since the name is already next to the image, the image is decorative by default; pass `imageAlt` only when the image shows something the name does not.

### API

<DocsApi name="UiProfileIdentity" />
