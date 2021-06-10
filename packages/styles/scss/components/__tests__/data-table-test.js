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
 
       $_: get('mixin', meta.mixin-exists('data-table', 'data-table'));
       $_: get('variables', map.keys(meta.module-variables('data-table')));
     `);
    expect(unwrap('mixin')).toBe(true);
    expect(unwrap('variables')).toMatchInlineSnapshot(`
      Array [
        "data-table-heading-transform",
        "data-table-heading-border-bottom",
        "data-table-row-height",
        "data-table-zebra-color",
        "data-table-column-hover",
      ]
    `);
  });
});

describe('scss/components/data-table-action', () => {
  test('Public API', async () => {
    const { unwrap } = await render(`
         @use 'sass:map';
         @use 'sass:meta';
         @use '../data-table/action';
   
         $_: get('mixin', meta.mixin-exists('data-table-action', 'data-table-action'));
       `);
    expect(unwrap('mixin')).toBe(true);
  });
});
