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

describe('scss/components/data-table', () => {
  test('Public API', async () => {
    const { unwrap } = await render(`
       @use 'sass:map';
       @use 'sass:meta';
       @use '../data-table';
 
       $_: get('mixin', meta.mixin-exists('data-table-v2-action', 'data-table-v2-action'));
       $_: get('variables', map.keys(meta.module-variables('data-table-v2-action')));

       $_: get('mixin', meta.mixin-exists('data-table-core', 'data-table-core'));
       $_: get('variables', map.keys(meta.module-variables('data-table-core')));

       $_: get('mixin', meta.mixin-exists('data-table-expandable', 'data-table-expandable'));
       $_: get('variables', map.keys(meta.module-variables('data-table-expandable')));

       $_: get('mixin', meta.mixin-exists('data-table-sort', 'data-table-sort'));
       $_: get('variables', map.keys(meta.module-variables('data-table-sort')));
     `);
    expect(unwrap('mixin')).toBe(true);
  });
});
