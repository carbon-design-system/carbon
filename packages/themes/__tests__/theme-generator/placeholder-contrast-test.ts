/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

import {
  getContrastRatio,
  getHexContrastRatio,
} from '../../src/theme-generator/contrast';
import { generateTheme } from '../../src/theme-generator/generate-theme';
import { generateV12Tokens } from '../../src/theme-generator/generate-tokens';
import {
  PLACEHOLDER_TEXT_MIN_CONTRAST,
  defaultSpecification,
  surfaceContexts,
} from '../../src/theme-generator/specification';
import { validateTheme } from '../../src/theme-generator/validate-theme';
import type { GeneratedOklchTheme } from '../../src/theme-generator/generate-theme';

const modes = ['light', 'dark'] as const;

function hexToRgb(hex: string) {
  return [1, 3, 5].map((index) => parseInt(hex.slice(index, index + 2), 16));
}

describe('text-placeholder contrast against field backgrounds', () => {
  it('uses a 4.5:1 accessibility minimum', () => {
    expect(PLACEHOLDER_TEXT_MIN_CONTRAST).toBe(4.5);
  });

  describe.each(modes)('%s theme', (mode) => {
    const theme = generateTheme(mode);

    it.each(surfaceContexts)(
      'meets 4.5:1 against field-01, field-02 and field-03 in OKLCH (placeholder %s)',
      (placeholderContext) => {
        for (const fieldContext of surfaceContexts) {
          expect(
            getContrastRatio(
              theme.placeholderText[placeholderContext].color,
              theme.fields[fieldContext].color
            )
          ).toBeGreaterThanOrEqual(4.5);
        }
      }
    );

    it.each(surfaceContexts)(
      'meets 4.5:1 against every field in the emitted hex fallback (placeholder %s)',
      (placeholderContext) => {
        for (const fieldContext of surfaceContexts) {
          expect(
            getHexContrastRatio(
              theme.placeholderText[placeholderContext].fallback,
              theme.fields[fieldContext].fallback
            )
          ).toBeGreaterThanOrEqual(4.5);
        }
      }
    );

    it('is one shared value across all contexts', () => {
      const {
        surface,
        'surface-light': light,
        'surface-dark': dark,
      } = theme.placeholderText;
      expect(light.color).toEqual(surface.color);
      expect(dark.color).toEqual(surface.color);
      expect(light.fallback).toBe(surface.fallback);
      expect(dark.fallback).toBe(surface.fallback);
    });

    it('preserves the neutral hue and chroma and only varies lightness', () => {
      const { color } = theme.placeholderText.surface;
      expect(color.hue).toBe(defaultSpecification.neutral.hue);
      expect(color.chroma).toBe(defaultSpecification.neutral.chroma);
    });

    it('records a shared field-contrast source and a ratio against its own field', () => {
      for (const context of surfaceContexts) {
        const token = theme.placeholderText[context];
        expect(token.source).toEqual({
          type: 'shared-contrast',
          target: 4.5,
          relativeTo: 'field',
          contexts: [...surfaceContexts],
        });
        expect(token.contrast).toBeCloseTo(
          getContrastRatio(token.color, theme.fields[context].color),
          10
        );
      }
    });

    it('passes validateTheme', () => {
      expect(validateTheme(theme)).toMatchObject({ valid: true, issues: [] });
    });
  });

  it('light placeholder is darker than before (the audited 4.14:1 case is fixed)', () => {
    const theme = generateTheme('light');
    // Previously aliased to text-helper: 4.15:1 on field-01 (hex #6f7073).
    expect(theme.placeholderText.surface.color.lightness).toBeLessThan(
      theme.helperText.surface.color.lightness
    );
    expect(
      getHexContrastRatio(
        theme.placeholderText.surface.fallback,
        theme.fields.surface.fallback
      )
    ).toBeGreaterThanOrEqual(4.5);
  });

  it('does not modify field colours', () => {
    for (const mode of modes) {
      const lightness = defaultSpecification[mode].surfaceLightness;
      const delta = defaultSpecification[mode].fieldDelta;
      const theme = generateTheme(mode);
      expect(theme.fields.surface.color).toEqual({
        lightness: Number((lightness + delta).toFixed(10)),
        chroma: defaultSpecification.neutral.chroma,
        hue: defaultSpecification.neutral.hue,
      });
    }
  });

  it.each(modes)(
    'emits final HEX and RGB in the %s token file that meet 4.5:1 against every field',
    (mode) => {
      const file = generateV12Tokens()[mode] as Record<
        string,
        { $value: { hex: string } }
      >;
      for (const placeholderKey of [
        'text-placeholder-01',
        'text-placeholder-02',
        'text-placeholder-03',
      ]) {
        for (const fieldKey of ['field-01', 'field-02', 'field-03']) {
          const placeholderHex = file[placeholderKey].$value.hex;
          const fieldHex = file[fieldKey].$value.hex;
          expect(
            getHexContrastRatio(placeholderHex, fieldHex)
          ).toBeGreaterThanOrEqual(4.5);

          // Same ratio recomputed from raw 8-bit RGB channels.
          const linear = (channel: number) => {
            const c = channel / 255;
            return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
          };
          const luminance = (hex: string) => {
            const [r, g, b] = hexToRgb(hex).map(linear);
            return 0.2126 * r + 0.7152 * g + 0.0722 * b;
          };
          const [a, b] = [luminance(placeholderHex), luminance(fieldHex)];
          const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
          expect(ratio).toBeGreaterThanOrEqual(4.5);
        }
      }
    }
  );
});

