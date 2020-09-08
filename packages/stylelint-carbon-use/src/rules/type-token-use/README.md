# Type Token Use

This rule is intended enfoce use of Carbon type tokens, functions, mixins and
CSS classes as defined.
[https://www.carbondesignsystem.com/guidelines/typography/overview/](https://www.carbondesignsystem.com/guidelines/typography/overview/)

It optionally allows use of carbon--font-weight function.

## Default props

```js
const defaultOptions = {
  // include standard type properites
  includeProps: ['font', '/^font-*/', 'line-height', 'letterSpacing'],
  acceptValues: ['/inherit|initial/'],
  acceptCarbonFontWeightFunction: false, // permit use of carbon font weight function
  acceptCarbonTypeScaleFunction: false, // permit use of carbon type scale function
};
```
