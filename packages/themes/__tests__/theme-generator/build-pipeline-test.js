/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const fs = require('fs');
const path = require('path');
const generateColorFallbacks = require('../../tasks/builders/generate-color-fallbacks');
const colorFlatten = require('../../style-dictionary/transforms/color-flatten');
const {
  generateV12Tokens,
} = require('../../src/theme-generator/generate-tokens');

describe('V12 theme build pipeline', () => {
  it.each(['light', 'dark'])(
    'keeps the %s token file in sync with the OKLCH specification',
    (mode) => {
      const file = path.resolve(
        __dirname,
        `../../tokens/next/themes/${mode}/theme.tokens.json`
      );

      // Out of sync? Run `yarn generate:v12` in `packages/themes`
      expect(fs.readFileSync(file, 'utf8')).toBe(
        JSON.stringify(generateV12Tokens()[mode], null, 2) + '\n'
      );
    }
  );

  it('flattens DTCG OKLCH values for Style Dictionary outputs', () => {
    expect(
      colorFlatten.transform({
        $type: 'color',
        $value: {
          colorSpace: 'oklch',
          components: [0.97, 0.004, 262],
          alpha: 1,
        },
      })
    ).toBe('oklch(0.97 0.004 262)');
  });

  it('generates light and dark fallback declarations including interactive states', () => {
    const output = generateColorFallbacks();

    expect(output).toContain('@supports not (color: oklch(0 0 0))');
    expect(output).toContain("[data-carbon-theme='light']");
    expect(output).toContain("[data-carbon-theme='dark']");
    expect(output).toContain('--cds-layer-01: #f4f5f8;');
    expect(output).toContain('--cds-layer-01: #151618;');
    expect(output).toContain('--cds-state-hover:');
    expect(output).toContain('--cds-state-active:');
    expect(output).toContain('--cds-state-selected:');
    // The disabled state carries alpha=0.25.  The fallback must be rgba() to
    // preserve the opacity in browsers without OKLCH support — a bare hex value
    // would silently discard the alpha and render as a fully opaque surface color.
    expect(output).toContain(
      '--cds-state-disabled: rgba(244, 245, 248, 0.25);'
    );
    expect(output).toContain('--cds-state-disabled: rgba(21, 22, 24, 0.25);');
  });
});
