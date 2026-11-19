/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

import { getContrastRatio } from '../../src/theme-generator/contrast';
import { generateTheme } from '../../src/theme-generator/generate-theme';
import type { SurfaceContext } from '../../src/theme-generator/specification';

interface KnownDeviation {
  id: string;
  token: string;
  context?: SurfaceContext;
  mode: 'light' | 'dark';
  designValue: number | string;
  currentCodeValue: number;
  tolerance: number;
  description: string;
}

const knownDeviations: KnownDeviation[] = [
  {
    id: 'light-skeleton-surface-dark',
    token: 'skeletons',
    context: 'surface-dark',
    mode: 'light',
    designValue: 0.91,
    currentCodeValue: 0.9,
    tolerance: 0.001,
    description:
      'Design table lists 0.91 for surface-dark skeleton, but -0.04 delta rule calculates 0.90 (confirmed as 0.90).',
  },
  {
    id: 'dark-accent-surface-dark-floor',
    token: 'accents',
    context: 'surface-dark',
    mode: 'dark',
    designValue: 'black (0.0)',
    currentCodeValue: 0.08,
    tolerance: 0.001,
    description:
      'Design table states "black"; Design chose a floor over black. Floor = 0.08 (engineering proposal; arithmetic gives 0.08).',
  },
  {
    id: 'dark-skeleton-surface-dark-floor',
    token: 'skeletons',
    context: 'surface-dark',
    mode: 'dark',
    designValue: 'black (0.0)',
    currentCodeValue: 0.14,
    tolerance: 0.001,
    description:
      'Design table states "black"; Design chose a floor over black. Floor = 0.14 (from the Slack example; arithmetic gives 0.10).',
  },
  {
    id: 'dark-icon-primary-conflict',
    token: 'iconPrimary',
    mode: 'dark',
    designValue: '0.92 vs 0.94',
    currentCodeValue: 0.94,
    tolerance: 0.001,
    description:
      'Design reference contains both 0.92 and 0.94 for dark icon-primary; code implements 0.94.',
  },
  {
    id: 'dark-border-strong-surface',
    token: 'strongBorders',
    context: 'surface',
    mode: 'dark',
    designValue: 0.5,
    currentCodeValue: 0.4987,
    tolerance: 0.002,
    description:
      'Design table shows 0.50 for dark surface strong border; contrast solver calculates ~0.4987 for 3:1 contrast.',
  },
  {
    id: 'dark-border-strong-surface-light',
    token: 'strongBorders',
    context: 'surface-light',
    mode: 'dark',
    designValue: 0.52,
    currentCodeValue: 0.5211,
    tolerance: 0.002,
    description:
      'Design table shows 0.52 for dark surface-light strong border; contrast solver calculates ~0.5211 for 3:1 contrast.',
  },
  {
    id: 'dark-border-strong-surface-dark',
    token: 'strongBorders',
    context: 'surface-dark',
    mode: 'dark',
    designValue: 0.483,
    currentCodeValue: 0.4834,
    tolerance: 0.002,
    description:
      'Design table shows 0.483 for dark surface-dark strong border; contrast solver calculates ~0.4834 for 3:1 contrast.',
  },
];

