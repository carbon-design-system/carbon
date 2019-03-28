/**
 * Copyright IBM Corp. 2015, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

const { convert, createSassRenderer } = require('@carbon/test-utils/scss');

const variables = ['font-path', 'unicodes', 'families', 'fallbacks', 'weights'];
const render = createSassRenderer(__dirname);
const renderClassic = content =>
  render(`
$css--reset: false;
$feature-flags: (components-x: false, breaking-changes-x: false);
${content}
`);

const isClassic = async () => {
  const { calls } = await renderClassic(`
@import '../../scss/functions';
$t: test(feature-flag-enabled('breaking-changes-x'));
`);
  return !convert(calls[0][0]);
};

describe('_css--plex-core', () => {
  it.each(variables)('should export the variable $%s', async name => {
    const { calls } = await renderClassic(`
@import '../css--plex-core';

$c: test(global-variable-exists(${name}));
$value: test($${name});
`);
    // Check that global-variable-exists returned true
    expect(calls[0][0].getValue()).toBe(true);
    expect(convert(calls[1][0])).toMatchSnapshot();
  });

  describe('check-default-font-path', () => {
    it('should warn if the default $font-path uses unpkg', async () => {
      const { output } = await renderClassic(`
@import '../css--plex-core';

@include check-default-font-path() {
  $test: true;
};
`);

      // This should be called twice now that feature flags have diverged in v10
      expect(output.warn).toHaveBeenCalledTimes((await isClassic()) ? 1 : 2);
    });

    it('should not warn if $font-path is set and does not contain unpkg', async () => {
      const { output } = await renderClassic(`
$font-path: 'https://my-custom-cdn.com';
@import '../css--plex-core';

@include check-default-font-path() {
  $test: true;
};
`);
      // In v10, one call comes from feature flag divergence
      expect(output.warn).toHaveBeenCalledTimes((await isClassic()) ? 0 : 1);
    });
  });

  describe('plex-font-face', () => {
    it('should output @font-face files based on families, weights, and unicodes', async () => {
      const { result } = await renderClassic(`
@import '../css--plex-core';

@include plex-font-face();
`);
      expect(result.css.toString()).toMatchSnapshot();
    });
  });
});