describe('helper text keeps its surface-based contrast behaviour', () => {
  it.each(modes)('%s helper text is solved against surfaces', (mode) => {
    const theme = generateTheme(mode);
    for (const context of surfaceContexts) {
      const token = theme.helperText[context];
      expect(token.source).toEqual({
        type: 'contrast',
        target: 4.5,
        relativeTo: context,
      });
      expect(token.contrast).toBeCloseTo(
        getContrastRatio(token.color, theme.surfaces[context].color),
        10
      );
      expect(token.contrast).toBeGreaterThanOrEqual(4.5);
      expect(
        getHexContrastRatio(token.fallback, theme.surfaces[context].fallback)
      ).toBeGreaterThanOrEqual(4.5);
    }
  });

  it('is unchanged by the placeholder fix (pinned lightness values)', () => {
    const light = generateTheme('light');
    const dark = generateTheme('dark');
    expect(
      surfaceContexts.map((c) => light.helperText[c].color.lightness)
    ).toEqual([0.5465, 0.5671, 0.5256]);
    expect(
      surfaceContexts.map((c) => dark.helperText[c].color.lightness)
    ).toEqual([0.5954, 0.6191, 0.5784]);
  });

  it('keeps icon-helper and icon-placeholder aliased to text-helper', () => {
    for (const mode of modes) {
      const theme = generateTheme(mode);
      for (const context of surfaceContexts) {
        expect(theme.helperIcons[context].color).toEqual(
          theme.helperText[context].color
        );
        expect(theme.placeholderIcons[context].color).toEqual(
          theme.helperText[context].color
        );
      }
    }
  });
});

