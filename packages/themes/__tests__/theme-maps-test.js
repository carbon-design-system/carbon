/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const { createSassRenderer } = require('@carbon/test-utils/scss');
const { themes } = require('../src');

const render = createSassRenderer(__dirname);

describe('_theme-maps.scss', () => {
  it('should export all themes as sass maps', async () => {
    const themeMapsTests = Object.keys(themes).map((theme) => {
      return `$t: test(global-variable-exists(carbon--theme--${theme}));`;
    });
    const { calls } = await render(`
      @import '../scss/theme-maps';

      ${themeMapsTests.join('\n')}
    `);

    for (const call of calls) {
      expect(call[0].getValue()).toBe(true);
    }
  });
});
