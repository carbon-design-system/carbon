/**
 * Copyright IBM Corp. 2026
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

describe('scss/components/aspect-ratio', () => {
  test('Public API', async () => {
    const { unwrap } = await render(`
      @use 'sass:meta';
      @use '../aspect-ratio';

      $_: get('mixin', meta.mixin-exists('aspect-ratio', 'aspect-ratio'));
    `);
    expect(unwrap('mixin')).toBe(true);
  });

  test('supports responsive aspect ratio modifiers', async () => {
    const { result } = await render(`
      @use '../aspect-ratio';
    `);
    const selectors = [];

    postcss.parse(result.css.toString()).walkRules((rule) => {
      if (
        rule.selector === '.cds--aspect-ratio--md--4x3::before' ||
        rule.selector === '.cds--aspect-ratio--lg--16x9::before' ||
        rule.selector === '.cds--aspect-ratio--xlg--3x2::before' ||
        rule.selector === '.cds--aspect-ratio--max--2x3::before'
      ) {
        rule.walkDecls('padding-block-start', (decl) => {
          selectors.push(`${rule.selector}: ${decl.value}`);
        });
      }
    });

    expect(selectors).toEqual(
      expect.arrayContaining([
        '.cds--aspect-ratio--lg--16x9::before: 56.25%',
        '.cds--aspect-ratio--md--4x3::before: 75%',
        '.cds--aspect-ratio--xlg--3x2::before: 66.6666666667%',
        '.cds--aspect-ratio--max--2x3::before: 150%',
      ])
    );
    expect(selectors).toHaveLength(4);
  });

  test('emits base ratios before responsive ratios in breakpoint order', async () => {
    const { result } = await render(`
      @use '../aspect-ratio';
    `);
    const selectors = [];

    postcss.parse(result.css.toString()).walkRules((rule) => {
      if (rule.selector.startsWith('.cds--aspect-ratio--')) {
        selectors.push(rule.selector);
      }
    });

    expect(selectors.indexOf('.cds--aspect-ratio--1x1::before')).toBeLessThan(
      selectors.indexOf('.cds--aspect-ratio--md--16x9::before')
    );
    expect(
      selectors.indexOf('.cds--aspect-ratio--md--1x1::before')
    ).toBeLessThan(selectors.indexOf('.cds--aspect-ratio--lg--16x9::before'));
    expect(
      selectors.indexOf('.cds--aspect-ratio--lg--1x1::before')
    ).toBeLessThan(selectors.indexOf('.cds--aspect-ratio--xlg--16x9::before'));
    expect(
      selectors.indexOf('.cds--aspect-ratio--xlg--1x1::before')
    ).toBeLessThan(selectors.indexOf('.cds--aspect-ratio--max--16x9::before'));
  });
});
