/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getPropSpec } from './propUtils';

export default function isValidOption(option) {
  /* istanbul ignore next */
  const arrOpts = Array.isArray(option) ? option : [option];

  for (const opt of arrOpts) {
    if (!getPropSpec(opt)) {
      if (!__DEV__) {
        // eslint-disable-next-line no-console
        console.warn(
          `Invalid option supplied, expect regular expression or string. "${opt}"`
        );
      }

      return false;
    }
  }

  return true;
}
