### HTML

The new HTML is structurally the same. However, we've now added the
`[data-search]` attribute. This allows the component's JavaScript to function.
In addition a few class names have been changed slightly. See below.

### SCSS

The `_search.scss` file is now located at `src/components/search/_search.scss`.
You'll need to update any `@import` statements for this file to reflect this
change.

**New**:

```scss
@import 'path_to_node_modules/carbon-components/src/components/search/search';
```

**Old**:

```scss
@import 'path_to_node_modules/@console/bluemix-components/src/components/search/search';
```

| Old Class                     | New Class                 | Note    |
| ----------------------------- | ------------------------- | ------- |
| bx--search\_\_icon--magnifier | bx--search--magnifier     | Changed |
| bx--search\_\_label           | bx--label                 | Changed |
| bx--search\_\_input           | bx--search-input          | Changed |
|                               | bx--search--lg            | Added   |
|                               | bx--search--close         | Added   |
|                               | bx--search--close--hidden | Added   |
|                               | bx--search-button         | Added   |
|                               | bx--search-view--hidden   | Added   |

### JavaScript

The search component now has JavaScript! Make sure you've added the
`[data-search]` attribute for it to work.
