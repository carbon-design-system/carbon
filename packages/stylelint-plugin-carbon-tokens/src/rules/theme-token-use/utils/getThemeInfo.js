/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { themeTokens, themeFunctions } from './initCarbonTheme';
import { ibmColorTokens, carbonColorTokens } from './initCarbonColor';
import { sassColorFunctions } from './initSassFunctions';

export default function getThemeInfo(options) {
  return {
    tokens: [
      {
        source: 'Theme',
        accept: true,
        values: themeTokens,
      },
      {
        source: 'Carbon color',
        accept: options.acceptCarbonColorTokens,
        values: carbonColorTokens,
      },
      {
        source: 'IBM Color',
        accept: options.acceptIBMColorTokens,
        values: ibmColorTokens,
      },
    ],
    functions: [
      {
        source: 'Theme',
        accept: true,
        values: themeFunctions,
      },
      {
        source: 'SASS',
        accept: true,
        values: sassColorFunctions,
      },
    ],
  };
}
