# Motion Token Use

This rule is intended to enforce the use of Carbon theme tokens, functions,
mixins and CSS classes as defined.

- [https://www.carbondesignsystem.com/guidelines/motion/overview](https://www.carbondesignsystem.com/guidelines/motion/overview)

By default it accepts undefined SCSS and CSS variables.

NOTE: Transition and animation shorthand must conform to expected order

## Default props

```js
const defaultOptions = {
  // include standard motion properties
  includeProps: [
    'transition<2>', // only permitted definition order fails otherwise
    'transition-duration',
    'animation<1>', // only permitted definition order fails otherwise
    'animation-duration',
  ],
  //  Accept reset values
  acceptValues: ['0s', '0'],
  acceptUndefinedVariables: true,
};
```
