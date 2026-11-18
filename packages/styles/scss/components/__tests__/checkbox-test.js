/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const postcss = require('postcss');
const { SassRenderer } = require('@carbon/test-utils/scss');

const { render } = SassRenderer.create(__dirname);

describe('scss/components/checkbox', () => {
  test('Public API', async () => {
    const { unwrap } = await render(`
      @use 'sass:map';
      @use 'sass:meta';
      @use '../checkbox';

      $_: get('mixin', meta.mixin-exists('checkbox', 'checkbox'));
    `);
    expect(unwrap('mixin')).toBe(true);
  });

  test('readonly border uses a 3:1 border token, not icon-disabled', async () => {
    const { result } = await render(`
      @use '../checkbox';
    `);
    const borders = [];

    postcss.parse(result.css.toString()).walkRules((rule) => {
      if (
        rule.selector.includes('.cds--checkbox-wrapper--readonly') &&
        rule.selector.includes('.cds--checkbox-label::before')
      ) {
        rule.walkDecls(/^border/, (decl) => {
          borders.push(decl.value);
        });
      }
    });

    expect(borders.length).toBe(2);
    borders.forEach((value) => {
      expect(value).toContain('--cds-border-strong');
      expect(value).not.toContain('--cds-icon-disabled');
    });
  });
});
