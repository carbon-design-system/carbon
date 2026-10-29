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

  test('header hover styles are only applied on devices that support hover', async () => {
    const { result } = await render(`
      @use '../ui-shell/header';
    `);
    const hoverRules = [];

    postcss.parse(result.css.toString()).walkRules((rule) => {
      if (
        rule.selector.includes('.cds--header') &&
        rule.selector.includes(':hover')
      ) {
        hoverRules.push(rule);
      }
    });

    expect(hoverRules.length).toBeGreaterThan(0);
    expect(
      hoverRules.some((rule) =>
        rule.selector.includes('.cds--header__action:hover')
      )
    ).toBe(true);
    expect(
      hoverRules.some((rule) =>
        rule.selector.includes('.cds--header__menu-item:hover')
      )
    ).toBe(true);
    expect(
      hoverRules.some(
        (rule) =>
          rule.selector.includes('.cds--header__menu-item--current') &&
          rule.selector.includes(':hover')
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

  test('header links only show a focus border in Windows HCM when focused', async () => {
    const { result } = await render(`
      @use '../ui-shell/header';
    `);
    const borderColors = {};

    postcss.parse(result.css.toString()).walkRules((rule) => {
      let parent = rule.parent;

      while (parent) {
        if (
          parent.type === 'atrule' &&
          parent.name === 'media' &&
          parent.params.includes('(forced-colors: active)')
        ) {
          rule.walkDecls('border-color', (decl) => {
            rule.selectors.forEach((selector) => {
              borderColors[selector] = decl.value;
            });
          });
          break;
        }

        parent = parent.parent;
      }
    });

    expect(borderColors['a.cds--header__name']).toBe('Canvas');
    expect(borderColors['a.cds--header__menu-item']).toBe('Canvas');
    expect(borderColors['a.cds--header__name:focus']).toBe('Highlight');
    expect(borderColors['a.cds--header__menu-item:focus']).toBe('Highlight');
    expect(
      borderColors['a.cds--header__menu-item[aria-current=page]:focus']
    ).toBe('Highlight');
  });
});
