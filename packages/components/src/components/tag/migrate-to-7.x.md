### HTML

HTML has not changed except for class attributes. See SCSS for more details.

### SCSS

The `_tag.scss` file is now located at `src/components/tag/_tag.scss`. You will
need to update any `@import` statements for this file to reflect this change.

**New**:

```scss
@import 'path_to_node_modules/carbon-components/src/components/tag/tag';
```

**Old**:

```scss
@import 'path_to_node_modules/@console/bluemix-components/src/components/tag/tag';
```

| Old Class         | New Class             | Note    |
| ----------------- | --------------------- | ------- |
|                   | bx--tag               | Added   |
| tag--ibm          | bx--tag--ibm          | Changed |
| tag--beta         | bx--tag--beta         | Changed |
| tag--third-party  | bx--tag--third-party  | Changed |
| tag--local        | bx--tag--local        | Changed |
| tag--dedicated    | bx--tag--dedicated    | Changed |
| tag--custom       | bx--tag--custom       | Changed |
| tag--experimental | bx--tag--experimental | Changed |
| tag--community    | bx--tag--community    | Changed |
| tag--private      | bx--tag--private      | Changed |
| tag--deprecated   |                       | Removed |
