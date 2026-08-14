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

describe('scss/components/tabs', () => {
  test('Public API', async () => {
    const { unwrap } = await render(`
        @use 'sass:map';
        @use 'sass:meta';
        @use '../tabs';

        $_: get('mixin', meta.mixin-exists('tabs', 'tabs'));
      `);
    expect(unwrap('mixin')).toBe(true);
  });

  test('honours $prefix in vertical tabs nav-item-label line-height', async () => {
    const { result } = await render(`
        @use '../../config' with ($prefix: 'test');
        @use '../tabs';

        @include tabs.tabs;
      `);
    const cssText = result.css.toString();
    expect(cssText).toContain('var(--test-body-compact-01-line-height)');
    expect(cssText).not.toContain('var(--cds-body-compact-01-line-height)');
  });
});
