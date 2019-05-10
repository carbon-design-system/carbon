### HTML

Previously supported HTML for content-switcher that was deprecated in 6.x has
now been removed in 7.x. Use the smaller, simpler HTML for content-switcher from
now on:

```html
<div data-content-switcher class="bx--content-switcher">
  <button
    class="bx--content-switcher-btn bx--content-switcher--selected"
    data-target=".demo--panel--opt-1"
  >
    Option 1
  </button>
  <button class="bx--content-switcher-btn" data-target=".demo--panel--opt-2">
    Option 2
  </button>
  <button class="bx--content-switcher-btn" data-target=".demo--panel--opt-3">
    Option 3
  </button>
</div>
```

### SCSS

The `_content-switcher.scss` file is now located at
`src/components/content-switcher/_content-switcher.scss`. You will need to
update any `@import` statements for this file to reflect this change.

**New**:

```scss
@import 'path_to_node_modules/carbon-components/src/components/content-switcher/content-switcher';
```

**Old**:

```scss
@import 'path_to_node_modules/@console/bluemix-components/src/components/content-switcher/content-switcher';
```

Classes for content-switcher have been renamed to use less BEM underscores.
