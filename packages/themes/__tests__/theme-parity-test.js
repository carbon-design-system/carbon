/**
 * Copyright IBM Corp. 2024, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { readResolver } = require('../style-dictionary/resolver');

const TOKENS_DIR = path.resolve(__dirname, '../tokens');
const EXTENSION_NAMESPACE = 'com.ibm.carbon';
const TOKEN_FILE_EXTENSION = '.tokens.json';

const resolver = readResolver(path.join(TOKENS_DIR, 'themes.resolver.json'));
const themeNames = resolver.contexts('theme');

/**
 * The token files of every theme, keyed by file name and then by theme:
 * `{ theme: { white: {...}, g10: {...} }, button: {...} }`
 */
const files = {};
for (const themeName of themeNames) {
  for (const filepath of resolver.resolve({ theme: themeName }).source) {
    const name = path.basename(filepath, TOKEN_FILE_EXTENSION);
    files[name] ??= {};
    files[name][themeName] = JSON.parse(fs.readFileSync(filepath, 'utf8'));
  }
}

function getTokens(file) {
  return Object.entries(file).filter(([key]) => !key.startsWith('$'));
}

function getTokenNames(file) {
  return getTokens(file).map(([name]) => name);
}

describe('theme token files', () => {
  test('the resolver references every token file', () => {
    const referenced = themeNames.flatMap((themeName) => {
      return resolver.resolve({ theme: themeName }).source;
    });
    const found = fs
      .readdirSync(path.join(TOKENS_DIR, 'themes'), { recursive: true })
      .filter((file) => file.endsWith(TOKEN_FILE_EXTENSION))
      .map((file) => path.join(TOKENS_DIR, 'themes', file));

    expect(referenced.sort()).toEqual(found.sort());
  });

  test('every theme has the same token files', () => {
    for (const themes of Object.values(files)) {
      expect(Object.keys(themes)).toEqual(themeNames);
    }
  });

  describe.each(Object.entries(files))('%s', (name, themes) => {
    test.each(Object.entries(themes))(
      '%s tokens are flat, typed and described',
      (themeName, file) => {
        for (const [tokenName, token] of getTokens(file)) {
          // The name of a token is its name in Sass and CSS. Tokens are not
          // nested in groups, so a token is never also a group.
          expect(tokenName).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
          expect(token).toHaveProperty('$value');
          expect(token.$type).toBe('color');
          expect(typeof token.$description).toBe('string');
          expect(token.$description.trim()).not.toBe('');
        }
      }
    );

    test('tokens only differ in value between themes', () => {
      const [reference, ...others] = Object.values(themes).map((file) => {
        return Object.fromEntries(
          getTokens(file).map(([tokenName, { $value, ...token }]) => {
            return [tokenName, token];
          })
        );
      });

      for (const other of others) {
        for (const [tokenName, token] of Object.entries(other)) {
          expect({ [tokenName]: token }).toEqual({
            [tokenName]: reference[tokenName],
          });
        }
      }
    });
  });

  test('every theme defines the same theme tokens in the same order', () => {
    const [reference, ...others] = Object.values(files.theme).map(
      getTokenNames
    );

    for (const other of others) {
      expect(other).toEqual(reference);
    }
  });

  test('component tokens are named after their component', () => {
    const { theme, ...components } = files;

    for (const [component, themes] of Object.entries(components)) {
      for (const file of Object.values(themes)) {
        for (const tokenName of getTokenNames(file)) {
          expect(tokenName.startsWith(`${component}-`)).toBe(true);
        }
      }
    }
  });

  test.each(Object.entries(files.theme))(
    '%s declares its color scheme',
    (themeName, file) => {
      expect(['light', 'dark']).toContain(
        file.$extensions[EXTENSION_NAMESPACE]['color-scheme']
      );
    }
  );
});
