/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

require('core-js/features/array/flat-map');

const { convert, createSassRenderer } = require('@carbon/test-utils/scss');
const { formatTokenName, themes, tokens } = require('../../src');

const render = createSassRenderer(__dirname);
const { white: defaultTheme } = themes;

function flatten(tokens) {
  return Object.keys(tokens).flatMap(group => tokens[group]);
}

describe('themes.scss', () => {
  describe('tokens', () => {
    it.each(flatten(tokens))(
      '%s should match the default theme',
      async token => {
        const name = formatTokenName(token);
        const { calls } = await render(`
          @import '../themes';
          $t: test(global-variable-exists(${name}));
          $t: test($${name});
        `);
        expect(convert(calls[0][0])).toBe(true);
        expect(convert(calls[1][0])).toBe(defaultTheme[token]);
      }
    );
  });

  describe('carbon--theme', () => {
    it('should export tokens that match the default theme', async () => {
      const { calls } = await render(`
        @import '../themes';
        $t: test($carbon--theme);
      `);
      const theme = convert(calls[0][0]);

      Object.keys(defaultTheme).forEach(token => {
        expect(defaultTheme[token]).toEqual(theme[formatTokenName(token)]);
      });
    });

    it('should update based on global token definitions', async () => {
      const color = '#000000';
      const { calls } = await render(`
        $interactive-01: ${color};

        @import '../themes';
        $t: test($carbon--theme);
      `);
      const theme = convert(calls[0][0]);

      expect(theme['interactive-01']).toEqual(color);
    });
  });
});
