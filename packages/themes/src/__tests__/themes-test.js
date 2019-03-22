/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

const path = require('path');
const { themes, tokens } = require('../');

describe('themes', () => {
  describe.each(Object.keys(themes))('%s', name => {
    const theme = themes[name];
    test.each(tokens.colors)('%s should be defined', token => {
      expect(theme[token]).toBeDefined();
    });
  });
});
