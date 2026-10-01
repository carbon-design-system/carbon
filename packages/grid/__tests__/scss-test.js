/**
 * Copyright IBM Corp. 2015, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const { SassRenderer } = require('@carbon/test-utils/scss');

const { render } = SassRenderer.create(__dirname);

describe('@carbon/grid', () => {
  test('Public API', async () => {
    const { unwrap } = await render(`
      @use 'sass:meta';
      @use '../index.scss' as grid;

      $_: get('variables', meta.module-variables('grid'));
      $_: get('mixins', (
        css-grid: meta.mixin-exists('css-grid', 'grid'),
        flex-grid: meta.mixin-exists('flex-grid', 'grid'),
      ));
    `);

    expect(Object.keys(unwrap('variables'))).toMatchSnapshot();
    expect(unwrap('mixins')).toEqual({
      'css-grid': true,
      'flex-grid': true,
    });
  });

  test('breakpoint-between applies the max-width hotfix to named upper breakpoints', async () => {
    const { result } = await render(`
      @use '../scss/breakpoint';

      .test {
        @include breakpoint.breakpoint-between('md', 'lg') {
          color: red;
        }
      }
    `);

    expect(result.css).toMatchInlineSnapshot(`
      "@media (min-width: 42rem) and (max-width: 65.98rem) {
        .test {
          color: red;
        }
      }"
    `);
  });
});
