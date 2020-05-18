/**
 * Copyright IBM Corp. 2015, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

const { createSassRenderer } = require('@carbon/test-utils/scss');

const render = createSassRenderer(__dirname);

describe('_css--font-face.scss', () => {
  it('should not output CSS if $css--font-face is false', async () => {
    const { result } = await render(`
$css--reset: false;
$css--font-face: false;
@import '../css--font-face';
`);

    // Should be an empty string, currently will output only @keyframes that are
    // not wrapped around a css flag
    expect(result.css.toString()).toMatchSnapshot();
  });

  describe('experimental', () => {
    it('should output @font-face blocks from elements if components-x flag is enabled', async () => {
      const { result } = await render(`
$css--reset: false;
$css--font-face: true;
$css--plex: true;
@import '../css--font-face';
`);

      expect(result.css.toString()).toMatchSnapshot();
      expect(result.css.toString()).toEqual(
        expect.stringContaining('@font-face')
      );
      expect(result.css.toString()).toEqual(
        expect.stringContaining(`font-family: 'IBM Plex Mono'`)
      );
      expect(result.css.toString()).toEqual(
        expect.stringContaining(`font-family: 'IBM Plex Sans'`)
      );
    });
  });
});
