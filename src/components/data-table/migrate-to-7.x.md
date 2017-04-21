### HTML

Main changes to HTML are for changes to Overflow Menu, Checkbox and icons that are used in Data Tables.

### SCSS

The `_data-table.scss` file is now located at `src/components/data-table/_data-table.scss`. You will need to update any `@import` statements for this file to reflect this change.

**New**: 
```scss
@import 'path_to_node_modules/carbon-components/src/components/data-table/data-table';
```

**Old**: 
```scss
@import 'path_to_node_modules/@console/bluemix-components/src/components/data-table/data-table';
```

No class changes have been made.

### JavaScript

Previously known as `ResponsiveTable`, the class has been renamed to `DataTable`.

The following methods have been removed:

- `initOverflowMenus`
- `placeOverflow`

The following methods have been renamed to become private methods: 

- `toggleState` => `_toggleState`
- `toggleSelectAll` => `_toggleSelectAll`
- `toggleSort` => `_toggleSort`
- `zebraStripe` => `_zebraStripe`
- `initExpandableRows` => `_initExpandableRows`

