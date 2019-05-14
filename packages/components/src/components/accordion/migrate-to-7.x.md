### HTML

Updating HTML pertains mainly to SVG icon paths. It's now recommended to use
inline SVG icons.

```html
<svg
  class="bx--accordion__arrow"
  width="8"
  height="12"
  viewBox="0 0 8 12"
  fill-rule="evenodd"
>
  <path d="M0 10.6L4.7 6 0 1.4 1.4 0l6.1 6-6.1 6z"></path>
</svg>
```

But if you're going to make use of carbon-icons.svg, it's recommended to use the
sprite svg file locally in your project.

Update `<use xlink:href>` to a local path of bluemix-icons.svg, which should
look something like this:

```html
<svg class="bx--accordion__arrow">
  <use xlink:href="/carbon-icons/bluemix-icons.svg#chevron--right"></use>
</svg>
```

For more details on installing and using bluemix-icons, see install and usage
guidelines docs here.

### SCSS

The `_accordion.scss` file is now located at
`src/components/accordion/_accordion.scss`. You'll need to update any `@import`
statements for this file to reflect this change.

**New**:

```scss
@import 'path_to_node_modules/carbon-components/src/components/accordion/accordion';
```

**Old**:

```scss
@import 'path_to_node_modules/@console/bluemix-components/src/components/accordion/accordion';
```
