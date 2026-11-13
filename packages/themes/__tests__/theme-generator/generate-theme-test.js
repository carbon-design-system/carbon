/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

import { generateV12Tokens } from '../../src/theme-generator/generate-tokens';
import { generateTheme } from '../../src/theme-generator/generate-theme';
import { defaultSpecification } from '../../src/theme-generator/specification';
import { validateTheme } from '../../src/theme-generator/validate-theme';

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
      expect(validateTheme(theme)).toMatchObject({ valid: true, issues: [] });
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
    expect(theme.iconPrimary.status).toBe('confirmed');
    expect(theme.accents.surface.source).toEqual({
      type: 'lightness-delta',
      delta: -0.08,
      relativeTo: 'surface',
    });
    expect(theme.placeholderText.surface).toMatchObject({
      status: 'confirmed',
      source: {
        type: 'shared-contrast',
        target: 4.5,
        relativeTo: 'field',
        contexts,
      },
    });
    expect(theme.helperIcons.surface.source).toEqual({
      type: 'alias',
      token: 'text-helper',
    });
    expect(theme.skeletons.surface).toMatchObject({
      status: 'confirmed',
      color: { lightness: 0.14 },
    });
    expect(theme.supportError).toMatchObject({
      status: 'confirmed',
      source: { type: 'fixed' },
      fallback: '#fa4d56',
    });
    expect(theme.supportSuccess).toMatchObject({
      status: 'confirmed',
      source: { type: 'fixed' },
      fallback: '#42be65',
    });
  });

  it('generates deterministic OKLCH and hex output', () => {
    expect(generateTheme('light')).toEqual(generateTheme('light'));
    expect(generateTheme('light').surfaces.surface).toMatchObject({
      oklch: 'oklch(0.97 0.004 262)',
      fallback: '#f4f5f8',
    });
  });

  it('generates one token file per theme with flat token names', () => {
    const files = generateV12Tokens();

    for (const mode of ['light', 'dark']) {
      expect(files[mode].$extensions['com.ibm.carbon']).toEqual({
        experimental: true,
        'color-scheme': mode,
      });
    }

    expect(files.light['layer-01']).toMatchObject({
      $type: 'color',
      $value: {
        colorSpace: 'oklch',
        components: [0.97, 0.004, 262],
        hex: '#f4f5f8',
      },
      $extensions: {
        'com.ibm.carbon': {
          status: 'confirmed',
          source: { type: 'fixed' },
        },
      },
    });
    expect(files.light['layer-01'].$value).not.toHaveProperty('alpha');
    expect(files.light['state-disabled'].$value.alpha).toBe(0.25);
    for (const mode of ['light', 'dark']) {
      expect(files[mode]['text-disabled'].$value.alpha).toBe(0.25);
      expect(files[mode]['icon-disabled'].$value.alpha).toBe(0.25);
      expect(files[mode]['text-disabled'].$value.components[1]).toBe(0.004);
      expect(files[mode]['border-interactive']).toBeDefined();
    }
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

  describe('Input validation and normalization', () => {
    it('rejects unknown override keys', () => {
      expect(() =>
        generateTheme('light', {
          // @ts-expect-error test invalid override
          unknownTopLevel: 123,
        })
      ).toThrow(/Unknown override key "unknownTopLevel"/);

      expect(() =>
        generateTheme('light', {
          neutral: {
            hue: 200,
            // @ts-expect-error test invalid override
            invalidKey: 'test',
          },
        })
      ).toThrow(/Unknown override key "invalidKey"/);

      expect(() =>
        generateTheme('light', {
          light: {
            // @ts-expect-error test invalid override
            invalidModeField: true,
          },
        })
      ).toThrow(/Unknown override key "invalidModeField"/);
    });

    it('rejects NaN and Infinity values', () => {
      expect(() =>
        generateTheme('light', {
          neutral: { hue: NaN, chroma: 0.004 },
        })
      ).toThrow(/Invalid numeric value \(NaN\)/);

      expect(() =>
        generateTheme('light', {
          neutral: { hue: 200, chroma: Infinity },
        })
      ).toThrow(/Invalid numeric value \(Infinity\)/);
    });

    it('rejects negative chroma', () => {
      expect(() =>
        generateTheme('light', {
          neutral: { hue: 200, chroma: -0.01 },
        })
      ).toThrow(/Chroma must be non-negative/);

      expect(() =>
        generateTheme('light', {
          brand: {
            ...defaultSpecification.brand,
            chroma: -0.1,
          },
        })
      ).toThrow(/Chroma must be non-negative/);
    });

    it('rejects accent floor above surface', () => {
      expect(() =>
        generateTheme('light', {
          light: {
            ...defaultSpecification.light,
            accentDelta: 0.05, // positive delta means lighter than surface in light mode
          },
        })
      ).toThrow(/Accent delta must not be positive/);
    });

    it('rejects a non-delta spec for a state that drives per-parent tokens', () => {
      expect(() =>
        generateTheme('light', {
          light: {
            interactive: {
              hover: {
                type: 'opacity',
                status: 'experimental',
                chroma: 0.004,
                alpha: 0.5,
              },
            },
          },
        })
      ).toThrow(/interactive\.hover must be of type "lightness-delta"/);
    });

    it('derives field-hover from the same field tokens it exposes', () => {
      const theme = generateTheme('dark');

      for (const context of contexts) {
        expect(theme.fieldHover[context].source).toMatchObject({
          type: 'interactive-state',
          state: 'hover',
        });
        expect(theme.fieldHover[context].color.lightness).toBeCloseTo(
          theme.fields[context].color.lightness +
            defaultSpecification.dark.interactive.hover.delta,
          10
        );
      }
    });

    it('normalizes hue to [0, 360) everywhere including DTCG components', () => {
      const theme = generateTheme('light', {
        neutral: { hue: 390, chroma: 0.004 }, // 390 % 360 = 30
      });

      expect(theme.surfaces.surface.color.hue).toBe(30);

      const negTheme = generateTheme('light', {
        neutral: { hue: -45, chroma: 0.004 }, // -45 -> 315
      });
      expect(negTheme.surfaces.surface.color.hue).toBe(315);

      const files = generateV12Tokens();
      // DTCG components array format: [lightness, chroma, hue]
      expect(
        files.light['layer-01'].$value.components[2]
      ).toBeGreaterThanOrEqual(0);
      expect(files.light['layer-01'].$value.components[2]).toBeLessThan(360);
    });

    it('rounds contrast-solved lightness to 4 decimals and preserves contrast targets', () => {
      const theme = generateTheme('light', {
        contrastTargets: {
          helperText: 5.0,
          strongBorder: 3.5,
        },
      });

      for (const context of contexts) {
        const helperLightness = theme.helperText[context].color.lightness;
        const helperDecimals = helperLightness.toString().split('.')[1] || '';
        expect(helperDecimals.length).toBeLessThanOrEqual(4);
        expect(theme.helperText[context].contrast).toBeGreaterThanOrEqual(5.0);

        const borderLightness = theme.strongBorders[context].color.lightness;
        const borderDecimals = borderLightness.toString().split('.')[1] || '';
        expect(borderDecimals.length).toBeLessThanOrEqual(4);
        expect(theme.strongBorders[context].contrast).toBeGreaterThanOrEqual(
          3.5
        );
      }

      // Validator reads configured contrastTargets from theme
      expect(validateTheme(theme)).toMatchObject({ valid: true, issues: [] });
    });
  });
});
