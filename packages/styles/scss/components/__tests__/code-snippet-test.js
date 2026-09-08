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

describe('scss/components/code-snippet', () => {
  test('Public API', async () => {
    const { unwrap } = await render(`
      @use 'sass:map';
      @use 'sass:meta';
      @use '../code-snippet';

      $_: get('mixin', meta.mixin-exists('code-snippet', 'code-snippet'));
      $_: get('variables', map.keys(meta.module-variables('code-snippet')));
    `);
    expect(unwrap('mixin')).toBe(true);
    expect(unwrap('variables')).toMatchInlineSnapshot(`
      [
        "copy-active",
        "copy-btn-feedback",
      ]
    `);
  });

  test('configuration', async () => {
    const { unwrap } = await render(`
      @use '../code-snippet' with (
        $copy-active: #000,
      );
      $_: get('background-color', code-snippet.$copy-active);
    `);
    expect(unwrap('background-color')).toBe('#000');
  });

  test('hover styles are only applied on devices that support hover', async () => {
    const { result } = await render(`
      @use '../code-snippet';
    `);
    const hoverRules = [];

    postcss.parse(result.css.toString()).walkRules((rule) => {
      if (
        rule.selector.includes(':hover') &&
        (rule.selector.includes('.cds--snippet') ||
          rule.selector.includes('.cds--copy-btn:hover')) &&
        !rule.selector.includes('.cds--skeleton')
      ) {
        hoverRules.push(rule);
      }
    });

    expect(hoverRules.length).toBeGreaterThan(0);
    expect(
      hoverRules.some((rule) =>
        rule.selector.includes('.cds--snippet-btn--expand:hover')
      )
    ).toBe(true);
    expect(
      hoverRules.every((rule) => {
        let parent = rule.parent;

        while (parent) {
          if (
            parent.type === 'atrule' &&
            parent.name === 'media' &&
            parent.params.includes('(any-hover: hover)')
          ) {
            return true;
          }

          parent = parent.parent;
        }

        return false;
      })
    ).toBe(true);
  });
});
