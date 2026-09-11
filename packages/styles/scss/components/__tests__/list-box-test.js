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

describe('scss/components/list-box', () => {
  test('Public API', async () => {
    const { unwrap } = await render(`
       @use 'sass:map';
       @use 'sass:meta';
       @use '../list-box';

       $_: get('mixin', meta.mixin-exists('list-box', 'list-box'));
       $_: get('variables', map.keys(meta.module-variables('list-box')));
     `);
    expect(unwrap('mixin')).toBe(true);
    expect(unwrap('variables')).toMatchInlineSnapshot(`
      [
        "list-box-width",
        "list-box-height",
        "list-box-inline-height",
        "list-box-menu-width",
      ]
    `);
  });

  test('v12 autoalign list-box menus do not use CSS margin for the field gap', async () => {
    const { result } = await render(`
      @use '../../feature-flags' with (
        $feature-flags: (
          'enable-v12-release': true,
        )
      );
      @use '../list-box';
    `);

    const css = result.css.toString();
    const autoalignMenu = declarationsForSelector(
      css,
      (selector) =>
        selector.includes('.cds--autoalign') &&
        selector.includes('.cds--list-box__menu') &&
        !selector.includes(':not')
    );
    const upwardMenu = declarationsForSelector(
      css,
      (selector) =>
        selector.includes('.cds--list-box--up') &&
        selector.includes(':not(.cds--autoalign)') &&
        selector.includes('.cds--list-box__menu')
    );

    expect(
      autoalignMenu['margin-block'] || autoalignMenu['margin-block-start']
    ).toBe('0');
    expect(
      autoalignMenu['margin-block'] || autoalignMenu['margin-block-end']
    ).toBe('0');
    expect(upwardMenu['margin-block-end']).toBe('0.25rem');
    expect(upwardMenu['margin-block-start']).toBe('0');
  });
});

function declarationsForSelector(css, matchSelector) {
  const styles = {};
  postcss.parse(css).walkRules((rule) => {
    const matches = rule.selectors.some((selector) =>
      typeof matchSelector === 'function'
        ? matchSelector(selector)
        : selector === matchSelector
    );
    if (!matches) {
      return;
    }
    for (const node of rule.nodes) {
      if (node.type === 'decl') {
        styles[node.prop] = node.value;
      }
    }
  });
  return styles;
}
