### HTML

HTML changes pertain only to the SVG icon for tabs dropdown. Icon from
[`carbon-elements`](https://github.com/IBM/carbon-elements) package is now used.
Vanilla markup should be migrated to one shown in
[carbondesignsystem.com](https://next.carbondesignsystem.com/components/tabs/code)
site. React and other framework variants should reflect the change
automatically.

**New Markup**:

```html
<svg
  focusable="false"
  preserveAspectRatio="xMidYMid meet"
  style="will-change: transform;"
  xmlns="http://www.w3.org/2000/svg"
  width="10"
  height="6"
  viewBox="0 0 10 6"
  aria-hidden="true"
>
  <path d="M5 6L0 1 .7.3 5 4.6 9.3.3l.7.7z"></path>
</svg>
```

**Old Markup**:

```html
<svg
  class="bx--dropdown__arrow"
  width="10"
  height="5"
  viewBox="0 0 10 5"
  fill-rule="evenodd"
>
  <path d="M10 0L5 5 0 0z"></path>
</svg>
```

### SCSS

One new class, all other selectors remain unchanged.

| v9  | v10                      | Remarks                                                                                           |
| --- | ------------------------ | ------------------------------------------------------------------------------------------------- |
| -   | `bx--tabs-trigger--open` | :sparkles: New; Added via JS to the trigger button when open in mobile view. Allows for animation |

### JavaScript

A new component option, `selectorButtonEnabled` has been added. Please see
[`README.md`](./README.md#options) for more details.
