### HTML

Updating HTML pertains only to the "close" button SVG icon. Icon from
[`carbon-elements`](https://github.com/IBM/carbon-elements) package is now used.
Vanilla markup should be migrated to one shown in
[carbondesignsystem.com](https://next.carbondesignsystem.com/components/modal/code)
site. React and other framework variants should reflect the change
automatically.

**New Markup**:

```html
<svg
  focusable="false"
  preserveAspectRatio="xMidYMid meet"
  style="will-change: transform;"
  xmlns="http://www.w3.org/2000/svg"
  class="bx--modal-close__icon"
  width="16"
  height="16"
  viewBox="0 0 16 16"
  aria-hidden="true"
>
  <path
    d="M12 4.7l-.7-.7L8 7.3 4.7 4l-.7.7L7.3 8 4 11.3l.7.7L8 8.7l3.3 3.3.7-.7L8.7 8z"
  ></path>
</svg>
```

**Old Markup**:

```html
<svg
  class="bx--modal-close__icon"
  width="10"
  height="10"
  viewBox="0 0 10 10"
  xmlns="http://www.w3.org/2000/svg"
>
  <title>Close Modal</title>
  <path
    d="M6.32 5L10 8.68 8.68 10 5 6.32 1.32 10 0 8.68 3.68 5 0 1.32 1.32 0 5 3.68 8.68 0 10 1.32 6.32 5z"
    fill-rule="nonzero"
  />
</svg>
```

###

### SCSS

No new selectors.
