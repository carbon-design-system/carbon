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

describe('@carbon/styles/scss/breakpoint', () => {
  test('Public API', async () => {
    const { get } = await render(`
      @use 'sass:meta';
      @use '../breakpoint';

      $_: get('api', (
        mixins: (
          breakpoint: meta.mixin-exists('breakpoint', 'breakpoint'),
          breakpoint-between: meta.mixin-exists('breakpoint-between', 'breakpoint'),
          breakpoint-down: meta.mixin-exists('breakpoint-down', 'breakpoint'),
          breakpoint-up: meta.mixin-exists('breakpoint-up', 'breakpoint'),
        ),
      ));
    `);

    const { value: api } = get('api');
    expect(api).toEqual({
      mixins: {
        breakpoint: true,
        'breakpoint-between': true,
        'breakpoint-down': true,
        'breakpoint-up': true,
      },
    });
  });
});
