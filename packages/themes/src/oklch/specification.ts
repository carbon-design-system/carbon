/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export type ThemeMode = 'light' | 'dark';
export type SurfaceContext = 'surface' | 'surface-light' | 'surface-dark';

/**
 * Canonical ordered list of surface contexts. Import this everywhere —
 * the index order controls DTCG token numbering (surface-01, -02, -03)
 * and validation iteration. Never redeclare this array in other files.
 */
export const surfaceContexts: SurfaceContext[] = [
  'surface',
  'surface-light',
  'surface-dark',
];

/**
 * Design-review status of a generated token rule.
 * - `confirmed`   — matches the design reference; safe to ship.
 * - `experimental`— implemented but awaiting design sign-off.
 * - `unresolved`  — open question; do not rely on the value.
 */
export type RuleStatus = 'confirmed' | 'experimental' | 'unresolved';

/**
 * Interactive states that every theme must provide a color for.
 * To add a new state: add its key here, then add one entry per mode in
 * `defaultSpecification.[light|dark].interactive`. Nothing else changes.
 */
export type InteractiveState = 'hover' | 'selected' | 'active' | 'disabled';

/**
 * Metadata describing the design rule behind a non-interactive generated
 * token. Interactive state tokens carry their own rule inline via
 * `InteractiveStateSpec` — they do not appear in `tokenRules`.
 */
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

/**
 * Describes how a single interactive state color is computed from the
 * default surface of the current mode.
 *
 * - `lightness-delta` — shift surface L by `delta` (hover / selected / active).
 * - `opacity`         — use the surface color at reduced alpha (disabled).
 *
 * `status` and `reason` live here so each state is one self-contained entry
 * with no parallel registry to keep in sync.
 */
export type InteractiveStateSpec =
  | {
      type: 'lightness-delta';
      status: RuleStatus;
      delta: number;
      reason?: string;
    }
  | {
      type: 'opacity';
      status: RuleStatus;
      chroma: number;
      alpha: number;
      reason?: string;
    };

/**
 * One `InteractiveStateSpec` per `InteractiveState`.
 * TypeScript enforces completeness — missing or extra keys are compile errors.
 */
export type InteractiveStateModeSpec = Record<
  InteractiveState,
  InteractiveStateSpec
>;

/** Numeric parameters that vary between light and dark modes. */
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
  /**
   * One spec entry per interactive state. The generator iterates this record —
   * adding a new state here automatically produces a new token with no other
   * changes required.
   */
  interactive: InteractiveStateModeSpec;
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

/**
 * Design-rule metadata for every non-interactive generated token.
 * `status` and `reason` record the current confidence level against
 * the design reference. Interactive states are not listed here — see
 * `defaultSpecification.[light|dark].interactive`.
 */
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

/**
 * Carbon v12 default theme specification — neutral hue 262, chroma 0.004
 * (slightly bluish neutral, matching IBM's palette).
 *
 * Override individual fields by passing `overrides` to `generateTheme()`.
 * Partial `interactive` overrides deep-merge, preserving unspecified states.
 */
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
    // Light interactive states darken the surface (negative delta).
    interactive: {
      hover: { type: 'lightness-delta', status: 'experimental', delta: -0.03 },
      selected: {
        type: 'lightness-delta',
        status: 'experimental',
        delta: -0.06,
      },
      active: { type: 'lightness-delta', status: 'experimental', delta: -0.09 },
      disabled: {
        type: 'opacity',
        status: 'experimental',
        chroma: 0.004,
        alpha: 0.25,
      },
    },
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
    // Dark interactive states lighten the surface (positive delta).
    interactive: {
      hover: { type: 'lightness-delta', status: 'experimental', delta: 0.04 },
      selected: {
        type: 'lightness-delta',
        status: 'experimental',
        delta: 0.08,
      },
      active: { type: 'lightness-delta', status: 'experimental', delta: 0.12 },
      disabled: {
        type: 'opacity',
        status: 'experimental',
        chroma: 0.004,
        alpha: 0.25,
        reason:
          'Fixed low-chroma color at 25% opacity. Applied uniformly in both modes.',
      },
    },
  },
};

/**
 * Design-reference OKLCH lightness values used for visual regression and
 * documentation. These reflect the expected output of `generateTheme()` for
 * the default specification — update this object whenever `defaultSpecification`
 * numeric values change.
 *
 * Interactive values are relative to the default surface for each mode
 * (surface context = 'surface'). Expressions are written as arithmetic so the
 * relationship to the spec is visible at a glance.
 */
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
    interactive: {
      hover: 0.97 - 0.03, // surfaceLightness + hoverDelta
      selected: 0.97 - 0.06, // surfaceLightness + selectedDelta
      active: 0.97 - 0.09, // surfaceLightness + activeDelta
      disabled: { chroma: 0.004, alpha: 0.25 }, // opacity — no lightness shift
    },
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
    interactive: {
      hover: 0.2 + 0.04, // surfaceLightness + hoverDelta
      selected: 0.2 + 0.08, // surfaceLightness + selectedDelta
      active: 0.2 + 0.12, // surfaceLightness + activeDelta
      disabled: { chroma: 0.004, alpha: 0.25 }, // opacity — no lightness shift
    },
  },
} as const;
