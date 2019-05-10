### HTML

HTML changes pertain only to the search and clear icon. Icon from
[`carbon-elements`](https://github.com/IBM/carbon-elements) package is now used.
Vanilla markup should be migrated to one shown in
[carbondesignsystem.com](https://next.carbondesignsystem.com/components/search/code)
site. React and other framework variants should reflect the change
automatically.

**New Markup**:

```html
<!-- Search icon -->
<svg
  focusable="false"
  preserveAspectRatio="xMidYMid meet"
  style="will-change: transform;"
  xmlns="http://www.w3.org/2000/svg"
  class="bx--search-magnifier"
  width="16"
  height="16"
  viewBox="0 0 16 16"
  aria-hidden="true"
>
  <path
    d="M15 14.3L10.7 10c1.9-2.3 1.6-5.8-.7-7.7S4.2.7 2.3 3 .7 8.8 3 10.7c2 1.7 5 1.7 7 0l4.3 4.3.7-.7zM2 6.5C2 4 4 2 6.5 2S11 4 11 6.5 9 11 6.5 11 2 9 2 6.5z"
  ></path>
</svg>

<!-- Clear icon -->
<svg
  focusable="false"
  preserveAspectRatio="xMidYMid meet"
  style="will-change: transform;"
  xmlns="http://www.w3.org/2000/svg"
  class="bx--search-clear"
  width="20"
  height="20"
  viewBox="0 0 32 32"
  aria-hidden="true"
>
  <path
    d="M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4l6.6 6.6L8 22.6 9.4 24l6.6-6.6 6.6 6.6 1.4-1.4-6.6-6.6L24 9.4z"
  ></path>
</svg>
```

**Old Markup**:

```html
<!-- Search icon -->
<svg class="bx--search-magnifier" width="16" height="16" viewBox="0 0 16 16">
  <path
    d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zm4.936-1.27l4.563 4.557-.707.708-4.563-4.558a6.5 6.5 0 1 1 .707-.707z"
    fill-rule="nonzero"
  />
</svg>

<!-- Clear icon -->
<svg
  width="16"
  height="16"
  viewBox="0 0 16 16"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M8 6.586L5.879 4.464 4.464 5.88 6.586 8l-2.122 2.121 1.415 1.415L8 9.414l2.121 2.122 1.415-1.415L9.414 8l2.122-2.121-1.415-1.415L8 6.586zM8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"
    fill-rule="evenodd"
  />
</svg>
```

### SCSS

No selector changes.
