/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

import { getHexContrastRatio } from '../../src/theme-generator/contrast';
import { generateTheme } from '../../src/theme-generator/generate-theme';
import { surfaceContexts } from '../../src/theme-generator/specification';
import { validateTheme } from '../../src/theme-generator/validate-theme';
import type { GeneratedOklchTheme } from '../../src/theme-generator/generate-theme';

describe('hex fallback contrast', () => {
  it('computes known contrast ratios from hex', () => {
    expect(getHexContrastRatio('#000000', '#ffffff')).toBeCloseTo(21);
    expect(getHexContrastRatio('#ffffff', '#ffffff')).toBeCloseTo(1);
  });

  it('rejects malformed hex input', () => {
    expect(() => getHexContrastRatio('#fff', '#000000')).toThrow(/6-digit hex/);
  });

  it.each(['light', 'dark'] as const)(
    'solved tokens meet their targets in the %s hex fallback',
    (mode) => {
      const theme = generateTheme(mode);
      for (const context of surfaceContexts) {
        const background = theme.surfaces[context].fallback;
        expect(
          getHexContrastRatio(theme.helperText[context].fallback, background)
        ).toBeGreaterThanOrEqual(theme.contrastTargets.helperText);
        expect(
          getHexContrastRatio(theme.strongBorders[context].fallback, background)
        ).toBeGreaterThanOrEqual(theme.contrastTargets.strongBorder);
      }
    }
  );
});

describe('validateTheme — fallback and brand checks', () => {
  it.each(['light', 'dark'] as const)(
    'accepts the default %s theme with no errors',
    (mode) => {
      const result = validateTheme(generateTheme(mode));
      expect(result.issues).toEqual([]);
      expect(result.valid).toBe(true);
    }
  );

  it('reports a hex fallback that misses the contrast target', () => {
    const theme = generateTheme('light');
    const broken: GeneratedOklchTheme = {
      ...theme,
      helperText: {
        ...theme.helperText,
        surface: { ...theme.helperText.surface, fallback: '#c0c0c0' },
      },
    };

    const result = validateTheme(broken);

    expect(result.valid).toBe(false);
    expect(result.issues.map((issue) => issue.token)).toContain(
      'text-helper-surface'
    );
    expect(result.issues.map((issue) => issue.message).join('\n')).toMatch(
      /Hex fallback expected at least 4\.5:1/
    );
  });

  it('reports a brand fallback that drifts from the OKLCH brand color', () => {
    const theme = generateTheme('light', {
      brand: {
        lightness: 0.5565,
        chroma: 0.243,
        hue: 262,
        fallback: '#ff0000',
      },
    });

    const result = validateTheme(theme);

    expect(result.valid).toBe(false);
    expect(result.issues.map((issue) => issue.token)).toContain('brand');
  });

  it('reports text-on-color that fails AA on the brand color', () => {
    const theme = generateTheme('light', {
      brand: {
        lightness: 0.9,
        chroma: 0.05,
        hue: 100,
        fallback: '#ece7c9',
      },
    });

    const result = validateTheme(theme);

    expect(result.issues.map((issue) => issue.token)).toContain(
      'text-on-color'
    );
  });
});

describe('validateTheme — border-inverse, border-interactive and disabled', () => {
  it('reports a border-inverse below 4.5:1 on a surface', () => {
    const theme = generateTheme('light');
    const broken: GeneratedOklchTheme = {
      ...theme,
      borderInverse: {
        ...theme.borderInverse,
        color: { ...theme.borderInverse.color, lightness: 0.9 },
        fallback: '#e0e0e0',
      },
    };
    const result = validateTheme(broken);
    expect(result.valid).toBe(false);
    expect(result.issues.map((i) => i.token)).toContain(
      'border-inverse-surface'
    );
  });

  it('reports a border-interactive below 3:1 on a dark surface', () => {
    const theme = generateTheme('dark');
    const broken: GeneratedOklchTheme = {
      ...theme,
      borderInteractive: {
        ...theme.borderInteractive,
        color: { ...theme.borderInteractive.color, lightness: 0.3 },
        fallback: '#223355',
      },
    };
    const result = validateTheme(broken);
    expect(result.valid).toBe(false);
    expect(result.issues.map((i) => i.token)).toContain(
      'border-interactive-surface'
    );
  });

  it('reports a disabled token without a fractional alpha', () => {
    const theme = generateTheme('light');
    const { alpha: _alpha, ...withoutAlpha } = theme.textDisabled;
    const result = validateTheme({ ...theme, textDisabled: withoutAlpha });
    expect(result.valid).toBe(false);
    expect(result.issues.map((i) => i.token)).toContain('text-disabled');
  });

  it('rejects unknown keys on the new spec fields', () => {
    expect(() =>
      generateTheme('light', { textOnColor: { bogus: 1 } as never })
    ).toThrow(/Unknown override key "bogus"/);
    expect(() =>
      generateTheme('dark', {
        dark: { borderInteractive: { bogus: 1 } } as never,
      })
    ).toThrow(/Unknown override key "bogus"/);
  });

  it('accepts overriding the new spec fields', () => {
    const theme = generateTheme('dark', {
      dark: { borderInverseLightness: 0.95, skeletonFloor: 0.2 } as never,
    });
    expect(theme.borderInverse.color.lightness).toBeCloseTo(0.95, 6);
    expect(theme.skeletons['surface-dark'].color.lightness).toBeCloseTo(0.2, 6);
  });
});
