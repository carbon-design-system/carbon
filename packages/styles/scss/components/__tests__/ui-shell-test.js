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

describe('scss/components/ui-shell', () => {
  test('Public API', async () => {
    const { unwrap } = await render(`
       @use 'sass:map';
       @use 'sass:meta';
       @use '../ui-shell';

       $_: get('mixin', meta.mixin-exists('ui-shell', 'ui-shell'));
     `);
    expect(unwrap('mixin')).toBe(true);
  });

  test('nav item hover styles are only applied on devices that support hover', async () => {
    const { result } = await render(`
      @use '../ui-shell/side-nav';
      @use '../ui-shell/switcher';
    `);
    const navItemMarkers = [
      '.cds--side-nav__link',
      '.cds--side-nav__submenu',
      '.cds--header__menu-item',
      '.cds--header__menu-title',
      '.cds--switcher__item-link',
    ];
    const hoverRules = [];

    postcss.parse(result.css.toString()).walkRules((rule) => {
      if (
        rule.selector.includes(':hover') &&
        navItemMarkers.some((marker) => rule.selector.includes(marker))
      ) {
        hoverRules.push(rule);
      }
    });

    expect(hoverRules.length).toBeGreaterThan(0);
    expect(
      hoverRules.some((rule) =>
        rule.selector.includes('.cds--side-nav__link:hover')
      )
    ).toBe(true);
    expect(
      hoverRules.some((rule) =>
        rule.selector.includes('.cds--side-nav__submenu:hover')
      )
    ).toBe(true);
    expect(
      hoverRules.some((rule) =>
        rule.selector.includes('.cds--switcher__item-link:hover')
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
