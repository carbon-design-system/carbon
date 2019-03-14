### HTML

Icon from [`carbon-elements`](https://github.com/IBM/carbon-elements) package is now used. Also design change around the select box involves changing the list of CSS classes applied to the markup. Vanilla markup should be migrated to one shown in [carbondesignsystem.com](https://next.carbondesignsystem.com/components/date-picker/code) site. React and other framework variants should reflect the change automatically.

### SCSS

The `data-invalid` attribute has been placed on the time picker wrapper div

| Old Class | New Class                     | Note    |
| --------- | ----------------------------- | ------- |
| -         | bx--time-picker[data-invalid] | Changed |
