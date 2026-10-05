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
const generateV12DtcgThemes = require('../../tasks/builders/generate-v12-dtcg-themes');
const generateOklchHexFallbacks = require('../../tasks/builders/generate-oklch-hex-fallbacks');
const oklchFlatten = require('../../style-dictionary/transforms/oklch-flatten');

describe('V12 theme build pipeline', () => {
  it('writes validated light and dark DTCG sources into a single themes.json', () => {
    const paths = generateV12DtcgThemes();

    expect(paths.map((filepath) => path.basename(filepath))).toEqual([
      'themes.json',
    ]);

    const themes = JSON.parse(fs.readFileSync(paths[0], 'utf8'));
    expect(themes.$extensions['org.carbon'].experimental).toBe(true);

    for (const mode of ['light', 'dark']) {
      expect(
        themes.themes[mode].$extensions['org.carbon']['color-scheme']
      ).toBe(mode);
      expect(themes.themes[mode].layer['01'].$value.colorSpace).toBe('oklch');
      expect(themes.themes[mode].layer['01'].$value.hex).toMatch(
        /^#[\da-f]{6}$/i
      );
    }
  });

  it('flattens DTCG OKLCH values for Style Dictionary outputs', () => {
    expect(
      oklchFlatten.transform({
        $type: 'color',
        $value: {
          colorSpace: 'oklch',
          components: [0.97, 0.004, 262],
          alpha: 1,
        },
      })
    ).toBe('oklch(0.97 0.004 262)');
  });

  it('generates light and dark fallback declarations', () => {
    const output = generateOklchHexFallbacks();

    expect(output).toContain('@supports not (color: oklch(0 0 0))');
    expect(output).toContain("[data-carbon-theme='light']");
    expect(output).toContain("[data-carbon-theme='dark']");
    expect(output).toContain('--cds-layer-01: #f4f5f8;');
    expect(output).toContain('--cds-layer-01: #151618;');
  });
});
