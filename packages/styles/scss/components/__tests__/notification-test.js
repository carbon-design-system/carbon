/**
 * Copyright IBM Corp. 2018, 2026
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

describe('scss/components/notification', () => {
  test('Public API', async () => {
    const { unwrap } = await render(`
      @use 'sass:map';
      @use 'sass:meta';
      @use '../notification';

      $_: get('mixins', (
        toast-notification: meta.mixin-exists('toast-notification', 'notification'),
        inline-notification: meta.mixin-exists('inline-notification', 'notification'),
      ));

      $_: get('tokens', map.keys(meta.module-variables('notification')));
    `);

    expect(unwrap('mixins')).toEqual({
      'toast-notification': true,
      'inline-notification': true,
    });
    expect(unwrap('tokens')).toEqual([
      'notification-background-error',
      'notification-background-success',
      'notification-background-info',
      'notification-background-warning',
      'notification-action-hover',
      'notification-action-tertiary-inverse',
      'notification-action-tertiary-inverse-active',
      'notification-action-tertiary-inverse-hover',
      'notification-action-tertiary-inverse-text',
      'notification-action-tertiary-inverse-text-on-color-disabled',
      'notification-tokens',
    ]);
  });

  test('button hover styles are only applied on devices that support hover', async () => {
    const { result } = await render(`
      @use '../notification';
    `);
    const hoverRules = [];

    postcss.parse(result.css.toString()).walkRules((rule) => {
      if (
        rule.selector.includes('-notification__action-button') &&
        rule.selector.includes(':hover')
      ) {
        hoverRules.push(rule);
      }
    });

    expect(hoverRules.length).toBeGreaterThan(0);
    expect(
      hoverRules
        .filter((rule) => {
          let parent = rule.parent;

          while (parent) {
            if (
              parent.type === 'atrule' &&
              parent.name === 'media' &&
              parent.params.includes('(any-hover: hover)')
            ) {
              return false;
            }

            parent = parent.parent;
          }

          return true;
        })
        .map((rule) => rule.selector)
    ).toEqual([]);
  });
});
