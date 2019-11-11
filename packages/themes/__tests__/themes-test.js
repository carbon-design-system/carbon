/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

require('core-js/features/array/flat-map');

const { convert, createSassRenderer } = require('@carbon/test-utils/scss');
const { camelCase } = require('change-case');
const { formatTokenName, themes, tokens } = require('../src');

const render = createSassRenderer(__dirname);
const { white: defaultTheme } = themes;

function flatten(tokens) {
  return Object.keys(tokens).flatMap(group => tokens[group]);
}

function formatObjectKeys(object) {
  if (typeof object !== 'object') {
    if (isNaN(object)) {
      return object;
    }
    return parseFloat(object, 10);
  }
  if (Array.isArray(object)) {
    return object;
  }
  return Object.keys(object).reduce((acc, key) => {
    return {
      ...acc,
      [camelCase(key)]: formatObjectKeys(object[key]),
    };
  }, {});
}

describe('themes.scss', () => {
  describe('tokens', () => {
    it.each(flatten(tokens))(
      '%s should match the default theme',
      async token => {
        const name = formatTokenName(token);
        const { calls } = await render(`
          @import '../scss/themes';
          $t: test(global-variable-exists(${name}));
          $t: test($${name});
        `);
        expect(convert(calls[0][0])).toBe(true);
        // Since some of our tokens are objects/maps (specifically type), we'll
        // need to format the Sass value so that keys are changed from
        // param-case to camelCase and that values are correctly mapped over for
        // strings and numbers
        expect(formatObjectKeys(convert(calls[1][0]))).toEqual(
          defaultTheme[token]
        );
      }
    );
  });

  describe('carbon--theme', () => {
    it('should export tokens that match the default theme', async () => {
      const { calls } = await render(`
        @import '../scss/themes';
        $t: test($carbon--theme);
      `);
      const theme = convert(calls[0][0]);

      Object.keys(defaultTheme).forEach(token => {
        expect(defaultTheme[token]).toEqual(
          formatObjectKeys(theme[formatTokenName(token)])
        );
      });
    });

    it('should update based on global token definitions', async () => {
      const color = '#000000';
      const { calls } = await render(`
        $interactive-01: ${color};

        @import '../scss/themes';
        $t: test($carbon--theme);
      `);
      const theme = convert(calls[0][0]);

      expect(theme['interactive-01']).toEqual(color);
    });

    it('should support emitting the difference between themes', async () => {
      const { result } = await render(`
        @import '../scss/themes';

        $carbon--theme: map-merge($carbon--theme--white, (
          interactive-01: #000000,
        ));
        $theme--light: map-merge($carbon--theme--white, (
          interactive-01: #ffffff,
        ));

        .emit-all-values {
          @include carbon--theme(
            $emit-custom-properties: true,
            $emit-difference: false,
          );
        }

        .emit-changed-values {
          @include carbon--theme(
            $theme: $theme--light,
            $emit-custom-properties: true,
            $emit-difference: true,
          );
        }
      `);

      const style = document.createElement('style');
      style.innerHTML = result.css.toString();
      document.head.appendChild(style);

      const allValues = document.styleSheets[0].cssRules[0].style;
      const changedValues = document.styleSheets[0].cssRules[1].style;

      expect(allValues.length).toBeGreaterThan(changedValues.length);
      expect(changedValues.length).toBe(1);
    });
  });
});
