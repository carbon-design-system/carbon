/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

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
