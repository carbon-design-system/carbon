/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const { SassRenderer } = require('@carbon/test-utils/scss');

const { render } = SassRenderer.create(__dirname);

describe('@carbon/styles/scss/colors', () => {
  test('Public API', async () => {
    const { get } = await render(`
      @use 'sass:meta';
      @use '../colors';

      $_: get('variables', meta.module-variables('colors'));
    `);

    // Colors only exports variables at the moment
    expect(get('variables').value).toMatchSnapshot();
  });
});
