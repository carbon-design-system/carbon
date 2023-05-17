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

describe('@carbon/styles/scss/config', () => {
  test('Public API', async () => {
    const { get } = await render(`
      @use 'sass:meta';
      @use '../config';
      $_: get('variables', meta.module-variables('config'));
    `);

    // Config only exports variables at the moment
    expect(get('variables').value).toMatchSnapshot();
  });

  test('overrides', async () => {
    const { get } = await render(`
      @use 'sass:meta';
      @use '../config' with (
        $prefix: 'test',
        $css--font-face: false,
        $css--reset: false,
        $css--default-type: false,
      );

      $_: get('config', (
        css--default-type: config.$css--default-type,
        css--font-face: config.$css--font-face,
        css--reset: config.$css--reset,
        prefix: config.$prefix,
      ));
    `);

    expect(get('config').value).toEqual({
      'css--default-type': false,
      'css--font-face': false,
      'css--reset': false,
      prefix: 'test',
    });
  });
});
