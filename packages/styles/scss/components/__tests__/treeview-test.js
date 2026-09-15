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

describe('scss/components/treeview', () => {
  test('Public API', async () => {
    const { unwrap } = await render(`
       @use 'sass:meta';
       @use '../treeview';
       $_: get('mixin', meta.mixin-exists('treeview', 'treeview'));
     `);
    expect(unwrap('mixin')).toBe(true);
  });

  test('hover styles are only applied on devices that support hover', async () => {
    const { result } = await render(`
      @use '../treeview';
    `);
    const hoverRules = [];

    postcss.parse(result.css.toString()).walkRules((rule) => {
      if (
        rule.selector.includes('.cds--tree') &&
        rule.selector.includes(':hover')
      ) {
        hoverRules.push(rule);
      }
    });

    expect(hoverRules.length).toBeGreaterThan(0);
    expect(
      hoverRules.some((rule) =>
        rule.selector.includes('.cds--tree-node__label:hover')
      )
    ).toBe(true);
    expect(
      hoverRules.some(
        (rule) =>
          rule.selector.includes('.cds--tree-node--disabled') &&
          rule.selector.includes('.cds--tree-node__label:hover')
      )
    ).toBe(true);
    expect(
      hoverRules.some(
        (rule) =>
          rule.selector.includes('.cds--tree-node--selected') &&
          rule.selector.includes('.cds--tree-node__label:hover')
      )
    ).toBe(true);
    expect(
      hoverRules
        .filter((rule) => {
          let parent = rule.parent;

          while (parent) {
            if (
              parent.type === 'atrule' &&
              parent.name === 'media' &&
              parent.params.includes('(any-hover: hover)')
            ) {
              return false;
            }

            parent = parent.parent;
          }

          return true;
        })
        .map((rule) => rule.selector)
    ).toEqual([]);
  });
});
