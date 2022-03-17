### HTML

Updating HTML pertains only to the SVG icon. Icon from
[`carbon-elements`](https://github.com/IBM/carbon-elements) package is now used.
Vanilla markup should be migrated to one shown in
[carbondesignsystem.com](https://next.carbondesignsystem.com/components/overflow-menu/code)
site. React and other framework variants should reflect the change
automatically.

**New Markup**:

```html
<svg
  focusable="false"
  preserveAspectRatio="xMidYMid meet"
  style="will-change: transform;"
  xmlns="http://www.w3.org/2000/svg"
  class="bx--overflow-menu__icon"
  width="16"
  height="16"
  viewBox="0 0 16 16"
  aria-hidden="true"
>
  <circle cx="8" cy="3" r="1"></circle>
  <circle cx="8" cy="8" r="1"></circle>
  <circle cx="8" cy="13" r="1"></circle>
</svg>
```

**Old Markup**:

```html
<svg
  aria-hidden="true"
  class="bx--overflow-menu__icon"
  width="3"
  height="15"
  viewBox="0 0 3 15"
>
  <g fill-rule="evenodd">
    <circle cx="1.5" cy="1.5" r="1.5" />
    <circle cx="1.5" cy="7.5" r="1.5" />
    <circle cx="1.5" cy="13.5" r="1.5" />
  </g>
</svg>
```

### SCSS

No new selectors.
