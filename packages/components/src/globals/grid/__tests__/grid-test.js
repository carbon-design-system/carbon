/**
 * Copyright IBM Corp. 2015, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

const { createSassRenderer } = require('@carbon/test-utils/scss');

const render = createSassRenderer(
  __dirname,
  `
$css--font-face: false;
$css--helpers: false;
$css--body: false;
$css--use-layer: false;
$css--reset: false;
$css--plex: false;
`
);

describe('_grid.scss', () => {
  it('should generate grid code when the grid feature flag is on', async () => {
    const { result } = await render(`
@import '../grid';
`);
    expect(result.css.toString()).toMatchSnapshot();
  });

  it('should export a 12 column grid by default', async () => {
    const { result } = await render(`
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
$feature-flags: (grid-columns-16: true);
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
