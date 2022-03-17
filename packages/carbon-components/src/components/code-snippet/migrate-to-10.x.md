### HTML

Updating HTML pertains only to SVG icons in the copy button and "Show more"
button. Icon from [`carbon-elements`](https://github.com/IBM/carbon-elements)
package is now used.

Vanilla markup should be migrated to one shown in
[carbondesignsystem.com](https://next.carbondesignsystem.com/components/code-snippet/code)
site. React and other framework variants should reflect the change
automatically.

**New Markup**:

```html
<!-- Copy icon -->
<svg
  focusable="false"
  preserveAspectRatio="xMidYMid meet"
  style="will-change: transform;"
  xmlns="http://www.w3.org/2000/svg"
  class="bx--snippet__icon"
  width="16"
  height="16"
  viewBox="0 0 16 16"
  aria-hidden="true"
>
  <path
    d="M14 5v9H5V5h9m0-1H5a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z"
  ></path>
  <path d="M2 9H1V2a1 1 0 0 1 1-1h7v1H2z"></path>
</svg>

<!-- Show more icon -->
<svg
  focusable="false"
  preserveAspectRatio="xMidYMid meet"
  style="will-change: transform;"
  xmlns="http://www.w3.org/2000/svg"
  aria-label="Show more icon"
  class="bx--icon-chevron--down bx--snippet__icon"
  width="16"
  height="16"
  viewBox="0 0 16 16"
  role="img"
>
  <path d="M8 11L3 6l.7-.7L8 9.6l4.3-4.3.7.7z"></path>
</svg>
```

**Old Markup**:

```html
<!-- Copy icon -->
<svg
  class="bx--snippet__icon"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 16 16"
>
  <path d="M1 10H0V2C0 .9.9 0 2 0h8v1H2c-.6 0-1 .5-1 1v8z" />
  <path
    d="M11 4.2V8h3.8L11 4.2zM15 9h-4c-.6 0-1-.4-1-1V4H4.5c-.3 0-.5.2-.5.5v10c0 .3.2.5.5.5h10c.3 0 .5-.2.5-.5V9zm-4-6c.1 0 .3.1.4.1l4.5 4.5c0 .1.1.3.1.4v6.5c0 .8-.7 1.5-1.5 1.5h-10c-.8 0-1.5-.7-1.5-1.5v-10C3 3.7 3.7 3 4.5 3H11z"
  />
</svg>

<!-- Show more icon -->
<svg
  class="bx--icon-chevron--down"
  width="12"
  height="7"
  viewBox="0 0 12 7"
  aria-label="Show more icon"
>
  <title>Show more icon</title>
  <path
    fill-rule="nonzero"
    d="M6.002 5.55L11.27 0l.726.685L6.003 7 0 .685.726 0z"
  />
</svg>
```

### SCSS

No selector changes.
