/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const { SassRenderer } = require('@carbon/test-utils/scss');
const css = require('css');
const isEqual = require('react-fast-compare');

const { render } = SassRenderer.create(__dirname);

describe('zone', () => {
  it('should set a component token value to the theme of a zone', async () => {
    const { get, result } = await render(`
      @use '../themes';
      @use '../components/button/tokens';
      @use '../zone';

      $_: get('themes', (
        white: themes.$white,
        g10: themes.$g10,
        g90: themes.$g90,
        g100: themes.$g100,
      ));
      $_: get('tokens', tokens.$button-tokens);
    `);

    const themes = Array.from(Object.entries(get('themes').value));
    const tokensByTheme = new Map(
      themes.map(([theme]) => {
        return [theme, new Map()];
      })
    );

    // Group each of the button tokens into their values by theme
    const buttonTokens = get('tokens');
    for (const [token, { values }] of Object.entries(buttonTokens.value)) {
      for (const { theme, value } of values) {
        const match = themes.find(([_id, themeMap]) => {
          return isEqual(themeMap, theme);
        });

        tokensByTheme.get(match[0]).set(token, value);
      }
    }

    // When including the `_zone.scss` file, we generate a stylesheet with four
    // classes, one per theme.
    const { stylesheet } = css.parse(result.css.toString());

    for (const rule of stylesheet.rules) {
      // For each selector, we check that every button token that we have
      // defined for this theme is emitted in CSS.
      // We check that the property is present without strict value equality,
      // because Sass normalises oklch() color values (e.g. 0.5565 → 55.65%,
      // appends deg) while the map returns the pre-normalised string form.
      const [_prefix, theme] = rule.selectors[0].split('--');
      const tokens = tokensByTheme.get(theme);
      const includesComponentTokens = Array.from(tokens.entries()).every(
        ([token]) => {
          return rule.declarations.find((declaration) => {
            return declaration?.property?.includes(token);
          });
        }
      );

      expect(includesComponentTokens).toBe(true);
    }
  });
});
