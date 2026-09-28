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

describe('scss/components/pagination-nav', () => {
  test('Public API', async () => {
    const { unwrap } = await render(`
       @use 'sass:meta';
       @use '../pagination-nav';

       $_: get('mixin', meta.mixin-exists('pagination-nav', 'pagination-nav'));
    `);
    expect(unwrap('mixin')).toBe(true);
  });

  test('overflow select options use theme-aware colors', async () => {
    const { result } = await render(`
       @use '../pagination-nav';
     `);
    let optionRule;

    postcss.parse(result.css.toString()).walkRules((rule) => {
      if (rule.selector === '.cds--pagination-nav__page--select:focus option') {
        optionRule = rule;
      }
    });

    expect(optionRule).toBeDefined();
    expect(optionRule.nodes.map(({ prop, value }) => [prop, value])).toEqual(
      expect.arrayContaining([
        ['background-color', 'var(--cds-layer, #ffffff)'],
        ['color', 'var(--cds-text-primary, #161616)'],
      ])
    );
  });
});
