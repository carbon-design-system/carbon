### HTML

Icon from [`carbon-elements`](https://github.com/IBM/carbon-elements) package is now used. Vanilla markup should be migrated to one shown in [carbondesignsystem.com](https://next.carbondesignsystem.com/components/select/code) site. React and other framework variants should reflect the change automatically.

### SCSS

The `data-invalid` attribute has moved to account for the new markup

| Old Class            | New Class                                 | Note    |
| -------------------- | ----------------------------------------- | ------- |
| select[data-invalid] | bx--select-input\_\_wrapper[data-invalid] | Changed |
