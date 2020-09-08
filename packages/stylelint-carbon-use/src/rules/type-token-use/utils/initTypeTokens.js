// There are no type tokens that are used directly
// Types are applied via mixins and functions
// const typeTokens = [];

// permitted carbon type functions
// TODO: read this from carbon
const typeFunctions = [
  {
    name: 'carbon--font-weight',
    accept: 'acceptCarbonFontWeightFunction',
  },
  {
    name: 'carbon--type-scale',
    accept: 'acceptCarbonTypeScaleFunction',
  },
];

export { typeFunctions };
