/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

import { themes } from '../';
import { tokens as tokenNames } from '../../js/generated/metadata.js';

const tokens = tokenNames.map((name) => {
  return name.replace(/-([a-z0-9])/g, (_, char) => char.toUpperCase());
});

describe('themes', () => {
  describe.each(Object.entries(themes))('%s', (_name, theme) => {
    test.each(tokens)('%s should be defined', (token) => {
      expect(theme[token]).toBeDefined();
    });
  });
});
