/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const postcss = require('postcss');
const { SassRenderer } = require('@carbon/test-utils/scss');

const { render } = SassRenderer.create(__dirname);

describe('scss/components/file-uploader', () => {
  test('Public API', async () => {
    const { unwrap } = await render(`
      @use 'sass:map';
      @use 'sass:meta';
      @use '../file-uploader';

      $_: get('mixin', meta.mixin-exists('file-uploader', 'file-uploader'));
    `);
    expect(unwrap('mixin')).toBe(true);
  });

  test('disabled drop containers use disabled cursor', async () => {
    const { result } = await render(`
      @use '../file-uploader';
    `);
    const disabledDropContainerRules = [];

    postcss.parse(result.css.toString()).walkRules((rule) => {
      if (
        rule.selector.includes('--file-browse-btn--disabled') &&
        rule.selector.includes('--file__drop-container')
      ) {
        disabledDropContainerRules.push(rule);
      }
    });

    expect(disabledDropContainerRules).toHaveLength(1);
    expect(disabledDropContainerRules[0].selector).toContain(
      '--file-browse-btn--disabled.cds--file__drop-container'
    );
    expect(disabledDropContainerRules[0].selector).toContain(
      '--file-browse-btn--disabled .cds--file__drop-container'
    );
    expect(
      disabledDropContainerRules[0].nodes.some(
        (node) => node.prop === 'cursor' && node.value === 'no-drop'
      )
    ).toBe(true);
  });
});
