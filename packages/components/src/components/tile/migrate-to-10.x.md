### HTML

Minor markup changes in the selectable and expandable tile. Icons from
[`carbon-elements`](https://github.com/IBM/carbon-elements) package are now
used. Vanilla markup should be migrated to one shown in
[carbondesignsystem.com](https://next.carbondesignsystem.com/components/tile/code)
site. React and other framework variants should reflect the change
automatically.

**Things to note**:

- Tile input is no longer a child of the selectable tile, it's a sibling of it
- New icons are used in both the selectable and expandable tiles

**New structure**:

```bash
bx--tile-input
bx--tile--selectable
├── bx--tile__checkmark
│   └── svg* (new icon)
└──  bx--tile-content
```

```html
<!-- *Selectable svg -->
<svg
  focusable="false"
  preserveAspectRatio="xMidYMid meet"
  style="will-change: transform;"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 16 16"
  aria-hidden="true"
>
  <path
    d="M8 1C4.1 1 1 4.1 1 8s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zM7 11L4.3 8.3l.9-.8L7 9.3l4-3.9.9.8L7 11z"
  ></path>
  <path d="M7 11L4.3 8.3l.9-.8L7 9.3l4-3.9.9.8L7 11z" opacity="0"></path>
</svg>

<!-- Expandable svg -->
<svg
  focusable="false"
  preserveAspectRatio="xMidYMid meet"
  style="will-change: transform;"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 16 16"
  aria-hidden="true"
>
  <path d="M8 11L3 6l.7-.7L8 9.6l4.3-4.3.7.7z"></path>
</svg>
```

**Old structure**:

```bash
bx--tile--selectable
├── bx--tile-input
├── bx--tile__checkmark
│   └── svg* (old icon)
└──  bx--tile-content
```

```html
<!-- *Selectable svg -->
<svg width="16" height="16" viewBox="0 0 16 16">
  <path
    d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zm3.646-10.854L6.75 10.043 4.354 7.646l-.708.708 3.104 3.103 5.604-5.603-.708-.708z"
    fill-rule="evenodd"
  />
</svg>

<!-- Expandable svg -->
<svg width="12" height="7" viewBox="0 0 12 7">
  <path
    fill-rule="nonzero"
    d="M6.002 5.55L11.27 0l.726.685L6.003 7 0 .685.726 0z"
  />
</svg>
```

### SCSS

No selector changes.
