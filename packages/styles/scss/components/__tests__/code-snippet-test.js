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

// Splits a `mask-image` value into its comma separated layers, ignoring the
// commas that belong to `linear-gradient()` / `calc()` arguments.
function splitLayers(value) {
  const layers = [];
  let depth = 0;
  let current = '';

  for (const char of value) {
    if (char === '(') {
      depth += 1;
    } else if (char === ')') {
      depth -= 1;
    }

    if (char === ',' && depth === 0) {
      layers.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  layers.push(current.trim());

  return layers;
}

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

  // A mask applies to an element's scrollbar as well as to its content, so
  // without an opaque layer over the scrollbar gutter the overflow fade
  // washes the scrollbar out to roughly 1.7:1, below the 3:1 required by
  // WCAG 2.1 1.4.11.
  // See https://github.com/carbon-design-system/carbon/issues/23750
  describe('multiline overflow fade', () => {
    let rules;

    beforeAll(async () => {
      const { result } = await render(`
        @use '../code-snippet';
      `);

      rules = new Map();

      postcss.parse(result.css.toString()).walkRules((rule) => {
        const declarations = rules.get(rule.selector) ?? {};

        rule.walkDecls((decl) => {
          declarations[decl.prop] = decl.value;
        });

        rules.set(rule.selector, declarations);
      });
    });

    test.each([
      ['ltr', '.cds--snippet--multi .cds--snippet-container', 'to left'],
      [
        'rtl',
        '[dir=rtl] .cds--snippet--multi .cds--snippet-container',
        'to right',
      ],
    ])('keeps the scrollbar gutter opaque in %s', (_, selector, direction) => {
      const rule = rules.get(selector);

      expect(rule).toBeDefined();

      expect(splitLayers(rule['mask-image'])[0]).toBe(
        `linear-gradient(${direction}, #000000 1rem, transparent 1rem)`
      );
    });

    test('composites the gutter layer over the fades', () => {
      const rule = rules.get('.cds--snippet--multi .cds--snippet-container');

      expect(rule['mask-composite']).toBe('add, intersect, intersect');
    });

    // `mask-composite` is only declared on the ltr rule, so the rtl rule has
    // to keep the same number of layers or its operators shift by one and the
    // fades stop intersecting.
    test('uses the same layer count in ltr and rtl', () => {
      const ltr = rules.get('.cds--snippet--multi .cds--snippet-container');
      const rtl = rules.get(
        '[dir=rtl] .cds--snippet--multi .cds--snippet-container'
      );

      const operators = ltr['mask-composite'].split(',').length;

      expect(splitLayers(ltr['mask-image'])).toHaveLength(operators);
      expect(splitLayers(rtl['mask-image'])).toHaveLength(operators);
    });
  });
});
