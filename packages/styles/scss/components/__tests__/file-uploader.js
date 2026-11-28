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
const sass = require('sass');
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

  describe.each([false, true])('enable-v12-release: %s', (v12) => {
    let css;

    beforeAll(async () => {
      const { result } = await render(`
        @use '../../feature-flags' with (
          $feature-flags: ('enable-v12-release': ${v12})
        );
        @use '../file-uploader';
      `);
      css = postcss.parse(result.css.toString());
    });

    test('uses the intended default size without a layout context', () => {
      const item = declarationsFor('.cds--file__selected-file');
      expect(item['--cds-layout-size-height-local']).toContain(
        `var(--cds-layout-size-height, var(--cds-layout-size-height-${v12 ? 'md' : 'lg'}))`
      );
    });

    test.each([
      ['xs', 24, 4, 24, 0, 4],
      ['sm', 32, 8, 24, 4, 8],
      ['md', 40, 8, 24, 8, 16],
      ['lg', 48, 8, 32, 8, 16],
    ])(
      'preserves the specified geometry for %s items',
      (_size, height, radius, buttonSize, buttonPadding, iconPadding) => {
        const item = declarationsFor('.cds--file__selected-file');
        const state = declarationsFor('.cds--file__state-container');
        const editState = declarationsFor(
          '.cds--file__state-container:has(.cds--file-close)'
        );
        const button = declarationsFor(
          '.cds--file__state-container .cds--file-close'
        );
        const dropContainer = declarationsFor('.cds--file__drop-container');
        const dropTrigger = declarationsFor(
          '.cds--file-browse-btn:has(> .cds--file__drop-container)'
        );

        expect(item['margin-block-end']).toBe(v12 ? '0.25rem' : '0.5rem');
        expect(
          item['border-radius'] && toPx(item['border-radius'], height)
        ).toBe(v12 ? radius : undefined);
        expect(
          dropContainer['border-radius'] &&
            toPx(dropContainer['border-radius'], height)
        ).toBe(v12 ? radius : undefined);
        expect(
          dropTrigger['border-radius'] &&
            toPx(dropTrigger['border-radius'], height)
        ).toBe(v12 ? radius : undefined);
        expect(toPx(button['block-size'], height)).toBe(v12 ? buttonSize : 24);
        expect(toPx(button['inline-size'], height)).toBe(v12 ? buttonSize : 24);
        expect(toPx(state['padding-inline-end'], height)).toBe(
          v12 ? iconPadding : 12
        );
        if (v12) {
          expect(toPx(button['border-radius'], height)).toBeGreaterThanOrEqual(
            buttonSize / 2
          );
          expect(item['column-gap']).toBe('0.5rem');
          expect(toPx(editState['padding-inline-end'], height)).toBe(
            buttonPadding
          );
        } else {
          expect(button['border-radius']).toBeUndefined();
          expect(editState).toEqual({});
        }
      }
    );

    test.each([
      ['sm', 32],
      ['md', 40],
    ])('preserves item spacing with legacy %s classes', (size, height) => {
      let legacySelector;
      css.walkRules((rule) => {
        const selector = rule.selectors.find((selector) =>
          selector.startsWith(`.cds--file__selected-file--${size}:not(`)
        );
        if (selector) {
          legacySelector = selector;
        }
      });

      expect(legacySelector).toBeDefined();
      expect(declarationsFor(legacySelector)['column-gap']).toBe(
        v12 ? undefined : '0'
      );
      const item = declarationsFor('.cds--file__selected-file', legacySelector);
      expect(toPx(item['column-gap'], height)).toBe(v12 ? 8 : 0);
      expect(item['row-gap']).toBe(
        declarationsFor('.cds--file__selected-file')['row-gap']
      );
      expect(item['--cds-layout-size-icon-gap-local'].replace(/\s/g, '')).toBe(
        v12
          ? `var(--cds-layout-size-icon-gap-${size})`
          : declarationsFor('.cds--file__selected-file')[
              '--cds-layout-size-icon-gap-local'
            ].replace(/\s/g, '')
      );
    });

    test.each([
      ['xs', 24, 8, 4],
      ['sm', 32, 8, 4],
      ['md', 40, 12, 8],
      ['lg', 48, 16, 8],
    ])(
      'preserves the error layout for %s items',
      (_size, height, bottomPadding, endPadding) => {
        const item = declarationsFor(
          '.cds--file__selected-file',
          '.cds--file__selected-file--invalid'
        );
        const error = declarationsFor(
          '.cds--file__selected-file--invalid .cds--form-requirement'
        );

        for (const part of ['title', 'supplement']) {
          const message = declarationsFor(
            `.cds--file__selected-file--invalid .cds--form-requirement__${part}`
          );
          const [, inlinePadding] = postcss.list.space(message.padding);
          expect(toPx(inlinePadding, height)).toBe(16);
          expect(
            toPx(message['padding-inline-end'] ?? inlinePadding, height)
          ).toBe(v12 ? endPadding : 16);
        }

        expect(error['border-block-start']).toBe(
          v12 ? '0' : '1px solid var(--cds-border-subtle)'
        );
        expect(item['grid-template-rows']).toBe(
          v12
            ? 'minmax(var(--cds-layout-size-height-local), auto)'
            : 'minmax(1.5rem, auto)'
        );
        if (v12) {
          expect(item['padding-block']).toBe('0');
          expect(item['row-gap']).toBe('0');
          const [top, bottom] = postcss.list.space(error['padding-block']);
          expect(toPx(top, height)).toBe(0);
          expect(toPx(bottom, height)).toBe(bottomPadding);
        }
      }
    );

    test('keeps the last item flush with the container', () => {
      expect(
        declarationsFor('.cds--file__selected-file:last-child')[
          'margin-block-end'
        ]
      ).toBe('0');
    });

    test('limits interactive backgrounds to enabled remove buttons', () => {
      const selector = '.cds--file__state-container .cds--file-close';
      expect(
        declarationsFor(`${selector}:hover:not(:disabled)`)['background-color']
      ).toBe(
        v12
          ? 'var(--cds-background-hover, rgba(141, 141, 141, 0.12))'
          : undefined
      );
      expect(
        declarationsFor(`${selector}:active:not(:disabled)`)['background-color']
      ).toBe(
        v12
          ? 'var(--cds-background-active, rgba(141, 141, 141, 0.5))'
          : undefined
      );
    });

    function declarationsFor(...selectors) {
      const declarations = {};
      css.walkRules((rule) => {
        if (rule.selectors.some((selector) => selectors.includes(selector))) {
          rule.walkDecls(({ prop, value }) => {
            declarations[prop] = value;
            if (prop === 'gap') {
              const [rowGap, columnGap = rowGap] = postcss.list.space(value);
              declarations['row-gap'] = rowGap;
              declarations['column-gap'] = columnGap;
            }
          });
        }
      });
      return declarations;
    }
  });
});

function toPx(value, height) {
  const expression = value.replaceAll(
    'var(--cds-layout-size-height-local)',
    `${height / 16}rem`
  );
  const { css } = sass.compileString(`.value { value: ${expression}; }`);
  const resolved = postcss.parse(css).first.first.value;
  return parseFloat(resolved) * (resolved.endsWith('rem') ? 16 : 1);
}
