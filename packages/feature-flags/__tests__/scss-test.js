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
  it('should support default feature flags before the import', async () => {
    const { calls } = await render(`
      $feature-flags: ('test': true);

      @import '../scss/feature-flags';

      @if feature-flag-enabled('test') {
        $t: test(true);
      }
    `);

    expect(calls.length).toBe(1);
    expect(convert(calls[0][0])).toBe(true);
  });

  it('should support modifying flags', async () => {
    const { calls } = await render(`
      @import '../scss/feature-flags';

      $feature-flags: map-merge($feature-flags, (
        'test': true,
      ));

      @if feature-flag-enabled('test') {
        $t: test('feature-flag-enabled');
      }

      $feature-flags: map-merge($feature-flags, (
        'test': false,
      ));

      @if not feature-flag-enabled('test') {
        $t: test('feature-flag-disabled');
      }
    `);

    expect(calls.length).toBe(2);
    expect(convert(calls[0][0])).toBe('feature-flag-enabled');
    expect(convert(calls[1][0])).toBe('feature-flag-disabled');
  });
});
