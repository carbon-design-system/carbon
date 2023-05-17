/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { baseFontSize, px } from '@carbon/layout';
import { fontFamilies } from './fontFamily';
import { fontWeights } from './fontWeight';

export const reset = {
  html: {
    fontSize: px(baseFontSize),
  },
  body: {
    fontFamily: fontFamilies.sans,
    fontWeight: fontWeights.regular,
    textRendering: 'optimizeLegibility',
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
  },
  strong: {
    fontWeight: fontWeights.semibold,
  },
  code: {
    fontFamily: fontFamilies.mono,
  },
};
