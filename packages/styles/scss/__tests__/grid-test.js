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

describe('@carbon/styles/scss/grid', () => {
  test('Public API', async () => {
    const { get } = await render(`
      @use 'sass:meta';
      @use '../grid' as *;

      $_: get('api', (
        variables: (
          grid-gutter: meta.variable-exists('grid-gutter'),
          grid-gutter-condensed: meta.variable-exists('grid-gutter-condensed'),
          grid-breakpoints: meta.variable-exists('grid-breakpoints'),
        ),
        mixins: (
          css-grid: meta.mixin-exists('css-grid'),
          flex-grid: meta.mixin-exists('flex-grid'),
        ),
      ));
    `);

    const { value: api } = get('api');
    expect(api).toEqual({
      variables: {
        'grid-gutter': true,
        'grid-gutter-condensed': true,
        'grid-breakpoints': true,
      },
      mixins: {
        'css-grid': true,
        'flex-grid': true,
      },
    });
  });
});
