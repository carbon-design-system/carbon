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

describe('scss/components/list', () => {
  test('Public API', async () => {
    const { unwrap } = await render(`
      @use 'sass:meta';
      @use '../list';

      $_: get('mixin', meta.mixin-exists('list', 'list'));
    `);
    expect(unwrap('mixin')).toBe(true);
  });

  test('ordered list markers are indented within the list container', async () => {
    const { result } = await render(`
      @use '../list';
    `);
    const cssText = result.css.toString();

    expect(
      declarationsForSelector(
        cssText,
        '.cds--list--ordered:not(.cds--list--nested)'
      )['margin-inline-start']
    ).toBe('1.5rem');
    expect(
      declarationsForSelector(
        cssText,
        '.cds--list--ordered--native:not(.cds--list--nested)'
      )['margin-inline-start']
    ).toBe('1.5rem');
  });
});

function declarationsForSelector(cssText, selector) {
  const styles = {};

  postcss.parse(cssText).walkRules((rule) => {
    if (rule.selectors.includes(selector)) {
      rule.nodes
        .filter((node) => node.type === 'decl')
        .forEach((node) => {
          styles[node.prop] = node.value;
        });
    }
  });

  return styles;
}
