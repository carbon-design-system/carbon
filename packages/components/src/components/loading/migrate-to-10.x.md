### HTML

Design change around the spinner UI involves markup change for the loading SVG's
circle, utilizing new CSS classes (below). Vanilla markup should be migrated to
one shown in
[carbondesignsystem.com](https://next.carbondesignsystem.com/components/loading/code)
site. React and other framework variants should reflect the change
automatically.

**New Markup**:

```html
<svg class="bx--loading__svg" viewBox="-75 -75 150 150">
  <title>Loading</title>
  <circle class="bx--loading__stroke" cx="0" cy="0" r="37.5" />
</svg>
```

**Old Markup**:

```html
<svg class="bx--loading__svg" viewBox="-75 -75 150 150">
  <title>Loading</title>
  <circle cx="0" cy="0" r="37.5" />
</svg>
```

###

### SCSS

| v9  | v10                   | Note |
| --- | --------------------- | ---- |
| -   | `bx--loading__stroke` | New  |
