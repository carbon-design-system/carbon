/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

const path = require('path');
const { themes } = require('../');

const tokens = new Set([
  // Core
  'interactive01',
  'interactive02',
  'interactive03',

  'uiBackground',

  'ui01',
  'ui02',
  'ui03',
  'ui04',
  'ui05',

  'text01',
  'text02',
  'text03',
  'text04',

  'icon01',
  'icon02',

  'field01',
  'field02',

  'inverse01',
  'inverse02',

  'support01',
  'support02',
  'support03',
  'support04',

  'overlay01',

  // Interactive states
  'focus',

  'hoverPrimary',
  'activePrimary',
  'hoverPrimaryText',

  'hoverSecondary',
  'activeSecondary',

  'hoverTertiary',
  'activeTertiary',

  'hoverUI',
  'activeUI',

  'selectedUI',
  'hoverSelectedUI',

  'hoverDanger',
  'activeDanger',

  'hoverRow',

  'visitedLink',

  'disabled01',
  'disabled02',
  'disabled03',
]);

describe('themes', () => {
  describe.each(Object.keys(themes))('%s', name => {
    const theme = themes[name];
    test.each([...tokens])('%s should be defined', token => {
      expect(theme[token]).toBeDefined();
    });
  });
});
