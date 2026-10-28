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

const V12 = `
  @use '../../feature-flags' with (
    $feature-flags: (
      'enable-v12-release': true,
    )
  );
`;

const HEIGHT_VAR = 'var(--cds-layout-size-height-local)';
const ICON_GAP_VAR = 'var(--cds-layout-size-icon-gap-local)';

// Layout `height` and `icon-gap` tokens for each size, in rem
const SIZES = {
  xs: 1.5,
  sm: 2,
  md: 2.5,
  lg: 3,
};

// Layout `icon-gap` token for each size, in rem (matches $layout-tokens in _layout.scss)
const ICON_GAP_SIZES = {
  xs: 0.25, // $spacing-02
  sm: 0.5, // $spacing-03
  md: 0.5, // $spacing-03
  lg: 0.75, // $spacing-04
};

describe('scss/components/number-input', () => {
  describe('v12', () => {
    let css;

    beforeAll(async () => {
      const { result } = await render(`${V12} @use '../number-input';`);
      css = result.css.toString();
    });

    describe('AI label and decorator', () => {
      test('applies to the decorator, ai-label and slug selectors', () => {
        const selectors = [
          '.cds--number__input-wrapper--decorator .cds--number__input-inner-wrapper--decorator > *',
          '.cds--number__input-wrapper--slug .cds--ai-label',
          '.cds--number__input-wrapper--slug .cds--slug',
        ];

        selectors.forEach((value) => {
          const styles = declarationsForSelector(css, value);

          expect(styles['margin-inline-end']).toBeDefined();
        });
      });
    });

    describe('invalid and warning icon', () => {
      test.each([
        ['xs', 72],
        ['sm', 88],
        ['md', 92],
        ['lg', 116],
      ])(
        'sits next to the decorator when one is present for %s (%ipx)',
        (size, expected) => {
          const styles = declarationsForSelector(
            css,
            '.cds--number__input-wrapper--decorator .cds--number__invalid'
          );

          expect(toPx(styles['inset-inline-end'], SIZES[size])).toBe(expected);
        }
      );

      test.each([
        ['xs', 72],
        ['sm', 88],
        ['md', 92],
        ['lg', 116],
      ])(
        'sits next to the AI label when one is present for %s (%ipx)',
        (size, expected) => {
          const styles = declarationsForSelector(
            css,
            '.cds--number__input-wrapper--slug .cds--number__invalid'
          );

          expect(toPx(styles['inset-inline-end'], SIZES[size])).toBe(expected);
        }
      );
    });

    describe('input padding', () => {
      test.each([
        ['xs', 96],
        ['sm', 112],
        ['md', 116],
        ['lg', 140],
      ])(
        'end padding is 8px clear of the icon when a decorator is also present for %s (%ipx)',
        (size, expected) => {
          const styles = declarationsForSelector(
            css,
            '.cds--number .cds--number__input-wrapper--decorator input[data-invalid]'
          );

          expect(toPx(styles['padding-inline-end'], SIZES[size])).toBe(
            expected
          );
        }
      );

      test.each([
        ['xs', 96],
        ['sm', 112],
        ['md', 116],
        ['lg', 140],
      ])(
        'end padding is 8px clear of the icon when an AI label is also present for %s (%ipx)',
        (size, expected) => {
          const styles = declarationsForSelector(
            css,
            '.cds--number .cds--number__input-wrapper--slug input[data-invalid]'
          );

          expect(toPx(styles['padding-inline-end'], SIZES[size])).toBe(
            expected
          );
        }
      );

      test.each([
        ['xs', 96],
        ['sm', 112],
        ['md', 116],
        ['lg', 140],
      ])(
        'end padding is 8px clear of the warning icon when a decorator is also present for %s (%ipx)',
        (size, expected) => {
          const styles = declarationsForSelector(
            css,
            '.cds--number .cds--number__input-wrapper--decorator.cds--number__input-wrapper--warning input'
          );

          expect(toPx(styles['padding-inline-end'], SIZES[size])).toBe(
            expected
          );
        }
      );

      test.each([
        ['xs', 96],
        ['sm', 112],
        ['md', 116],
        ['lg', 140],
      ])(
        'end padding is 8px clear of the warning icon when an AI label is also present for %s (%ipx)',
        (size, expected) => {
          const styles = declarationsForSelector(
            css,
            '.cds--number .cds--number__input-wrapper--slug.cds--number__input-wrapper--warning input'
          );

          expect(toPx(styles['padding-inline-end'], SIZES[size])).toBe(
            expected
          );
        }
      );
    });
  });
});

/**
 * Collect the declarations of every rule that includes `selector`. When a
 * property is declared more than once the last declaration wins, matching the
 * cascade.
 */
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

/**
 * Resolve a length expression (`calc()`, `clamp()` and `rem` values) to pixels
 * for the given layout height, in rem.
 */
function toPx(value, heightRem) {
  if (value === undefined) {
    throw new Error('Cannot resolve an undefined value');
  }

  const size = Object.keys(SIZES).find((s) => SIZES[s] === heightRem);
  const iconGapRem = size !== undefined ? ICON_GAP_SIZES[size] : 0;

  const expression = value
    .split(HEIGHT_VAR)
    .join(String(heightRem))
    .split(ICON_GAP_VAR)
    .join(String(iconGapRem))
    .replace(/(\d*\.?\d+)rem/g, '$1')
    .replace(/\bcalc\(/g, '(');

  // eslint-disable-next-line no-new-func
  const rem = new Function('clamp', `'use strict'; return (${expression});`)(
    (min, preferred, max) => Math.min(Math.max(preferred, min), max)
  );

  return Math.round(rem * 16);
}
