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
const { formatTokenName, tokens } = require('../src');

const render = createSassRenderer(__dirname);

describe('_tokens.scss', () => {
  it('should export all tokens', async () => {
    const tokenVariableTests = tokens.colors.map((token) => {
      return `$t: test(global-variable-exists(${formatTokenName(token)}));`;
    });
    const { calls } = await render(`
      @import '../scss/tokens';

      ${tokenVariableTests.join('\n')}
    `);

    for (const call of calls) {
      expect(call[0].getValue()).toBe(true);
    }
  });
});
