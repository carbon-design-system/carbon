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
});
