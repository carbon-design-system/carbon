/**
 * Copyright IBM Corp. 2015, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

const { types } = require('node-sass');
const { convert, createSassRenderer } = require('@carbon/test-utils/scss');

const sassRender = createSassRenderer(__dirname);
const render = content =>
  sassRender(`
$css--font-face: false;
$css--helpers: false;
$css--body: false;
$css--use-layer: false;
$css--reset: false;
$css--plex: false;
${content}
`);
const renderClassic = content =>
  render(`
$feature-flags: (grid: false);
${content}
`);

const isClassic = async () => {
  const { calls } = await render(`
@import '../../scss/functions';
$t: test(feature-flag-enabled('grid'));
`);
  return !convert(calls[0][0]);
};

describe('_grid.scss', () => {
  it('should export grid variables', async () => {
    const { calls } = await renderClassic(`
@import '../grid';

$variables: (
  'max-width': $max-width,
  'columns': $max-width,
  'grid-breakpoints': $grid-breakpoints,
  'gutter-breakpoints': $gutter-breakpoints,
  'grid-gutter-breakpoints': $grid-gutter-breakpoints,
);

@each $key, $value in $variables {
  $t: test($key, $value);
}
`);

    const variables = calls.reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key.getValue()]: convert(value),
      }),
      {}
    );

    expect(variables).toMatchInlineSnapshot(`
Object {
  "columns": "1600px",
  "grid-breakpoints": Object {
    "lg": "992px",
    "md": "768px",
    "sm": "576px",
    "xl": "1200px",
    "xxl": "1600px",
  },
  "grid-gutter-breakpoints": Object {
    "sm": "5%",
    "xs": "3%",
  },
  "gutter-breakpoints": Object {
    "sm": "10px",
    "xs": "5px",
  },
  "max-width": "1600px",
}
`);
  });

  it('should support the grid mixin', async () => {
    const { result } = await renderClassic(`
@import '../grid';

@include grid();
`);

    expect(result.css.toString()).toMatchSnapshot();
  });

  it('should support the breakpoint function', async () => {
    const { calls, error, output } = await renderClassic(`
@import '../grid';

@each $key, $value in $grid-breakpoints {
  $t: test($key, breakpoint($key));
}
$t: test('unknown', breakpoint('unknown'));
`);

    // We want to check valid breakpoints up to the last call, which was
    // unknown
    for (let i = 0; i < calls.length - 1; i++) {
      expect(calls[i][0]).toBeInstanceOf(types.String);
      expect(calls[i][1]).toBeInstanceOf(types.Number);
    }

    // `breakpoint` is expected to warn on the unknown test case
    // Should be called twice now since feature flags have diverged in v10
    expect(output.warn).toHaveBeenCalledTimes((await isClassic()) ? 1 : 2);

    // This should fail because `breakpoint('unknown')` does not return a
    // value
    expect(error).toBeDefined();
  });

  describe('grid--x', () => {
    it('should generate grid code when the grid feature flag is on', async () => {
      const { result } = await render(`
$feature-flags: (grid: true);
@import '../grid';
`);
      expect(result.css.toString()).toMatchSnapshot();
    });

    it('should export a 12 column grid by default', async () => {
      const { result } = await render(`
$feature-flags: (grid: true);
@import '../grid';
`);
      const output = result.css.toString();
      const breakpoints = ['lg', 'xlg', 'max'];

      for (const breakpoint of breakpoints) {
        expect(output).toEqual(expect.stringContaining(`col-${breakpoint}-12`));
        expect(output).not.toEqual(
          expect.stringContaining(`col-${breakpoint}-13`)
        );

        expect(output).toEqual(
          expect.stringContaining(`--offset-${breakpoint}-11`)
        );
        expect(output).not.toEqual(
          expect.stringContaining(`--offset-${breakpoint}-12`)
        );
      }
    });

    it('should export a 16 column grid behind a flag', async () => {
      const { result } = await render(`
$feature-flags: (grid: true, grid-columns-16: true);
@import '../grid';
`);
      const output = result.css.toString();
      const breakpoints = ['lg', 'xlg', 'max'];

      for (const breakpoint of breakpoints) {
        expect(output).toEqual(expect.stringContaining(`col-${breakpoint}-16`));
        expect(output).not.toEqual(
          expect.stringContaining(`col-${breakpoint}-17`)
        );

        expect(output).toEqual(
          expect.stringContaining(`--offset-${breakpoint}-15`)
        );
        expect(output).not.toEqual(
          expect.stringContaining(`--offset-${breakpoint}-16`)
        );
      }
    });
  });
});
