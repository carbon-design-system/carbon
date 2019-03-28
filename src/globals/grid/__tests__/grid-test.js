/**
 * Copyright IBM Corp. 2015, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

const { types } = require('node-sass');
const { convert, renderSass } = require('../../../../tools/jest/scss');

describe('_grid.scss', () => {
  it('should export grid variables', async () => {
    const { calls } = await renderSass(`
@import './src/globals/grid/grid';

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
    const { result } = await renderSass(`
$css--reset: false;
$css--helpers: false;
@import './src/globals/grid/grid';

@include grid();
`);

    expect(result.css.toString()).toMatchSnapshot();
  });

  it('should support the breakpoint function', async () => {
    const { calls, error, output } = await renderSass(`
@import './src/globals/grid/grid';

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
    expect(output.warn).toHaveBeenCalledTimes(1);

    // This should fail because `breakpoint('unknown')` does not return a
    // value
    expect(error).toBeDefined();
  });

  describe('grid--x', () => {
    it('should generate grid code when the grid feature flag is on', async () => {
      const { result } = await renderSass(`
$feature-flags: (grid: true);
@import './src/globals/grid/grid';
`);
      expect(result.css.toString()).toMatchSnapshot();
    });

    it('should export a 12 column grid by default', async () => {
      const { result } = await renderSass(`
$feature-flags: (grid: true);
@import './src/globals/grid/grid';
`);
      const output = result.css.toString();
      const breakpoints = ['lg', 'xlg', 'max'];

      for (const breakpoint of breakpoints) {
        expect(output).toEqual(expect.stringContaining(`col-${breakpoint}-12`));
        expect(output).not.toEqual(expect.stringContaining(`col-${breakpoint}-13`));

        expect(output).toEqual(expect.stringContaining(`--offset-${breakpoint}-11`));
        expect(output).not.toEqual(expect.stringContaining(`--offset-${breakpoint}-12`));
      }
    });

    it('should export a 16 column grid behind a flag', async () => {
      const { result } = await renderSass(`
$feature-flags: (grid: true, grid-columns-16: true);
@import './src/globals/grid/grid';
`);
      const output = result.css.toString();
      const breakpoints = ['lg', 'xlg', 'max'];

      for (const breakpoint of breakpoints) {
        expect(output).toEqual(expect.stringContaining(`col-${breakpoint}-16`));
        expect(output).not.toEqual(expect.stringContaining(`col-${breakpoint}-17`));

        expect(output).toEqual(expect.stringContaining(`--offset-${breakpoint}-15`));
        expect(output).not.toEqual(expect.stringContaining(`--offset-${breakpoint}-16`));
      }
    });
  });
});
