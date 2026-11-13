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

const dropdown =
  '.cds--list-box.cds--dropdown:not(.cds--dropdown--inline, .cds--combo-box, .cds--list-box__wrapper--fluid *)';

describe('scss/components/dropdown', () => {
  test('Public API', async () => {
    const { unwrap } = await render(`
      @use 'sass:map';
      @use 'sass:meta';
      @use '../dropdown';

      $_: get('mixin', meta.mixin-exists('dropdown', 'dropdown'));
    `);
    expect(unwrap('mixin')).toBe(true);
  });

  test('trailing controls are not positioned without v12', async () => {
    const { result } = await render(`
      @use '../dropdown';
    `);

    expect(result.css.toString()).not.toContain(dropdown);
  });

  test('v12 positions the trailing controls of the dropdown', async () => {
    const { result } = await render(`
      @use '../../feature-flags' with (
        $feature-flags: (
          'enable-v12-release': true,
        )
      );
      @use '../dropdown';
    `);
    const css = result.css.toString();

    expect(declarationsForSelector(css, dropdown)).toHaveProperty(
      '--cds-list-box-content-inset'
    );
    expect(
      declarationsForSelector(css, `${dropdown} .cds--list-box__menu-icon`)
    ).toHaveProperty('inset-inline-end');
    expect(
      declarationsForSelector(css, `${dropdown} .cds--list-box__field`)
    ).toEqual({
      'padding-inline-end': 'calc(var(--cds-list-box-content-inset) + 0.5rem)',
    });
  });
});

function declarationsForSelector(css, selector) {
  const styles = {};
  postcss.parse(css).walkRules((rule) => {
    if (!rule.selectors.includes(selector)) {
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
