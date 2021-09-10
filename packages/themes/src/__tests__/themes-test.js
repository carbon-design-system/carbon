/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

const { themes, tokens } = require('../');

const tokenList = Object.keys(tokens).reduce((acc, key) => {
  return acc.concat(tokens[key]);
}, []);

describe('themes', () => {
  describe.each(Object.keys(themes))('%s', (name) => {
    const theme = themes[name];

    // Test to make sure that all tokens defined exist in the theme
    test.each(tokenList)('%s should be defined', (token) => {
      expect(theme[token]).toBeDefined();
    });

    // Test to make sure that all values in the them are actually tokens, useful
    // for catching a case where we have an extra token that should be in the
    // tokens export
    test.each(Object.keys(theme))('%s should be a token', (token) => {
      expect(tokenList.indexOf(token)).not.toBe(-1);
    });
  });
});
