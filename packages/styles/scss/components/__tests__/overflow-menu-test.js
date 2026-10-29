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

describe('scss/components/overflow-menu', () => {
  test('Public API', async () => {
    const { unwrap } = await render(`
       @use 'sass:map';
       @use 'sass:meta';
       @use '../overflow-menu';

       $_: get('mixin', meta.mixin-exists('overflow-menu', 'overflow-menu'));
     `);
    expect(unwrap('mixin')).toBe(true);
  });

  test('trigger hover styles are only applied on devices that support hover', async () => {
    const { result } = await render(`
      @use '../overflow-menu';
    `);
    const hoverRules = [];
    const triggerSelector =
      /\.cds--overflow-menu(?=[.:#\s>+~,\[]).*:hover|\.cds--overflow-menu__trigger(?=[.:#\s>+~,\[]).*:hover/;

    postcss.parse(result.css.toString()).walkRules((rule) => {
      if (triggerSelector.test(rule.selector)) {
        hoverRules.push(rule);
      }
    });

    expect(hoverRules.length).toBeGreaterThan(0);
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
