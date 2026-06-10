/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { baseFontSize, px } from '@carbon/layout';
import { mono, sans } from './fontFamily';
import { regular, semibold } from './fontWeight';

export const reset = {
  html: {
    fontSize: /*#__PURE__*/ px(baseFontSize),
  },
  body: {
    fontFamily: sans,
    fontWeight: regular,
    textRendering: 'optimizeLegibility',
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
  },
  strong: {
    fontWeight: semibold,
  },
  code: {
    fontFamily: mono,
  },
};
