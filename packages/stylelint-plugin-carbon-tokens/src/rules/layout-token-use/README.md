# Layout Token Use

This rule is intended enforce use of Carbon theme tokens, functions, mixins and
CSS classes as defined.

- [https://www.carbondesignsystem.com/guidelines/layout/overview](https://www.carbondesignsystem.com/guidelines/layout/overview)

By default it accepts undefined SCSS and CSS variables.

NOTE: Transition and animation shorthand must conform to expected order

Optionally accepts container, icon size and fluid spacing tokens.

## Default props

```js
const defaultOptions = {
  // include standard layout properties
  includeProps: [
    '/^margin$/<1 4>',
    '/^margin-/',
    '/^padding$/<1 4>',
    '/^padding-/',
    'height',
    'width',
    'left',
    'top',
    'bottom',
    'right',
    'transform',
  ],
  // Accept transparent, common reset values, 0, proportional values,
  acceptValues: ['/inherit|initial/', '/^0[a-z]*$/', '/^[0-9]*(%|vw|vh)$/'],
  acceptUndefinedVariables: true,
  acceptContainerTokens: false,
  acceptIconSizeTokens: false,
  acceptFluidSpacingTokens: false,
};
```
