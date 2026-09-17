/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

import { generateV12DtcgThemes } from '../../src/oklch/generate-dtcg';
import { generateTheme } from '../../src/oklch/generate-theme';
import { defaultSpecification } from '../../src/oklch/specification';
import { validateTheme } from '../../src/oklch/validate-theme';

const contexts = ['surface', 'surface-light', 'surface-dark'];

describe('V12 OKLCH theme generation', () => {
  it.each([
    ['light', [0.97, 1, 0.94], [0.94, 0.97, 0.91], [0.88, 0.91, 0.85]],
    ['dark', [0.2, 0.24, 0.16], [0.16, 0.2, 0.12], [0.32, 0.36, 0.28]],
  ])(
    'generates configured %s surface, field, and subtle border steps',
    (mode, surfaces, fields, subtleBorders) => {
      const theme = generateTheme(mode);
      expect(
        contexts.map((context) => theme.surfaces[context].color.lightness)
      ).toEqual(surfaces);
      expect(
        contexts.map((context) => theme.fields[context].color.lightness)
      ).toEqual(fields);
      expect(
        contexts.map((context) => theme.subtleBorders[context].color.lightness)
      ).toEqual(subtleBorders);
    }
  );

  it.each(['light', 'dark'])(
    'meets contrast requirements in the %s theme',
    (mode) => {
      const theme = generateTheme(mode);

      for (const context of contexts) {
        expect(theme.helperText[context].contrast).toBeGreaterThanOrEqual(4.5);
        expect(theme.strongBorders[context].contrast).toBeGreaterThanOrEqual(3);
      }
      expect(validateTheme(theme)).toEqual({ valid: true, issues: [] });
    }
  );

  it('generates seed, unresolved, alias, and experimental token metadata', () => {
    const theme = generateTheme('dark');

    expect(theme.brand).toMatchObject({
      name: 'brand',
      status: 'confirmed',
      source: { type: 'fixed' },
      fallback: '#0f62fe',
    });
    expect(theme.iconPrimary.status).toBe('unresolved');
    expect(theme.accents.surface.source).toEqual({
      type: 'lightness-delta',
      delta: -0.08,
      relativeTo: 'surface',
    });
    expect(theme.placeholderText.surface).toMatchObject({
      status: 'unresolved',
      source: { type: 'alias', token: 'text-helper' },
      color: theme.helperText.surface.color,
    });
    expect(theme.skeletons.surface).toMatchObject({
      status: 'experimental',
      color: { lightness: 0.14 },
    });
  });

  it('generates deterministic OKLCH and hex output', () => {
    expect(generateTheme('light')).toEqual(generateTheme('light'));
    expect(generateTheme('light').surfaces.surface).toMatchObject({
      oklch: 'oklch(0.97 0.004 262)',
      fallback: '#f4f5f8',
    });
  });

  it('generates DTCG-compatible V12 themes in a unified structure', () => {
    const themes = generateV12DtcgThemes();

    expect(themes.$extensions['org.carbon'].experimental).toBe(true);

    for (const mode of ['light', 'dark']) {
      expect(
        themes.themes[mode].$extensions['org.carbon']['color-scheme']
      ).toBe(mode);
    }

    expect(themes.themes.light.layer['01']).toMatchObject({
      $type: 'color',
      $value: {
        colorSpace: 'oklch',
        components: [0.97, 0.004, 262],
        alpha: 1,
        hex: '#f4f5f8',
      },
      $extensions: {
        'org.carbon': {
          status: 'confirmed',
          source: { type: 'fixed' },
          fallback: '#f4f5f8',
        },
      },
    });
  });

  it('supports configuration overrides without mutating defaults', () => {
    const defaultTheme = generateTheme('light');
    const customTheme = generateTheme('light', {
      neutral: { hue: 30, chroma: 0.01 },
      light: {
        ...defaultSpecification.light,
        surfaceLightness: 0.9,
        surfaceStep: 0.05,
        fieldDelta: -0.04,
        subtleBorderDelta: -0.1,
      },
    });

    expect(customTheme.surfaces.surface.color).toEqual({
      lightness: 0.9,
      chroma: 0.01,
      hue: 30,
    });
    expect(defaultTheme.surfaces.surface.color).toEqual({
      lightness: 0.97,
      chroma: 0.004,
      hue: 262,
    });
  });
});
