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

describe('@carbon/styles/scss/themes', () => {
  test('Public API', async () => {
    const { get } = await render(`
      @use 'sass:map';
      @use 'sass:meta';
      @use '../themes';

      $_: get('api', map.keys(meta.module-variables('themes')));
    `);

    const { value: api } = get('api');
    expect(api).toMatchInlineSnapshot(`
      Array [
        "white",
        "g10",
        "g90",
        "g100",
      ]
    `);
  });
});
