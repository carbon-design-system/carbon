/**
 * Copyright IBM Corp. 2015, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

const { convert, renderSass } = require('../../../../tools/jest/scss');

const variables = ['font-path', 'unicodes', 'families', 'fallbacks', 'weights'];

describe('_css--plex-core', () => {
  it.each(variables)('should export the variable $%s', async name => {
    const { calls } = await renderSass(`
@import './src/globals/scss/css--plex-core';

$c: test(global-variable-exists(${name}));
$value: test($${name});
`);
    // Check that global-variable-exists returned true
    expect(calls[0][0].getValue()).toBe(true);
    expect(convert(calls[1][0])).toMatchSnapshot();
  });

  describe('check-default-font-path', () => {
    it('should warn if the default $font-path uses unpkg', async () => {
      const { output } = await renderSass(`
@import './src/globals/scss/css--plex-core';

@include check-default-font-path() {
  $test: true;
};
`);
      expect(output.warn).toHaveBeenCalledTimes(1);
    });

    it('should not warn if $font-path is set and does not contain unpkg', async () => {
      const { output } = await renderSass(`
$font-path: 'https://my-custom-cdn.com';
@import './src/globals/scss/css--plex-core';

@include check-default-font-path() {
  $test: true;
};
`);
      expect(output.warn).not.toHaveBeenCalled();
    });
  });

  describe('plex-font-face', () => {
    it('should output @font-face files based on families, weights, and unicodes', async () => {
      const { result } = await renderSass(`
@import './src/globals/scss/css--plex-core';

@include plex-font-face();
`);
      expect(result.css.toString()).toMatchSnapshot();
    });
  });
});
