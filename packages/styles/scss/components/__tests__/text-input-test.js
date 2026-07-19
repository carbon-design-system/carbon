/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const { SassRenderer } = require('@carbon/test-utils/scss');

const { render } = SassRenderer.create(__dirname);

describe('scss/components/text-input', () => {
  test('Public API', async () => {
    const { unwrap } = await render(`
       @use 'sass:meta';
       @use '../text-input';

       $_: get('mixin', meta.mixin-exists('text-input', 'text-input'));
     `);
    expect(unwrap('mixin')).toBe(true);
  });

  test('invalid inputs have a distinct focus indicator', async () => {
    const { result } = await render(`
      @use '../text-input';

      @include text-input.text-input;
    `);
    const cssText = result.css.toString();

    expect(cssText).toMatch(
      /\.cds--text-input--invalid:focus\s*{[^}]*outline: 4px solid[^}]*outline-offset: -4px;/
    );
  });
});
