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

describe('scss/components/tooltip', () => {
  test('Public API', async () => {
    const { unwrap } = await render(`
      @use 'sass:meta';
      @use '../tooltip/tooltip';
      $_: get('mixin', meta.mixin-exists('tooltip', 'tooltip'));
    `);
    expect(unwrap('mixin')).toBe(true);
  });

  test.each([false, true])(
    'only multiline IconButton tooltips override compact padding (v12: %s)',
    async (enableV12) => {
      const { result } = await render(`
        @use '../../feature-flags' with (
          $feature-flags: ('enable-v12-release': ${enableV12})
        );
        @use '../tooltip';
      `);

      const styles = {};
      postcss.parse(result.css.toString()).walkRules((rule) => {
        styles[rule.selector] ??= {};
        for (const node of rule.nodes) {
          if (node.type === 'decl') {
            styles[rule.selector][node.prop] = node.value;
          }
        }
      });

      expect(styles['.cds--icon-tooltip']['--cds-tooltip-padding-block']).toBe(
        '0.125rem'
      );
      expect(
        styles['.cds--icon-button-tooltip--multiline'][
          '--cds-tooltip-padding-block'
        ]
      ).toBe('1rem');
      expect(styles['.cds--tooltip-content'].padding).toContain(
        'var(--cds-tooltip-padding-block,'
      );
      expect(
        styles['.cds--icon-button-tooltip .cds--tooltip-content']
      ).toBeUndefined();
      expect(styles['.cds--icon-button-tooltip__label'].display).toBe('block');
    }
  );
});
