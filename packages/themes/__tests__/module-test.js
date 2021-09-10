/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const { SassRenderer } = require('@carbon/test-utils/scss');
const { group, themes } = require('../src/next');

const { render } = SassRenderer.create(__dirname);
const tokens = group.getTokens();

describe('@carbon/themes/scss', () => {
  test('index.scss', async () => {
    const tokenVariables = tokens.map((token) => {
      const variable = `themes.$${token.name}`;
      return `$_: get('${variable}', ${variable});`;
    });

    const { unwrap } = await render(`
      @use 'sass:meta';
      @use '../' as themes;

      // Theme mixin
      $_: get('themes.theme', meta.mixin-exists(theme, 'themes'));

      // Get value from current theme
      $_: get('themes.get', meta.function-exists(get, 'themes'));

      // Current theme
      $_: get('themes.$theme', themes.$theme);

      // Theme variables
      ${tokenVariables.join('\n')}
    `);

    // Mixin
    expect(unwrap('themes.theme')).toBe(true);
    // Current theme
    expect(unwrap('themes.$theme')).toBeDefined();
    // Theme getter
    expect(unwrap('themes.get')).toBe(true);

    // All tokens should be available as variables
    for (const token of tokens) {
      const variable = `themes.$${token.name}`;
      expect(unwrap(variable)).toBeDefined();
    }
  });

  test('scss/_themes.scss', async () => {
    const { unwrap } = await render(`
      @use '../scss/modules/themes';

      // Themes
      $_: get('themes.$white', themes.$white);
      $_: get('themes.$g10', themes.$g10);
      $_: get('themes.$g90', themes.$g90);
      $_: get('themes.$g100', themes.$g100);
    `);

    // Themes should be available
    for (const theme of Object.keys(themes)) {
      expect(unwrap(`themes.$${theme}`)).toBeDefined();
    }
  });

  describe('configuration', () => {
    // Set current theme to another theme
    test('$theme', async () => {
      const { unwrap } = await render(`
        @use 'sass:map';
        @use '../scss/modules/themes' as *;
        @use '../' as themes with (
          $theme: $g100
        );

        $_: get('theme.background', themes.get('background'));
        $_: get('g100.background', map.get($g100, 'background'));
      `);
      expect(unwrap('theme.background')).toBe(unwrap('g100.background'));
    });

    // Set current theme to a custom theme
    test('custom $theme', async () => {
      const { unwrap } = await render(`
        @use '../' as themes with (
          $theme: (
            token-01: #ffffff
          )
        );

        $_: get('token-01', themes.get('token-01'));
        $_: get('background', themes.get('background'));
      `);
      expect(unwrap('token-01')).toBe('#ffffff');
      expect(unwrap('background')).toBeDefined();
    });

    // Set theme fallback
    test('$fallback', async () => {
      const { unwrap } = await render(`
        @use 'sass:map';
        @use '../scss/modules/themes' as *;
        @use '../' as themes with (
          $fallback: $g100,
          $theme: (
            token-01: #ffffff,
          ),
        );

        $_: get('token-01', themes.get('token-01'));
        $_: get('background', themes.get('background'));
        $_: get('gray100.background', map.get($g100, 'background'));
      `);

      // Should allow custom token to resolve and other tokens should resolve
      // from the $fallback theme
      expect(unwrap('token-01')).toBe('#ffffff');
      expect(unwrap('background')).toBe(unwrap('gray100.background'));
    });

    // Set value fallback for CSS Custom Properties
    test('$use-fallback-value', async () => {
      const { unwrap } = await render(`
        @use '../' as themes with (
          $use-fallback-value: false,
        );

        $_: get('background', themes.$background);
      `);
      expect(unwrap('background')).toBe('var(--cds-background)');
    });

    // Set prefix for CSS Custom Properties
    test('$property-prefix', async () => {
      const { unwrap } = await render(`
        @use '../' as themes with (
          $prefix: 'test',
        );

        $_: get('background', themes.$background);
      `);
      expect(unwrap('background')).toEqual('var(--test-background, #ffffff)');
    });
  });
});
