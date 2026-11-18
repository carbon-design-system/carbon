/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

import { themes, notificationTokens, statusTokens } from '../';
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

describe('notificationTokens', () => {
  // https://github.com/carbon-design-system/carbon/issues/18044
  test('notificationActionHover should be defined for every theme', () => {
    expect(notificationTokens.notificationActionHover).toEqual({
      whiteTheme: '#ffffff',
      g10: '#ffffff',
      g90: '#474747',
      g100: '#333333',
    });
  });
});

describe('statusTokens', () => {
  test.each([
    ['statusOrangeOutline', '#ba4e00', '#ff832b'],
    ['statusYellowOutline', '#8e6a00', '#f1c21b'],
  ])('%s should be defined for every theme', (token, light, dark) => {
    expect(statusTokens[token]).toEqual({
      whiteTheme: light,
      g10: light,
      g90: dark,
      g100: dark,
    });
  });
});
