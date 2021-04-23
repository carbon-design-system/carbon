/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const { SassRenderer } = require('@carbon/test-utils/scss');

const { render } = SassRenderer.create(__dirname);

describe('@carbon/styles/scss/theme', () => {
  test('Public API', async () => {
    const { get } = await render(`
      @use 'sass:map';
      @use 'sass:meta';
      @use '../theme';

      $_: get('api', (
        variables: map.keys(meta.module-variables('theme')),
        mixins: (
          theme: meta.mixin-exists('theme', 'theme'),
          set-theme: meta.mixin-exists('set-theme', 'theme'),
        ),
      ));
    `);

    const { value: api } = get('api');
    expect(api.mixins).toEqual({
      theme: true,
      'set-theme': true,
    });
    expect(api.variables).toMatchInlineSnapshot(`
      Array [
        "theme",
      ]
    `);
  });
});
