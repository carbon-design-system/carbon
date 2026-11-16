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

const comboBox =
  '.cds--list-box.cds--combo-box:not(.cds--dropdown, .cds--multi-select, .cds--list-box__wrapper--fluid *)';

describe('scss/components/combo-box', () => {
  test('Public API', async () => {
    const { unwrap } = await render(`
      @use 'sass:map';
      @use 'sass:meta';
      @use '../combo-box';

      $_: get('mixin', meta.mixin-exists('combo-box', 'combo-box'));
    `);
    expect(unwrap('mixin')).toBe(true);
  });

  test('trailing controls are not positioned without v12', async () => {
    const { result } = await render(`
      @use '../combo-box';
    `);

    expect(result.css.toString()).not.toContain(comboBox);
  });

  test('v12 positions the trailing controls of the combo box', async () => {
    const { result } = await render(`
      @use '../../feature-flags' with (
        $feature-flags: (
          'enable-v12-release': true,
        )
      );
      @use '../combo-box';
    `);
    const css = result.css.toString();

    expect(declarationsForSelector(css, comboBox)).toHaveProperty(
      'block-size',
      'var(--cds-layout-size-height-local)'
    );
    expect(
      declarationsForSelector(css, `${comboBox} .cds--list-box__selection`)
    ).toHaveProperty('inset-inline-end', 'var(--cds-list-box-clear-inset)');
    expect(
      declarationsForSelector(css, `${comboBox} .cds--list-box__field`)
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
