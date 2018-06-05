### HTML

The basic empty Footer has been removed.
Now there's only one variant of HTML for Footer that more closely resembles what's being used in Bluemix configuration pages.

### SCSS

The `_footer.scss` file is now located at `src/components/footer/_footer.scss`. You will need to update any `@import` statements for this file to reflect this change.

**New**:

```scss
@import 'path_to_node_modules/carbon-components/src/components/footer/footer';
```

**Old**:

```scss
@import 'path_to_node_modules/@console/bluemix-components/src/components/footer/footer';
```

| Old Class                               | New Class                | Note      |
| --------------------------------------- | ------------------------ | --------- |
| bx--footer                              | bx--footer               | Unchanged |
|                                         | bx--footer--bottom-fixed | Added     |
|                                         | bx--footer-info          | Added     |
|                                         | bx--footer-info\_\_item  | Added     |
|                                         | bx--footer-info\_\_label | Added     |
|                                         | bx--footer-cta           | Added     |
| bx--footer\_\_container                 |                          | Removed   |
| bx--footer--config                      |                          | Removed   |
| bx--footer--config\_\_container         |                          | Removed   |
| bx--footer--config\_\_information       |                          | Removed   |
| bx--footer--config\_\_support           |                          | Removed   |
| bx--footer--config\_\_support-question  |                          | Removed   |
| bx--footer--config\_\_submit            |                          | Removed   |
| bx--footer--config\_\_submit-price      |                          | Removed   |
| bx--footer--config\_\_settings-question |                          | Removed   |