describe('configurable targets cannot lower the placeholder minimum', () => {
  it.each(modes)(
    'a helperText target of 3 still yields placeholder >= 4.5:1 (%s)',
    (mode) => {
      const theme = generateTheme(mode, {
        contrastTargets: { helperText: 3, strongBorder: 3 },
      });

      // The configured target does lower helper text...
      expect(theme.helperText.surface.contrast).toBeLessThan(4.5);
      // ...but never placeholder text.
      for (const placeholderContext of surfaceContexts) {
        for (const fieldContext of surfaceContexts) {
          expect(
            getHexContrastRatio(
              theme.placeholderText[placeholderContext].fallback,
              theme.fields[fieldContext].fallback
            )
          ).toBeGreaterThanOrEqual(4.5);
        }
      }
      expect(validateTheme(theme).issues).toEqual([]);
    }
  );

  it('a higher configured target raises the placeholder target', () => {
    const theme = generateTheme('light', {
      contrastTargets: { helperText: 5.5, strongBorder: 3 },
    });
    expect(theme.placeholderText.surface.source).toMatchObject({
      target: 5.5,
    });
    for (const fieldContext of surfaceContexts) {
      expect(
        getContrastRatio(
          theme.placeholderText.surface.color,
          theme.fields[fieldContext].color
        )
      ).toBeGreaterThanOrEqual(5.5);
    }
  });

  it('validateTheme ignores theme.contrastTargets for placeholder text', () => {
    const theme = generateTheme('light');
    const tampered: GeneratedOklchTheme = {
      ...theme,
      // A lowered target on the theme object must not bypass the check.
      contrastTargets: { helperText: 1, strongBorder: 1 },
      placeholderText: {
        ...theme.placeholderText,
        surface: {
          ...theme.placeholderText.surface,
          fallback: '#767676',
          color: { ...theme.placeholderText.surface.color, lightness: 0.6 },
        },
      },
    };

    const result = validateTheme(tampered);

    expect(result.valid).toBe(false);
    const messages = result.issues
      .filter((issue) => issue.token === 'text-placeholder-surface')
      .map((issue) => issue.message);
    expect(messages.length).toBeGreaterThan(0);
    expect(messages.join('\n')).toMatch(
      /Expected at least 4\.5:1 contrast \((OKLCH|hex fallback)\) against field-0[123]/
    );
  });

  it('validateTheme reports every failing field and kind separately', () => {
    const theme = generateTheme('dark');
    const tampered: GeneratedOklchTheme = {
      ...theme,
      placeholderText: {
        ...theme.placeholderText,
        'surface-dark': {
          ...theme.placeholderText['surface-dark'],
          color: {
            ...theme.placeholderText['surface-dark'].color,
            lightness: 0.3,
          },
          fallback: '#4d4f52',
        },
      },
    };

    const messages = validateTheme(tampered)
      .issues.filter((issue) => issue.token === 'text-placeholder-surface-dark')
      .map((issue) => issue.message);

    expect(messages.some((m) => /\(OKLCH\) against field-01/.test(m))).toBe(
      true
    );
    expect(
      messages.some((m) => /\(hex fallback\) against field-03/.test(m))
    ).toBe(true);
  });
});

describe('unsatisfiable multi-background placeholder constraints', () => {
  it('throws naming every field, the required ratio and the achievable ratio', () => {
    // Black reaches ~17.6:1 on the darkest light surface (L=0.94) but only
    // ~16:1 on the darkest light field (L=0.91). A 16.8:1 target is therefore
    // satisfiable for helper text (surfaces) and unsatisfiable for the shared
    // placeholder (fields). Derived from the spec, not hardcoded.
    const { neutral, light } = defaultSpecification;
    const black = { lightness: 0, chroma: neutral.chroma, hue: neutral.hue };
    const onSurface = getContrastRatio(black, {
      lightness: light.surfaceLightness - light.surfaceStep,
      chroma: neutral.chroma,
      hue: neutral.hue,
    });
    const onField = getContrastRatio(black, {
      lightness: light.surfaceLightness - light.surfaceStep + light.fieldDelta,
      chroma: neutral.chroma,
      hue: neutral.hue,
    });
    const target = Number(((onSurface + onField) / 2).toFixed(2));
    expect(onField).toBeLessThan(target);
    expect(target).toBeLessThan(onSurface);

    let message = '';
    try {
      generateTheme('light', {
        contrastTargets: { helperText: target, strongBorder: 3 },
      });
    } catch (error) {
      message = (error as Error).message;
    }

    expect(message).toMatch(/generateTheme\(light\)/);
    expect(message).toMatch(/"text-placeholder"/);
    expect(message).toMatch(
      /field-01 \(L=0\.9400\): required [\d.]+:1, best achievable [\d.]+:1/
    );
    expect(message).toMatch(
      /field-02 \(L=0\.9700\): required [\d.]+:1, best achievable [\d.]+:1/
    );
    expect(message).toMatch(
      /field-03 \(L=0\.9100\): required [\d.]+:1, best achievable [\d.]+:1 \[FAILS\]/
    );
    // Only the genuinely conflicting field is flagged.
    expect(message.match(/\[FAILS\]/g)).toHaveLength(1);
  });

  it('does not alter field colours to make the contrast pass', () => {
    expect(() =>
      generateTheme('light', {
        contrastTargets: { helperText: 21, strongBorder: 3 },
      })
    ).toThrow(/cannot/);
  });
});
