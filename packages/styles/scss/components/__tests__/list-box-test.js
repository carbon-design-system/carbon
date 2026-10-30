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
       $_: get('trailing', meta.mixin-exists('trailing-controls', 'list-box'));
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
    expect(unwrap('trailing')).toBe(true);
  });

  test('trailing-controls derives its spacing from the layout size', async () => {
    const { result } = await render(`
      @use '../list-box';

      @include list-box.trailing-controls('.test');
    `);
    const css = result.css.toString();

    expect(declarationsForSelector(css, '.test')).toEqual({
      'block-size': 'var(--cds-layout-size-height-local)',
      '--cds-list-box-clear-inset':
        'calc(calc(clamp(0.25rem, var(--cds-layout-size-height-local) - 1.5rem, 1rem) + 1rem) + clamp(0.25rem, var(--cds-layout-size-height-local) - 1.25rem, 0.75rem))',
      '--cds-list-box-decorator-inset':
        'calc(calc(clamp(0.25rem, var(--cds-layout-size-height-local) - 1.5rem, 1rem) + 1rem) + calc(var(--cds-layout-size-icon-gap-local) + max(0.25rem, var(--cds-layout-size-height-local) - 2.5rem)))',
      '--cds-list-box-status-inset': 'var(--cds-list-box-decorator-inset)',
      '--cds-list-box-content-inset':
        'calc(clamp(0.25rem, var(--cds-layout-size-height-local) - 1.5rem, 1rem) + 1rem)',
    });
    expect(
      declarationsForSelector(css, '.test:has(.cds--list-box__selection)')
    ).toEqual({
      '--cds-list-box-decorator-inset':
        'calc(calc(var(--cds-list-box-clear-inset) + max(1.5rem, var(--cds-layout-size-height-local) - 1rem)) + var(--cds-layout-size-icon-gap-local))',
      '--cds-list-box-content-inset':
        'calc(var(--cds-list-box-clear-inset) + max(1.5rem, var(--cds-layout-size-height-local) - 1rem))',
    });
    expect(
      declarationsForSelector(css, '.test .cds--list-box__selection')
    ).toEqual({
      'border-radius': '999999px',
      'block-size': 'max(1.5rem, var(--cds-layout-size-height-local) - 1rem)',
      'inline-size': 'max(1.5rem, var(--cds-layout-size-height-local) - 1rem)',
      'inset-inline-end': 'var(--cds-list-box-clear-inset)',
    });
    expect(
      declarationsForSelector(
        css,
        '.test .cds--list-box__selection:not(:disabled):hover'
      )
    ).toEqual({
      'background-color':
        'var(--cds-background-hover, rgba(141, 141, 141, 0.12))',
    });
    expect(
      declarationsForSelector(
        css,
        '.test .cds--list-box__selection:not(:disabled):active'
      )
    ).toEqual({
      'background-color':
        'var(--cds-background-active, rgba(141, 141, 141, 0.5))',
    });
    expect(
      declarationsForSelector(
        css,
        '.test .cds--list-box__field .cds--text-input'
      )
    ).toEqual({
      border: '0',
      'border-radius': '0px',
      'padding-inline-end': '0',
    });
    expect(
      declarationsForSelector(css, '.test .cds--list-box__menu-icon')
    ).toEqual({
      'inset-inline-end':
        'calc(clamp(0.25rem, var(--cds-layout-size-height-local) - 1.5rem, 1rem) - 0.25rem)',
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
