/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import format from 'pretty-format';

export class ValidationError extends Error {
  constructor([expectation, expected, actual]) {
    super(expectation);

    if (!expected && !actual) {
      this.message = expectation;
    } else if (actual) {
      this.message =
        `${expectation}. Expected \`${format(expected)}\`, ` +
        `instead received: \`${format(actual)}\``;
    } else {
      this.message = `${expectation}. Expected \`${format(expected)}\``;
    }
  }
}
