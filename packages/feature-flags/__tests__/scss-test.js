/**
 * Copyright IBM Corp. 2015, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const { convert, createSassRenderer } = require('@carbon/test-utils/scss');

const render = createSassRenderer(__dirname);

describe('feature-flags.scss', () => {
  it('should work', async () => {
    const { calls } = await render(`
      @import '../scss/feature-flags';

      @if feature-flag-enabled('test') {
        $t: test(true);
      } @else {
        $t: test(false);
      }

      @include feature-flag-enabled('test') {
        $t: test(true);
      }
    `);

    console.log(calls[0].getValue());
  });
});
