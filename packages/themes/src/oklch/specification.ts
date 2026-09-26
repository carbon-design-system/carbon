/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export type ThemeMode = 'light' | 'dark';
export type SurfaceContext = 'surface' | 'surface-light' | 'surface-dark';
export type RuleStatus = 'confirmed' | 'experimental' | 'unresolved';

export type TokenRule =
  | { type: 'fixed'; status: RuleStatus; reason?: string }
  | {
      type: 'lightness-delta';
      status: RuleStatus;
      relativeTo: 'surface';
      reason?: string;
    }
  | {
      type: 'contrast';
      status: RuleStatus;
      relativeTo: 'surface';
      reason?: string;
    }
  | { type: 'alias'; status: RuleStatus; token: string; reason?: string };

export interface ThemeModeSpecification {
  surfaceLightness: number;
  surfaceStep: number;
  fieldDelta: number;
  accentDelta: number;
  subtleBorderDelta: number;
  skeletonDelta: number;
  textPrimaryLightness: number;
  textSecondaryLightness: number;
  iconPrimaryLightness: number;
  iconSecondaryLightness: number;
}

export interface OklchThemeSpecification {
  neutral: {
    hue: number;
    chroma: number;
  };
  brand: {
    lightness: number;
    chroma: number;
    hue: number;
    fallback: string;
  };
  baseLightness: number;
  contrastTargets: {
    helperText: number;
    strongBorder: number;
  };
  light: ThemeModeSpecification;
  dark: ThemeModeSpecification;
}

export const tokenRules = {
  brand: { type: 'fixed', status: 'confirmed' },
  base: { type: 'fixed', status: 'confirmed' },
  surface: { type: 'fixed', status: 'confirmed' },
  field: {
    type: 'lightness-delta',
    status: 'confirmed',
    relativeTo: 'surface',
  },
  accent: {
    type: 'lightness-delta',
    status: 'unresolved',
    relativeTo: 'surface',
    reason:
      'Dark surface-dark is shown as black instead of the calculated value.',
  },
  textPrimary: { type: 'fixed', status: 'confirmed' },
  textSecondary: { type: 'fixed', status: 'confirmed' },
  iconPrimary: {
    type: 'fixed',
    status: 'unresolved',
    reason: 'The dark reference is shown as both 0.92 and 0.94.',
  },
  iconSecondary: { type: 'fixed', status: 'confirmed' },
  helperText: {
    type: 'contrast',
    status: 'confirmed',
    relativeTo: 'surface',
  },
  placeholderText: {
    type: 'alias',
    status: 'unresolved',
    token: 'helperText',
    reason: 'Design is considering combining helper and placeholder tokens.',
  },
  helperIcon: {
    type: 'alias',
    status: 'unresolved',
    token: 'helperText',
    reason: 'The final icon contrast target and token name need confirmation.',
  },
  placeholderIcon: {
    type: 'alias',
    status: 'unresolved',
    token: 'helperText',
    reason: 'The final icon contrast target and token name need confirmation.',
  },
  strongBorder: {
    type: 'contrast',
    status: 'confirmed',
    relativeTo: 'surface',
  },
  subtleBorder: {
    type: 'lightness-delta',
    status: 'confirmed',
    relativeTo: 'surface',
  },
  skeleton: {
    type: 'lightness-delta',
    status: 'experimental',
    relativeTo: 'surface',
    reason:
      'The proposed values approximate current behavior and need design review.',
  },
} as const satisfies Record<string, TokenRule>;

export const defaultSpecification: OklchThemeSpecification = {
  neutral: {
    hue: 262,
    chroma: 0.004,
  },
  brand: {
    lightness: 0.5565,
    chroma: 0.243,
    hue: 262,
    fallback: '#0f62fe',
  },
  baseLightness: 0.16,
  contrastTargets: {
    helperText: 4.5,
    strongBorder: 3,
  },
  light: {
    surfaceLightness: 0.97,
    surfaceStep: 0.03,
    fieldDelta: -0.03,
    accentDelta: -0.06,
    subtleBorderDelta: -0.09,
    skeletonDelta: -0.04,
    textPrimaryLightness: 0.24,
    textSecondaryLightness: 0.48,
    iconPrimaryLightness: 0.24,
    iconSecondaryLightness: 0.48,
  },
  dark: {
    surfaceLightness: 0.2,
    surfaceStep: 0.04,
    fieldDelta: -0.04,
    accentDelta: -0.08,
    subtleBorderDelta: 0.12,
    skeletonDelta: -0.06,
    textPrimaryLightness: 0.94,
    textSecondaryLightness: 0.72,
    iconPrimaryLightness: 0.94,
    iconSecondaryLightness: 0.72,
  },
};

export const designReferenceLightness = {
  light: {
    brand: 0.5565,
    base: 0.16,
    surface: { surface: 0.97, 'surface-light': 1, 'surface-dark': 0.94 },
    field: { surface: 0.94, 'surface-light': 0.97, 'surface-dark': 0.91 },
    accent: { surface: 0.91, 'surface-light': 0.94, 'surface-dark': 0.88 },
    textPrimary: 0.24,
    textSecondary: 0.48,
    iconPrimary: 0.24,
    iconSecondary: 0.48,
    helperText: {
      surface: 0.5465,
      'surface-light': 0.567,
      'surface-dark': 0.5255,
    },
    strongBorder: {
      surface: 0.647,
      'surface-light': 0.669,
      'surface-dark': 0.624,
    },
    subtleBorder: {
      surface: 0.88,
      'surface-light': 0.91,
      'surface-dark': 0.85,
    },
    skeleton: { surface: 0.93, 'surface-light': 0.96, 'surface-dark': 0.9 },
  },
  dark: {
    brand: 0.5565,
    base: 0.16,
    surface: { surface: 0.2, 'surface-light': 0.24, 'surface-dark': 0.16 },
    field: { surface: 0.16, 'surface-light': 0.2, 'surface-dark': 0.12 },
    accent: { surface: 0.12, 'surface-light': 0.16, 'surface-dark': 0 },
    textPrimary: 0.94,
    textSecondary: 0.72,
    iconPrimary: 0.94,
    iconSecondary: 0.72,
    helperText: {
      surface: 0.596,
      'surface-light': 0.62,
      'surface-dark': 0.5781,
    },
    strongBorder: {
      surface: 0.5,
      'surface-light': 0.52,
      'surface-dark': 0.483,
    },
    subtleBorder: {
      surface: 0.32,
      'surface-light': 0.36,
      'surface-dark': 0.28,
    },
    skeleton: { surface: 0.14, 'surface-light': 0.18, 'surface-dark': 0 },
  },
} as const;
