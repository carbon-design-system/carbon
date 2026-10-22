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

// Layout `height` token for each size, in rem
const SIZES = {
  xs: 1.5,
  sm: 2,
  md: 2.5,
  lg: 3,
};

describe('scss/components/number-input', () => {
  test('Public API', async () => {
    const { unwrap } = await render(`
       @use 'sass:map';
       @use 'sass:meta';
       @use '../number-input';

       $_: get('mixin', meta.mixin-exists('number-input', 'number-input'));
     `);
    expect(unwrap('mixin')).toBe(true);
  });

  describe('v11', () => {
    let css;

    beforeAll(async () => {
      const { result } = await render(`@use '../number-input';`);
      css = result.css.toString();
    });

    test('controls keep their fixed width and have no gap or margin', () => {
      const styles = declarationsForSelector(css, '.cds--number__controls');

      expect(styles['inline-size']).toBe(`calc(2 * ${HEIGHT_VAR})`);
      expect(styles.gap).toBeUndefined();
      expect(styles['margin-inline-end']).toBeUndefined();
    });

    test('input padding is based on the height of the controls', () => {
      const styles = declarationsForSelector(
        css,
        '.cds--number input[type=number]'
      );

      expect(styles['padding-inline']).toBe(
        `1rem calc(2 * ${HEIGHT_VAR} + 1rem)`
      );
    });

    test('AI label is positioned from the fixed controls width', () => {
      const styles = declarationsForSelector(
        css,
        '.cds--number__input-wrapper--slug .cds--ai-label'
      );

      expect(styles['inset-inline-end']).toContain(`2 * ${HEIGHT_VAR}`);
      expect(styles['margin-inline-end']).toBeUndefined();
    });
  });

  describe('v12', () => {
    let css;

    beforeAll(async () => {
      const { result } = await render(`${V12} @use '../number-input';`);
      css = result.css.toString();
    });

    describe('controls', () => {
      test('size to their content', () => {
        const styles = declarationsForSelector(css, '.cds--number__controls');

        expect(styles['inline-size']).toBe('fit-content');
      });

      test.each([
        ['xs', 0],
        ['sm', 4],
        ['md', 4],
        ['lg', 4],
      ])('gap between the buttons for %s is %ipx', (size, expected) => {
        const styles = declarationsForSelector(css, '.cds--number__controls');

        expect(toPx(styles.gap, SIZES[size])).toBe(expected);
      });

      test.each([
        ['xs', 0],
        ['sm', 4],
        ['md', 8],
        ['lg', 8],
      ])('margin-inline-end for %s is %ipx', (size, expected) => {
        const styles = declarationsForSelector(css, '.cds--number__controls');

        expect(toPx(styles['margin-inline-end'], SIZES[size])).toBe(expected);
      });
    });

    describe('AI label and decorator', () => {
      const selector = '.cds--number__input-wrapper--slug .cds--ai-label';

      test.each([
        ['xs', 48],
        ['sm', 56],
        ['md', 60],
        ['lg', 76],
      ])(
        'is positioned next to the controls for %s (%ipx)',
        (size, expected) => {
          const styles = declarationsForSelector(css, selector);

          expect(toPx(styles['inset-inline-end'], SIZES[size])).toBe(expected);
        }
      );

      test.each([
        ['xs', 4],
        ['sm', 8],
        ['md', 8],
        ['lg', 12],
      ])('margin-inline-end for %s is %ipx', (size, expected) => {
        const styles = declarationsForSelector(css, selector);

        expect(toPx(styles['margin-inline-end'], SIZES[size])).toBe(expected);
      });

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
        ['xs', 52],
        ['sm', 64],
        ['md', 68],
        ['lg', 88],
      ])(
        'sits next to the controls without a decorator for %s (%ipx)',
        (size, expected) => {
          const styles = declarationsForSelector(css, '.cds--number__invalid');

          expect(toPx(styles['inset-inline-end'], SIZES[size])).toBe(expected);
        }
      );

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
    });

    describe('input padding', () => {
      test('start padding is $spacing-05', () => {
        const styles = declarationsForSelector(
          css,
          '.cds--number input[type=number]'
        );

        expect(styles['padding-inline'].startsWith('1rem ')).toBe(true);
      });

      test.each([
        ['xs', 56],
        ['sm', 64],
        ['md', 68],
        ['lg', 84],
      ])(
        'end padding is 8px clear of the controls for %s (%ipx)',
        (size, expected) => {
          const styles = declarationsForSelector(
            css,
            '.cds--number input[type=number]'
          );
          const end = styles['padding-inline'].replace(/^1rem /, '');

          expect(toPx(end, SIZES[size])).toBe(expected);
        }
      );

      test.each([
        ['xs', 76],
        ['sm', 88],
        ['md', 92],
        ['lg', 112],
      ])(
        'end padding is 8px clear of the icon for %s (%ipx)',
        (size, expected) => {
          const styles = declarationsForSelector(
            css,
            '.cds--number .cds--number__input-wrapper--warning input[type=number]'
          );

          expect(toPx(styles['padding-inline-end'], SIZES[size])).toBe(
            expected
          );
        }
      );

      test.each([
        ['xs', 76],
        ['sm', 88],
        ['md', 92],
        ['lg', 112],
      ])(
        'end padding is 8px clear of the decorator for %s (%ipx)',
        (size, expected) => {
          const styles = declarationsForSelector(
            css,
            '.cds--number .cds--number__input-wrapper--decorator input[type=number]'
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

  const expression = value
    .split(HEIGHT_VAR)
    .join(String(heightRem))
    .replace(/(\d*\.?\d+)rem/g, '$1')
    .replace(/\bcalc\(/g, '(')
    .replace(/\bclamp\(/g, 'clamp(');

  // eslint-disable-next-line no-new-func
  const rem = new Function('clamp', `'use strict'; return (${expression});`)(
    (min, preferred, max) => Math.min(Math.max(preferred, min), max)
  );

  return Math.round(rem * 16);
}