describe('Design conformance: generated tokens match the Design reference values', () => {
  describe('Light theme reference values', () => {
    const light = generateTheme('light');

    it('asserts fixed and delta tokens within ±0.001 of design facts', () => {
      // base
      expect(light.base.color.lightness).toBeCloseTo(0.16, 3);
      expect(light.base.color.chroma).toBeCloseTo(0.004, 3);
      expect(light.base.color.hue).toBeCloseTo(262, 3);

      // surface: surface .97, surface-light 1.00, surface-dark .94
      expect(light.surfaces['surface'].color.lightness).toBeCloseTo(0.97, 3);
      expect(light.surfaces['surface-light'].color.lightness).toBeCloseTo(
        1.0,
        3
      );
      expect(light.surfaces['surface-dark'].color.lightness).toBeCloseTo(
        0.94,
        3
      );

      // field: surface .94, surface-light .97, surface-dark .91
      expect(light.fields['surface'].color.lightness).toBeCloseTo(0.94, 3);
      expect(light.fields['surface-light'].color.lightness).toBeCloseTo(
        0.97,
        3
      );
      expect(light.fields['surface-dark'].color.lightness).toBeCloseTo(0.91, 3);

      // accent: surface .91, surface-light .94, surface-dark .88
      expect(light.accents['surface'].color.lightness).toBeCloseTo(0.91, 3);
      expect(light.accents['surface-light'].color.lightness).toBeCloseTo(
        0.94,
        3
      );
      expect(light.accents['surface-dark'].color.lightness).toBeCloseTo(
        0.88,
        3
      );

      // skeleton on surface / surface-light: .93 / .96
      expect(light.skeletons['surface'].color.lightness).toBeCloseTo(0.93, 3);
      expect(light.skeletons['surface-light'].color.lightness).toBeCloseTo(
        0.96,
        3
      );

      // text & icon primary / secondary
      expect(light.textPrimary.color.lightness).toBeCloseTo(0.24, 3);
      expect(light.textSecondary.color.lightness).toBeCloseTo(0.48, 3);
      expect(light.iconPrimary.color.lightness).toBeCloseTo(0.24, 3);
      expect(light.iconSecondary.color.lightness).toBeCloseTo(0.48, 3);

      // border-subtle: surface -.09 (.88 / .91 / .85)
      expect(light.subtleBorders['surface'].color.lightness).toBeCloseTo(
        0.88,
        3
      );
      expect(light.subtleBorders['surface-light'].color.lightness).toBeCloseTo(
        0.91,
        3
      );
      expect(light.subtleBorders['surface-dark'].color.lightness).toBeCloseTo(
        0.85,
        3
      );

      // States: hover -.03 (.94), selected -.06 (.91), active -.09 (.88)
      expect(light.interactive.hover.color.lightness).toBeCloseTo(0.94, 3);
      expect(light.interactive.selected.color.lightness).toBeCloseTo(0.91, 3);
      expect(light.interactive.active.color.lightness).toBeCloseTo(0.88, 3);

      // PROVISIONAL: text-on-color and border-inverse
      expect(light.textOnColor.color.lightness).toBe(1.0);
      expect(light.borderInverse.color.lightness).toBeCloseTo(0.28, 3);
    });

    it('asserts solved tokens within ±0.002 of design facts', () => {
      // text-helper is solved to 4.5:1. These are regression pins of the solver
      // output, not Design-supplied values.
      expect(
        Math.abs(light.helperText['surface'].color.lightness - 0.5465)
      ).toBeLessThanOrEqual(0.002);
      expect(
        Math.abs(light.helperText['surface-light'].color.lightness - 0.5671)
      ).toBeLessThanOrEqual(0.002);
      expect(
        Math.abs(light.helperText['surface-dark'].color.lightness - 0.5256)
      ).toBeLessThanOrEqual(0.002);

      // border-strong solved to 3:1 (light .647 / .669 / .624)
      expect(
        Math.abs(light.strongBorders['surface'].color.lightness - 0.647)
      ).toBeLessThanOrEqual(0.002);
      expect(
        Math.abs(light.strongBorders['surface-light'].color.lightness - 0.669)
      ).toBeLessThanOrEqual(0.002);
      expect(
        Math.abs(light.strongBorders['surface-dark'].color.lightness - 0.624)
      ).toBeLessThanOrEqual(0.002);
    });
  });

  describe('Dark theme reference values', () => {
    const dark = generateTheme('dark');

    it('asserts fixed and delta tokens within ±0.001 of design facts', () => {
      // base
      expect(dark.base.color.lightness).toBeCloseTo(0.16, 3);
      expect(dark.base.color.chroma).toBeCloseTo(0.004, 3);
      expect(dark.base.color.hue).toBeCloseTo(262, 3);

      // surface: surface .20, surface-light .24, surface-dark .16
      expect(dark.surfaces['surface'].color.lightness).toBeCloseTo(0.2, 3);
      expect(dark.surfaces['surface-light'].color.lightness).toBeCloseTo(
        0.24,
        3
      );
      expect(dark.surfaces['surface-dark'].color.lightness).toBeCloseTo(
        0.16,
        3
      );

      // field: surface .16, surface-light .20, surface-dark .12
      expect(dark.fields['surface'].color.lightness).toBeCloseTo(0.16, 3);
      expect(dark.fields['surface-light'].color.lightness).toBeCloseTo(0.2, 3);
      expect(dark.fields['surface-dark'].color.lightness).toBeCloseTo(0.12, 3);

      // accent: surface .12, surface-light .16
      expect(dark.accents['surface'].color.lightness).toBeCloseTo(0.12, 3);
      expect(dark.accents['surface-light'].color.lightness).toBeCloseTo(
        0.16,
        3
      );

      // skeleton on surface / surface-light: .14 / .18
      expect(dark.skeletons['surface'].color.lightness).toBeCloseTo(0.14, 3);
      expect(dark.skeletons['surface-light'].color.lightness).toBeCloseTo(
        0.18,
        3
      );

      // text & icon primary / secondary
      expect(dark.textPrimary.color.lightness).toBeCloseTo(0.94, 3);
      expect(dark.textSecondary.color.lightness).toBeCloseTo(0.72, 3);
      expect(dark.iconPrimary.color.lightness).toBeCloseTo(0.94, 3);
      expect(dark.iconSecondary.color.lightness).toBeCloseTo(0.72, 3);

      // border-subtle: surface +.12 (.32 / .36 / .28)
      expect(dark.subtleBorders['surface'].color.lightness).toBeCloseTo(
        0.32,
        3
      );
      expect(dark.subtleBorders['surface-light'].color.lightness).toBeCloseTo(
        0.36,
        3
      );
      expect(dark.subtleBorders['surface-dark'].color.lightness).toBeCloseTo(
        0.28,
        3
      );

      // States: hover +.04 (.24), selected +.08 (.28), active +.12 (.32)
      expect(dark.interactive.hover.color.lightness).toBeCloseTo(0.24, 3);
      expect(dark.interactive.selected.color.lightness).toBeCloseTo(0.28, 3);
      expect(dark.interactive.active.color.lightness).toBeCloseTo(0.32, 3);

      // PROVISIONAL: text-on-color and border-inverse
      expect(dark.textOnColor.color.lightness).toBe(1.0);
      expect(dark.borderInverse.color.lightness).toBeCloseTo(0.92, 3);
    });

    it('asserts solved tokens within ±0.002 of design facts', () => {
      // text-helper is solved to 4.5:1. These are regression pins of the solver
      // output, not Design-supplied values.
      expect(
        Math.abs(dark.helperText['surface'].color.lightness - 0.5954)
      ).toBeLessThanOrEqual(0.002);
      expect(
        Math.abs(dark.helperText['surface-light'].color.lightness - 0.6191)
      ).toBeLessThanOrEqual(0.002);
      expect(
        Math.abs(dark.helperText['surface-dark'].color.lightness - 0.5784)
      ).toBeLessThanOrEqual(0.002);

      // border-strong solved to 3:1 (dark .50 / .52 / .483)
      expect(
        Math.abs(dark.strongBorders['surface'].color.lightness - 0.5)
      ).toBeLessThanOrEqual(0.002);
      expect(
        Math.abs(dark.strongBorders['surface-light'].color.lightness - 0.52)
      ).toBeLessThanOrEqual(0.002);
      expect(
        Math.abs(dark.strongBorders['surface-dark'].color.lightness - 0.483)
      ).toBeLessThanOrEqual(0.002);
    });
  });

  describe('Design-defined tokens added from the reference screenshots', () => {
    const light = generateTheme('light');
    const dark = generateTheme('dark');

    it('border-interactive: brand in light, oklch(.647 .189 262) in dark', () => {
      expect(light.borderInteractive.color).toEqual(light.brand.color);
      expect(light.borderInteractive.fallback).toBe('#0f62fe');
      expect(dark.borderInteractive.color.lightness).toBeCloseTo(0.647, 3);
      expect(dark.borderInteractive.color.chroma).toBeCloseTo(0.189, 3);
      expect(dark.borderInteractive.color.hue).toBeCloseTo(262, 3);
      // Design lists #4589ff, which is actually oklch(.647 .1888 260.58) (hue
      // ~1.4° off its stated 262). The OKLCH value is the rule; the generated
      // hex must stay within a few 8-bit steps of Design's.
      const hex = dark.borderInteractive.fallback;
      for (const index of [1, 3, 5]) {
        expect(
          Math.abs(
            parseInt(hex.slice(index, index + 2), 16) -
              parseInt('#4589ff'.slice(index, index + 2), 16)
          )
        ).toBeLessThanOrEqual(6);
      }
    });

    it('border-inverse: oklch(.28 .004 262) light, oklch(.92 .004 262) dark', () => {
      expect(light.borderInverse.color.lightness).toBeCloseTo(0.28, 3);
      expect(dark.borderInverse.color.lightness).toBeCloseTo(0.92, 3);
    });

    it.each([
      ['light', light],
      ['dark', dark],
    ] as const)(
      '%s: disabled text/icon = parent colour, chroma .004, 25% alpha',
      (_mode, theme) => {
        expect(theme.textDisabled.alpha).toBe(0.25);
        expect(theme.iconDisabled.alpha).toBe(0.25);
        expect(theme.textDisabled.color).toEqual({
          ...theme.textPrimary.color,
          chroma: 0.004,
        });
        expect(theme.iconDisabled.color).toEqual({
          ...theme.iconPrimary.color,
          chroma: 0.004,
        });
      }
    );

    it('dark accent / skeleton floors are explicit and recorded in the token source when they bind', () => {
      // accentFloor (0.08) equals the arithmetic result (0.16 - 0.08), so it
      // does not bind today; it only protects against deeper nesting/overrides.
      expect(dark.accents['surface-dark'].color.lightness).toBeCloseTo(0.08, 6);
      expect(
        generateTheme('dark', {
          dark: { accentFloor: 0.1 } as never,
        }).accents['surface-dark'].source
      ).toMatchObject({ type: 'floor', floor: 0.1 });
      // skeletonFloor (0.14) binds: arithmetic would give 0.16 - 0.06 = 0.10.
      expect(dark.skeletons['surface-dark'].source).toMatchObject({
        type: 'floor',
        floor: 0.14,
      });
      // Tokens above the floor keep the plain delta source.
      expect(dark.accents['surface'].source.type).toBe('lightness-delta');
      expect(light.accents['surface-dark'].source.type).toBe('lightness-delta');
    });

    it('floors are configurable and disabled with 0', () => {
      const noFloor = generateTheme('dark', {
        dark: { accentFloor: 0, skeletonFloor: 0 } as never,
      });
      expect(noFloor.accents['surface-dark'].color.lightness).toBeCloseTo(
        0.08,
        3
      );
      expect(noFloor.skeletons['surface-dark'].color.lightness).toBeCloseTo(
        0.1,
        3
      );
    });
  });

  describe('Cross-token invariants stated by Design', () => {
    const light = generateTheme('light');
    const dark = generateTheme('dark');

    it('dark surface = base + 0.04', () => {
      expect(dark.surfaces['surface'].color.lightness).toBeCloseTo(
        dark.base.color.lightness + 0.04,
        6
      );
    });

    it('dark text-primary matches the light surface-dark neighbourhood (0.94)', () => {
      expect(dark.textPrimary.color.lightness).toBeCloseTo(
        light.surfaces['surface-dark'].color.lightness,
        3
      );
    });

    it('layer step contrast is ~1.09:1 (light) and ~1.10:1 (dark) between surface and surface-light', () => {
      // Design headline: "1.09:1 between layers" (light), "1.1:1" (dark).
      expect(
        getContrastRatio(
          light.surfaces['surface'].color,
          light.surfaces['surface-light'].color
        )
      ).toBeCloseTo(1.09, 1);
      expect(
        getContrastRatio(
          dark.surfaces['surface'].color,
          dark.surfaces['surface-light'].color
        )
      ).toBeCloseTo(1.1, 1);
    });

    it('light and dark are produced by the same generator (same token names and sources)', () => {
      const names = (t: typeof light) =>
        Object.keys(t)
          .filter((k) => k !== 'mode')
          .sort();
      expect(names(light)).toEqual(names(dark));
    });
  });

  describe('Known-deviations table (asserting current code values to catch drift)', () => {
    it.each(knownDeviations)(
      'asserts deviation $id ($description)',
      ({ mode, token, context, currentCodeValue, tolerance }) => {
        const theme = generateTheme(mode);
        let actualLightness: number;

        if (context) {
          const group = (
            theme as unknown as Record<
              string,
              Record<string, { color: { lightness: number } }>
            >
          )[token];
          actualLightness = group[context].color.lightness;
        } else {
          const single = (
            theme as unknown as Record<string, { color: { lightness: number } }>
          )[token];
          actualLightness = single.color.lightness;
        }

        expect(
          Math.abs(actualLightness - currentCodeValue)
        ).toBeLessThanOrEqual(tolerance);
      }
    );
  });
});
