### HTML

No changes.

### SCSS

The `_pagination.scss` file is now located at __src/components/pagination/_pagination.scss__. You will need to update any `@import` statements for this file to reflect this change.

```scss
@import 'path_to_node_modules/@console/bluemix-components/src/components/pagination/pagination';
```

No class changes.


### JavaScript

The `emitEvent` is now a private method and has been renamed to `_emitEvent`. 

The `components` and `options` properties are now declared using `static`. 
