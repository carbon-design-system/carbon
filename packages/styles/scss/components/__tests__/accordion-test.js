/**
 * Copyright IBM Corp. 2018, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const { SassRenderer } = require('@carbon/test-utils/scss');
const css = require('css');

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
      [
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

  test('hover styles are only applied on devices that support hover', async () => {
    const { result } = await render(`
      @use '../accordion';
    `);
    const { stylesheet } = css.parse(
      removeAtRule(result.css.toString(), '@starting-style')
    );

    function getAccordionHoverSelectors(rules, media = []) {
      return rules.flatMap((rule) => {
        if (rule.type === 'media') {
          return getAccordionHoverSelectors(rule.rules, [...media, rule.media]);
        }

        if (rule.type !== 'rule') {
          return [];
        }

        return rule.selectors
          .filter((selector) => {
            return (
              selector.includes('.cds--accordion') &&
              selector.includes(':hover')
            );
          })
          .map((selector) => {
            return { media, selector };
          });
      });
    }

    const hoverSelectors = getAccordionHoverSelectors(stylesheet.rules);

    expect(hoverSelectors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          media: expect.arrayContaining([
            expect.stringContaining('(any-hover: hover)'),
          ]),
          selector: expect.stringContaining('.cds--accordion__heading:hover'),
        }),
      ])
    );
    expect(
      hoverSelectors.every(({ media }) => {
        return media.some((query) => query.includes('(any-hover: hover)'));
      })
    ).toBe(true);
  });
});

function removeAtRule(cssText, atRule) {
  const start = cssText.indexOf(atRule);

  if (start === -1) {
    return cssText;
  }

  const blockStart = cssText.indexOf('{', start);
  let blockEnd = blockStart;
  let depth = 0;

  for (let i = blockStart; i < cssText.length; i++) {
    if (cssText[i] === '{') {
      depth++;
    }

    if (cssText[i] === '}') {
      depth--;
    }

    if (depth === 0) {
      blockEnd = i + 1;
      break;
    }
  }

  return `${cssText.slice(0, start)}${cssText.slice(blockEnd)}`;
}
