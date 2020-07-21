### HTML

HTML changes pertain only to the icon. Icon from
[`carbon-elements`](https://github.com/IBM/carbon-elements) package is now used.
Vanilla markup should be migrated to one shown in
[carbondesignsystem.com](https://next.carbondesignsystem.com/components/select/code)
site. React and other framework variants should reflect the change
automatically.

**New Markup**:

```html
<svg
  focusable="false"
  preserveAspectRatio="xMidYMid meet"
  style="will-change: transform;"
  xmlns="http://www.w3.org/2000/svg"
  class="bx--select__arrow"
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
<svg class="bx--select__arrow" width="10" height="5" viewBox="0 0 10 5">
  <path d="M0 0l5 4.998L10 0z" fill-rule="evenodd" />
</svg>
```

### SCSS

The `data-invalid` attribute has moved to account for the new markup.

| v9                     | v10                                       | Note           |
| ---------------------- | ----------------------------------------- | -------------- |
| `select[data-invalid]` | `bx--select-input__wrapper[data-invalid]` | :eyes: Changed |
| -                      | `bx--select-input__wrapper`               | :sparkles: New |
