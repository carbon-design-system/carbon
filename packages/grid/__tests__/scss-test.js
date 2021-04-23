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

describe('@carbon/grid', () => {
  test('Public API', async () => {
    const { get } = await render(`
      @use 'sass:meta';
      @use '../index.scss' as grid;

      $_: get('variables', meta.module-variables('grid'));
      $_: get('mixins', (
        grid: meta.mixin-exists('css-grid', 'grid'),
      ));
    `);

    const variables = get('variables');
    expect(Object.keys(variables.value)).toMatchSnapshot();

    const mixins = get('mixins');
    expect(mixins.value.grid).toBe(true);
  });
});
