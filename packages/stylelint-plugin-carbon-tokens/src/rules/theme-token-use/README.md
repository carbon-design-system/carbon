# Theme Token Use

This rule is intended enfoce use of Carbon theme tokens, functions, mixins and
CSS classes as defined.

- [https://www.carbondesignsystem.com/guidelines/color/overview](https://www.carbondesignsystem.com/guidelines/color/overview)
- [https://www.carbondesignsystem.com/guidelines/themes/overview](https://www.carbondesignsystem.com/guidelines/themes/overview)

It optionally allows use of Carbon color tokens and IBM color tokens.

NOTE: Use of IBM color tokens are deprecated.

By default it accepts undefined SCSS and CSS variables.

## Default props

```js
const defaultOptions = {
  // include standard color properties
  includeProps: ['/color$/', '/shadow$/<-1>', 'border<-1>', 'outline<-1>'],
  // Accept transparent, common reset values and 0 on its own
  acceptValues: ['/transparent|inherit|initial/', '/^0$/'],
  acceptCarbonColorTokens: false,
  acceptIBMColorTokens: false,
  acceptUndefinedVariables: true,
};
```
