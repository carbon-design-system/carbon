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

const multiselect =
  '.cds--list-box.cds--multi-select:not(.cds--multi-select--inline, .cds--list-box__wrapper--fluid *)';

describe('scss/components/multiselect', () => {
  test('Public API', async () => {
    const { unwrap } = await render(`
      @use 'sass:map';
      @use 'sass:meta';
      @use '../multiselect';

      $_: get('mixin', meta.mixin-exists('multiselect', 'multiselect'));
      $_: get('selection-tag', meta.mixin-exists('selection-tag', 'multiselect'));
    `);
    expect(unwrap('mixin')).toBe(true);
    expect(unwrap('selection-tag')).toBe(true);
  });

  test('trailing controls are not positioned without v12', async () => {
    const { result } = await render(`
      @use '../multiselect';
    `);

    expect(result.css.toString()).not.toContain(multiselect);
  });

  test('v12 positions the trailing controls of the multiselect', async () => {
    const { result } = await render(`
      @use '../../feature-flags' with (
        $feature-flags: (
          'enable-v12-release': true,
        )
      );
      @use '../multiselect';
    `);
    const css = result.css.toString();

    expect(declarationsForSelector(css, multiselect)).toHaveProperty(
      '--cds-list-box-content-inset'
    );
    expect(
      declarationsForSelector(css, `${multiselect} .cds--list-box__selection`)
    ).toHaveProperty('inset-inline-end', 'var(--cds-list-box-clear-inset)');
    expect(
      declarationsForSelector(
        css,
        `${multiselect} .cds--list-box__field .cds--text-input`
      )
    ).toEqual({
      border: '0',
      'border-radius': '0px',
      'padding-inline-end': '0',
    });
    expect(
      declarationsForSelector(css, `${multiselect} .cds--tag`)
    ).toMatchObject({
      '--cds-layout-size-height-sm': '1.5rem',
      '--cds-layout-size-height-local':
        'clamp(max(var(--cds-layout-size-height-min), var(--cds-layout-size-height-xs)), var(--cds-layout-size-height, var(--cds-layout-size-height-md)), min(var(--cds-layout-size-height-max), var(--cds-layout-size-height-md)))',
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
