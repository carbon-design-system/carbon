/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const { convert, createSassRenderer } = require('@carbon/test-utils/scss');
const { formatTokenName, themes, tokens } = require('../src');

const render = createSassRenderer(__dirname);

describe('themes.scss', () => {
  describe('_theme-maps.scss', () => {
    it('should export all themes as sass maps', async () => {
      const themeMapsTests = Object.keys(themes).map(theme => {
        return `$t: test(global-variable-exists(carbon--theme--${theme}));`;
      });
      const { calls } = await render(`
@import '../scss/theme-maps';

${themeMapsTests.join('\n')}
`);

      for (const call of calls) {
        expect(call[0].getValue()).toBe(true);
      }
    });
  });

  describe('_tokens.scss', () => {
    it('should export all tokens', async () => {
      const tokenVariableTests = tokens.colors.map(token => {
        return `$t: test(global-variable-exists(${formatTokenName(token)}));`;
      });
      const { calls } = await render(`
  @import '../scss/tokens';

  ${tokenVariableTests.join('\n')}
`);

      for (const call of calls) {
        expect(call[0].getValue()).toBe(true);
      }
    });
  });

  describe('_mixins.scss', () => {
    it('should export a carbon--theme mixin', async () => {
      const { calls } = await render(`
@import '../scss/mixins';

$t: test(mixin-exists(carbon--theme));
`);

      for (const call of calls) {
        expect(call[0].getValue()).toBe(true);
      }
    });

    it('should set token variables for the given theme', async () => {
      const themeTests = Object.keys(themes).map(key => {
        const variable = `$carbon--theme--${key}`;
        const test = `
@include carbon--theme(${variable}) {
  $t: test($interactive-01);
}
`;
        return [variable, themes[key].interactive01, test];
      });
      const tests = themeTests
        .map(([_variable, _expectedColor, test]) => test)
        .join('\n');
      const { calls } = await render(`
@import '../scss/themes';
${tests}
`);

      themeTests.forEach(([_variable, expectedColor], i) => {
        expect(convert(calls[i][0])).toBe(expectedColor);
      });
    });

    it('should reset token variables after using the theme', async () => {
      const { calls } = await render(`
@import '../scss/themes';

$custom-theme: map-merge($carbon--theme--white, (
  interactive-01: #ffffff,
));

$t: test($interactive-01);

@include carbon--theme($custom-theme) {
  $t: test($interactive-01);
}

$t: test($interactive-01);
`);

      const colors = calls.map(call => convert(call[0]));
      expect(colors[0]).toEqual(colors[2]);
      expect(colors[1]).toBe('#ffffff');
    });
  });
});
