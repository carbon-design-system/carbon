/**
 * Copyright IBM Corp. 2018, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const css = require('css');
const { SassRenderer } = require('@carbon/test-utils/scss');

const { render } = SassRenderer.create(__dirname);

describe('scss/components/tag', () => {
  test('Public API', async () => {
    const { unwrap } = await render(`
      @use 'sass:meta';
      @use '../tag/tag';
      $_: get('mixin', meta.mixin-exists('tag', 'tag'));
    `);
    expect(unwrap('mixin')).toBe(true);
  });

  test('hover styles are only applied on devices that support hover', async () => {
    const { result } = await render(`
      @use '../tag';
    `);
    const stylesheet = css.parse(result.css.toString()).stylesheet;
    const hoverRules = [];

    function collectTagHoverRules(rules, media = []) {
      for (const rule of rules) {
        if (rule.type === 'media') {
          collectTagHoverRules(rule.rules, [...media, rule.media]);
        }

        if (
          rule.type === 'rule' &&
          rule.selectors.some(
            (selector) =>
              selector.includes('.cds--tag') && selector.includes(':hover')
          )
        ) {
          hoverRules.push({ media, selectors: rule.selectors });
        }
      }
    }

    collectTagHoverRules(stylesheet.rules);

    const interactiveHoverRules = hoverRules
      .map(({ media, selectors }) => ({
        media,
        // Skeleton tags have pointer-events disabled and inherit this reset
        // from the shared skeleton utility.
        selectors: selectors.filter(
          (selector) => !selector.includes('.cds--skeleton:hover')
        ),
      }))
      .filter(({ selectors }) => selectors.length > 0);

    expect(interactiveHoverRules.length).toBeGreaterThan(0);
    expect(
      interactiveHoverRules.some(({ selectors }) =>
        selectors.some((selector) =>
          selector.includes('.cds--tag--selectable:hover')
        )
      )
    ).toBe(true);
    expect(
      interactiveHoverRules
        .filter(
          ({ media }) =>
            !media.some((query) => query.includes('(any-hover: hover)'))
        )
        .flatMap(({ selectors }) => selectors)
        .filter(
          (selector) =>
            selector.includes('.cds--tag') && selector.includes(':hover')
        )
    ).toEqual([]);
  });
});
