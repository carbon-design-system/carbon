### HTML

Most of the changes to HTML pertain mainly to class changes. See SCSS for
details.

SVGs representing incomplete, complete and current steps now rely on inline SVGs
and not bluemix-icons. The JavaScript for ProgressIndicator needs to remove and
inject SVG data into HTML to represent visual state of the component. Relying on
`xlink:href` is not consistent enough to be sustainable for how
`ProgressIndicator` is used.

### SCSS

The `_progress-indicator.scss` file is now located at
`src/components/progress-indicator/_progress-indicator.scss`. You will need to
update any `@import` statements for this file to reflect this change.

**New**:

```scss
@import 'path_to_node_modules/carbon-components/src/components/progress-indicator/progress-indicator';
```

**Old**:

```scss
@import 'path_to_node_modules/@console/bluemix-components/src/components/progress-indicator/progress-indicator';
```

| Old Class                                | New Class                     | Note      |
| ---------------------------------------- | ----------------------------- | --------- |
| bx--progress-indicator                   | bx--progress                  | Changed   |
| bx--progress-indicator\_\_step           |                               | Unchanged |
| bx--progress-indicator\_\_step--complete | bx--progress-step--complete   | Changed   |
|                                          | bx--progress-step--incomplete | Added     |
| bx--progress-indicator\_\_step--active   | bx--progress-step--current    | Changed   |
| bx--progress-indicator\_\_icon           |                               | Removed   |
| bx--progress-indicator\_\_label          | bx--progress-label            | Changed   |

### JavaScript

The `ProgressIndicator` class should be used to initialize the component
instance. Previously, this component was not needed but it was decided that
having automatic state changes would make the experience of implementing this
component easier for the developer. State specifically means pertains to the
automatic setting of CSS modifier classes to represent visual state.
