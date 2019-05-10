### HTML

Updating HTML pertains only to SVG icon. Icon from
[`carbon-elements`](https://github.com/IBM/carbon-elements) package is now used.

Vanilla markup should be migrated to one shown in
[carbondesignsystem.com](https://next.carbondesignsystem.com/components/button/code)
site. React and other framework variants should reflect the change
automatically.

**New Markup**:

```html
<svg
  focusable="false"
  preserveAspectRatio="xMidYMid meet"
  style="will-change: transform;"
  xmlns="http://www.w3.org/2000/svg"
  class="bx--btn__icon"
  width="16"
  height="16"
  viewBox="0 0 16 16"
  aria-hidden="true"
>
  <path d="M8.5 7.5V3h-1v4.5H3v1h4.5V13h1V8.5H13v-1z"></path>
</svg>
```

**Old Markup**:

```html
<svg
  class="bx--btn__icon"
  width="16"
  height="16"
  viewBox="0 0 16 16"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <path
    d="M7 7H4v2h3v3h2V9h3V7H9V4H7v3zm1 9A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"
    fill-rule="evenodd"
  />
</svg>
```

### SCSS

No changes to _existing_ selectors, but now has _new selectors_.

| v9                    | v10                | Note                                   |
| --------------------- | ------------------ | -------------------------------------- |
| -                     | `bx--btn—disabled` | ✨New; Used to target disabled buttons |
| `.bx--btn`            | No change          |                                        |
| `.bx--btn--primary`   | No change          |                                        |
| `.bx--btn--secondary` | No change          |                                        |
| `.bx--btn--tertiary`  | No change          |                                        |
| `.bx--btn--danger`    | No change          |                                        |
| `.bx--btn--sm`        | No change          |                                        |
| `.bx--btn—ghost`      | No change          |                                        |
