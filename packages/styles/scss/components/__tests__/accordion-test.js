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

describe('scss/components/accordion', () => {
  test('Public API', async () => {
    const { unwrap } = await render(`
      @use 'sass:map';
      @use 'sass:meta';
      @use '../accordion';

      $_: get('mixin', meta.mixin-exists('accordion', 'accordion'));
      $_: get('variables', map.keys(meta.module-variables('accordion')));
    `);
    expect(unwrap('mixin')).toBe(true);
    expect(unwrap('variables')).toMatchInlineSnapshot(`
      Array [
        "flex-direction",
        "justify-content",
        "arrow-margin",
        "title-margin",
        "content-padding",
      ]
    `);
  });

  test('configuration', async () => {
    const { unwrap } = await render(`
      @use '../accordion' with (
        $flex-direction: row,
      );
      $_: get('direction', accordion.$flex-direction);
    `);
    expect(unwrap('direction')).toBe('row');
  });
});
