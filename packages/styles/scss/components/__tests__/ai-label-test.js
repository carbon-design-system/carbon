/**
 * Copyright IBM Corp. 2026
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

describe('scss/components/ai-label', () => {
  test('guards shared AI Label and Slug hover selectors with any-hover media query', async () => {
    const { result } = await render(`
      @use '../ai-label';
    `);
    const guardedHoverRules = [];
    const unguardedHoverRules = [];

    postcss.parse(result.css.toString()).walkRules((rule) => {
      if (
        (rule.selector.includes('.cds--ai-label') ||
          rule.selector.includes('.cds--slug')) &&
        rule.selector.includes(':hover')
      ) {
        let parent = rule.parent;
        let isGuarded = false;

        while (parent) {
          if (
            parent.type === 'atrule' &&
            parent.name === 'media' &&
            parent.params.includes('(any-hover: hover)')
          ) {
            isGuarded = true;
            break;
          }

          parent = parent.parent;
        }

        if (isGuarded) {
          guardedHoverRules.push(rule);
        } else {
          unguardedHoverRules.push(rule);
        }
      }
    });

    expect(guardedHoverRules.length).toBeGreaterThan(0);
    expect(unguardedHoverRules.map((rule) => rule.selector)).toEqual([]);
  });
});
