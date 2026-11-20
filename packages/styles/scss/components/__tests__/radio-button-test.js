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

describe('scss/components/radio-button', () => {
  test('Public API', async () => {
    const { unwrap } = await render(`
      @use 'sass:meta';
      @use '../radio-button/radio-button';
      $_: get('mixin', meta.mixin-exists('radio-button', 'radio-button'));
    `);
    expect(unwrap('mixin')).toBe(true);
  });

  test('readonly border uses a 3:1 border token, not icon-disabled', async () => {
    const { result } = await render(`
      @use '../radio-button';
    `);
    const borders = [];

    postcss.parse(result.css.toString()).walkRules((rule) => {
      if (
        rule.selector.includes('.cds--radio-button-group--readonly') &&
        rule.selector.includes('.cds--radio-button__appearance')
      ) {
        rule.walkDecls('border-color', (decl) => {
          borders.push(decl.value);
        });
      }
    });

    expect(borders.length).toBe(1);
    expect(borders[0]).toContain('--cds-border-strong');
    expect(borders[0]).not.toContain('--cds-icon-disabled');
  });
});
