/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const { SassRenderer } = require('@carbon/test-utils/scss');

const { render } = SassRenderer.create(__dirname);

describe('scss/components/page-footer', () => {
  test('Public API', async () => {
    const { unwrap } = await render(`
      @use 'sass:meta';
      @use '../page-footer';

      $_: get('mixin', meta.mixin-exists('page-footer', 'page-footer'));
    `);
    expect(unwrap('mixin')).toBe(true);
  });

  test('insets inline ghost actions by 16px', async () => {
    const { result } = await render(`
      @use '../page-footer';

      @include page-footer.page-footer;
    `);
    const cssText = result.css.toString();

    expect(cssText).toContain('margin-inline-start: 1rem');
    expect(cssText).toContain('@container (width <= 34rem)');
    expect(cssText).toContain('@container (width > 34rem)');
    expect(cssText).toContain('--flex-direction: column');
  });
});
