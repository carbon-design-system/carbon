/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const { SassRenderer } = require('@carbon/test-utils/scss');

const { render } = SassRenderer.create(__dirname);

describe('scss/components/fluid-text-input', () => {
  test('Public API', async () => {
    const { unwrap } = await render(`
      @use 'sass:map';
      @use 'sass:meta';
      @use '../fluid-text-input';

      $_: get('mixin', meta.mixin-exists('fluid-text-input', 'fluid-text-input'));
    `);
    expect(unwrap('mixin')).toBe(true);
  });

  test('invalid inputs have a distinct focus indicator', async () => {
    const { result } = await render(`
      @use '../fluid-text-input';

      @include fluid-text-input.fluid-text-input;
    `);
    const cssText = result.css.toString();

    expect(cssText).toMatch(
      /\.cds--text-input--fluid \.cds--text-input__field-wrapper\[data-invalid\]:focus-within\s*{[^}]*outline: 4px solid[^}]*outline-offset: -4px;/
    );
  });
});
