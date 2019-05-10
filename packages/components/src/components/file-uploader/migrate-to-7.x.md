### HTML

HTML for File Uploader has changed a lot, it will be best to simply copy and
paste the HTML to your project. With that said, here are some of the main
changes to be aware of.

HTML for File Uploader (along with all other form elements) now use
`.bx--form-item` to wrap the HTML and `.bx--label` to use as a label. There's
also a new `.bx--file-container` element that is used to display filename
elements. See README for details on how this works.

### SCSS

The `_file-uploader.scss` file is now located at
`src/components/file-uploader/_file-uploader.scss`. You will need to update any
`@import` statements for this file to reflect this change.

**New**:

```scss
@import 'path_to_node_modules/carbon-components/src/components/file-uploader/file-uploader';
```

**Old**:

```scss
@import 'path_to_node_modules/@console/bluemix-components/src/components/file-uploader/file-uploader';
```

| Old Class         | New Class                   | Note    |
| ----------------- | --------------------------- | ------- |
| bx--file\_\_label | bx--label                   | Changed |
|                   | bx--form-item               | Added   |
|                   | bx--label-description       | Added   |
|                   | bx--file                    | Added   |
|                   | bx--file-btn                | Added   |
|                   | bx--file-container          | Added   |
|                   | .bx--file=filename          | Added   |
|                   | bx--file\_\_state-container | Added   |
|                   | bx--file--close             | Added   |
|                   | bx--file--complete          | Added   |
|                   | bx--loading                 | Added   |

### JavaScript

The entire API for `FileUploader` has changed. See README for details.
