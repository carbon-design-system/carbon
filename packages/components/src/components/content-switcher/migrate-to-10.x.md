### HTML

Updating HTML pertains only to SVG icon. Content switcher with icon is no longer
supported.

Vanilla markup should be migrated to one shown in
[carbondesignsystem.com](https://next.carbondesignsystem.com/components/content-switcher/code)
site. React and other framework variants should reflect the change
automatically.

**New Markup**:

```html
No longer supporting content switcher with icon
```

**Old Markup**:

```html
<svg
  class="bx--content-switcher__icon"
  width="16"
  height="16"
  viewBox="0 0 16 16"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M7 7H4v2h3v3h2V9h3V7H9V4H7v3zm1 9A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"
    fill-rule="evenodd"
  />
</svg>
```

### SCSS

No selector changes.
