### HTML

Updating HTML pertains only to SVG icon. Icon from
[`carbon-elements`](https://github.com/IBM/carbon-elements) package is now used.

Vanilla markup should be migrated to one shown in
[carbondesignsystem.com](https://next.carbondesignsystem.com/components/accordion/code)
site. React and other framework variants should reflect the change
automatically.

**New Markup**:

```html
<svg
  focusable="false"
  preserveAspectRatio="xMidYMid meet"
  style="will-change: transform;"
  xmlns="http://www.w3.org/2000/svg"
  class="bx--accordion__arrow"
  width="16"
  height="16"
  viewBox="0 0 16 16"
  aria-hidden="true"
>
  <path d="M11 8l-5 5-.7-.7L9.6 8 5.3 3.7 6 3z"></path>
</svg>
```

**Old Markup**:

```html
<svg class="bx--accordion__arrow" width="7" height="12" viewBox="0 0 7 12">
  <path
    fill-rule="nonzero"
    d="M5.569 5.994L0 .726.687 0l6.336 5.994-6.335 6.002L0 11.27z"
  />
</svg>
```

### SCSS

No selector changes.
