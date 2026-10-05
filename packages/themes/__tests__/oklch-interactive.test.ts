/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { generateTheme } from '../src/oklch/generate-theme';
import { validateTheme } from '../src/oklch/validate-theme';
import { defaultSpecification } from '../src/oklch/specification';

describe('generateTheme — interactive tokens', () => {
  const MODES = ['light', 'dark'] as const;
  const STATES = ['hover', 'selected', 'active', 'disabled'] as const;

  for (const mode of MODES) {
    describe(`mode: ${mode}`, () => {
      const theme = generateTheme(mode);

      it('generates a token for every InteractiveState', () => {
        for (const state of STATES) {
          expect(theme.interactive[state]).toBeDefined();
        }
      });

      it('lightness-delta tokens have no alpha', () => {
        for (const state of ['hover', 'selected', 'active'] as const) {
          expect(theme.interactive[state].alpha).toBeUndefined();
        }
      });

      it('disabled token carries the configured alpha', () => {
        const expectedAlpha = defaultSpecification[mode].interactive.disabled;
        if (expectedAlpha.type !== 'opacity')
          throw new Error('test setup error');
        expect(theme.interactive.disabled.alpha).toBe(expectedAlpha.alpha);
      });

      it('lightness-delta tokens shift surface lightness by the configured delta', () => {
        const surface = theme.surfaces['surface'];
        const spec = defaultSpecification[mode].interactive;

        for (const state of ['hover', 'selected', 'active'] as const) {
          const stateSpec = spec[state];
          if (stateSpec.type !== 'lightness-delta')
            throw new Error('test setup error');
          const expected = Math.min(
            1,
            Math.max(0, surface.color.lightness + stateSpec.delta)
          );
          expect(theme.interactive[state].color.lightness).toBeCloseTo(
            expected,
            10
          );
        }
      });

      it('all tokens have valid hex fallbacks', () => {
        for (const state of STATES) {
          expect(theme.interactive[state].fallback).toMatch(/^#[\da-f]{6}$/i);
        }
      });

      it('all tokens have lightness in [0, 1]', () => {
        for (const state of STATES) {
          const { lightness } = theme.interactive[state].color;
          expect(lightness).toBeGreaterThanOrEqual(0);
          expect(lightness).toBeLessThanOrEqual(1);
        }
      });

      it('source type matches the spec variant', () => {
        for (const state of ['hover', 'selected', 'active'] as const) {
          expect(theme.interactive[state].source.type).toBe(
            'interactive-state'
          );
        }
        expect(theme.interactive.disabled.source.type).toBe(
          'interactive-opacity'
        );
      });
    });
  }
});

describe('validateTheme — interactive tokens', () => {
  it('returns valid:true with no errors for a correctly generated theme', () => {
    const result = validateTheme(generateTheme('light'));
    expect(result.valid).toBe(true);
    // errors only — warnings (e.g. gamut) do not affect validity
    expect(result.issues).toHaveLength(0);
    // result.warnings may contain gamut notices for wide-gamut tokens (e.g. brand)
    expect(Array.isArray(result.warnings)).toBe(true);
  });

  it('gamut-mapped tokens produce warnings, not errors', () => {
    const result = validateTheme(generateTheme('light'));
    for (const w of result.warnings) {
      expect(w.severity).toBe('warning');
      expect(w.message).toMatch(/gamut/i);
    }
  });

  it('reports an error when an opacity-state token is missing alpha', () => {
    const theme = generateTheme('light');
    const { alpha: _removed, ...withoutAlpha } = theme.interactive.disabled;
    theme.interactive = { ...theme.interactive, disabled: withoutAlpha as any };

    const result = validateTheme(theme);
    expect(result.valid).toBe(false);
    expect(
      result.issues.some(
        (i) => i.token === 'state-disabled' && i.severity === 'error'
      )
    ).toBe(true);
  });

  it('reports an error when a lightness-delta token unexpectedly carries alpha', () => {
    const theme = generateTheme('light');
    theme.interactive = {
      ...theme.interactive,
      hover: { ...theme.interactive.hover, alpha: 0.5 },
    };

    const result = validateTheme(theme);
    expect(result.valid).toBe(false);
    expect(
      result.issues.some(
        (i) => i.token === 'state-hover' && i.severity === 'error'
      )
    ).toBe(true);
  });

  it('throws on an interactive token with an unrecognised source type', () => {
    const theme = generateTheme('light');
    theme.interactive = {
      ...theme.interactive,
      hover: { ...theme.interactive.hover, source: { type: 'fixed' } as any },
    };

    expect(() => validateTheme(theme)).toThrow(/unexpected source type/);
  });
});

describe('generateTheme — mergeSpecification (override semantics)', () => {
  it('a partial interactive override preserves unaffected states', () => {
    const base = generateTheme('light');
    const custom = generateTheme('light', {
      light: {
        interactive: {
          hover: { type: 'lightness-delta', status: 'confirmed', delta: -0.05 },
        },
      } as any,
    });

    // hover should be changed
    expect(custom.interactive.hover.color.lightness).not.toBe(
      base.interactive.hover.color.lightness
    );
    // selected/active/disabled must still exist and match base
    expect(custom.interactive.selected.color.lightness).toBe(
      base.interactive.selected.color.lightness
    );
    expect(custom.interactive.active.color.lightness).toBe(
      base.interactive.active.color.lightness
    );
    expect(custom.interactive.disabled.alpha).toBe(
      base.interactive.disabled.alpha
    );
  });
});
