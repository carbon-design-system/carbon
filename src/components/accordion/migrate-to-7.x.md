### HTML

Updating HTML pertains mainly to SVG icon paths. It's recommended to use bluemix-icons locally in your project. 

Update `<use xlink:href>` to a local path of bluemix-icons.svg, which should look something like this:

```html
<svg class="bx--accordion__arrow">
  <use xlink:href="/carbon-icons/bluemix-icons.svg#chevron--right"></use>
</svg>
```

For more details on installing and using bluemix-icons, see install and usage guidelines docs here.

### SCSS

The `_accordion.scss` file is now located at __src/components/accordion/_accordion.scss__. You'll need to update any `@import` statements for this file to reflect this change.

```scss
@import 'path_to_node_modules/@console/bluemix-components/src/components/accordion/accordion';
```


