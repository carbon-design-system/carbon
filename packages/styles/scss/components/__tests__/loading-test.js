/**
 * Copyright IBM Corp. 2018, 2026
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

describe('scss/components/loading', () => {
  test('Public API', async () => {
    const { unwrap } = await render(`
      @use 'sass:meta';
      @use '../loading';

      $_: get('mixin', meta.mixin-exists('loading', 'loading'));
    `);
    expect(unwrap('mixin')).toBe(true);
  });

  test('overlay dialog does not show a focus ring when focused programmatically', async () => {
    const { result } = await render(`
      @use '../loading';
    `);
    const declarations = [];

    postcss.parse(result.css.toString()).walkRules((rule) => {
      if (rule.selector === '.cds--loading-overlay > [tabindex="-1"]:focus') {
        rule.walkDecls((decl) => {
          declarations.push(`${decl.prop}: ${decl.value}`);
        });
      }
    });

    expect(declarations).toEqual([
      'outline: 2px solid transparent',
      'outline-offset: -2px',
    ]);
  });
});
