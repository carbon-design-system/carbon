/**
 * Copyright IBM Corp. 2015, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const { SassRenderer } = require('@carbon/test-utils/scss');

const { render } = SassRenderer.create(__dirname);

describe('@carbon/colors', () => {
  test('Public API', async () => {
    const { getValue } = await render(`
      @use 'sass:meta';
      @use '../index.scss' as colors;

      $_: get-value(meta.module-variables('colors'));
    `);

    const variables = getValue(0);
    expect(variables).toMatchSnapshot();
  });
});
