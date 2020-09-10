/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { TOKEN_TYPES } from './tokenizeValue';

export default function isVariable(val) {
  if (typeof val === 'string') {
    return (
      val !== undefined &&
      (val.startsWith('$') || val.startsWith('--') || val.startsWith('var(--'))
    );
  } else {
    // is tokenized
    if (val.type === TOKEN_TYPES.SCSS_VAR) {
      return true;
    } else {
      return val.type === TOKEN_TYPES.FUNCTION && val.value === 'var';
    }
  }
}
