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
      relativeTo: 'surface' | 'field';
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

/**
 * Colour of `border-interactive` for one mode.
 * - `'brand'`  — use the brand colour (light theme, per the design reference).
 * - an object  — an explicit L/C pair; hue is taken from `brand.hue`.
 */
export type BorderInteractiveSpec =
  | 'brand'
  | { lightness: number; chroma: number };

/** Specification for a single support/status color. */
export interface SupportColorSpec {
  lightness: number;
  chroma: number;
  hue: number;
  fallback: string;
}

/** Complete set of support colors for one theme mode. */
export interface SupportSpecification {
  error: SupportColorSpec;
  success: SupportColorSpec;
  warning: SupportColorSpec;
  info: SupportColorSpec;
  errorInverse: SupportColorSpec;
  successInverse: SupportColorSpec;
  warningInverse: SupportColorSpec;
  infoInverse: SupportColorSpec;
}

/** Numeric parameters that vary between light and dark modes. */
export interface ThemeModeSpecification {
  surfaceLightness: number;
  surfaceStep: number;
  fieldDelta: number;
  accentDelta: number;
  subtleBorderDelta: number;
  skeletonDelta: number;
  /**
   * Minimum lightness for `layer-accent-*` tokens. Prevents nested accents
   * from collapsing to pure black on dark surfaces (design chose a floor over
   * black). Use 0 for no floor.
   */
  accentFloor: number;
  /** Minimum lightness for `skeleton-background-*` tokens. Use 0 for no floor. */
  skeletonFloor: number;
  /** Lightness of `border-inverse` (neutral hue/chroma). */
  borderInverseLightness: number;
  /** Colour of `border-interactive`. */
  borderInteractive: BorderInteractiveSpec;
  textPrimaryLightness: number;
  textSecondaryLightness: number;
  iconPrimaryLightness: number;
  iconSecondaryLightness: number;
  /** Support / status alert colors for this mode. */
  support: SupportSpecification;
  /**
   * One spec entry per interactive state. The generator iterates this record —
   * adding a new state here automatically produces a new token with no other
   * changes required.
   */
  interactive: InteractiveStateModeSpec;
}

export interface ThemeSpecification {
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
  /** Colour of `text-on-color` (rendered on the brand colour). */
  textOnColor: {
    lightness: number;
    chroma: number;
    hue: number;
    fallback: string;
  };
  contrastTargets: {
    helperText: number;
    strongBorder: number;
  };
  light: ThemeModeSpecification;
  dark: ThemeModeSpecification;
}

/**
 * Minimum WCAG contrast for `text-placeholder-*` against every `field-*`
 * background. Deliberately NOT part of `contrastTargets`: it is an
 * accessibility floor that a configured generation target cannot lower, in
 * either the solver (`max(configured, floor)`) or `validateTheme`.
 */
export const PLACEHOLDER_TEXT_MIN_CONTRAST = 4.5;

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
    status: 'experimental',
    relativeTo: 'surface',
    reason:
      'Design chose a lightness floor over black for dark accents (Slack, option A). The exact floor value (0.08) is an engineering proposal awaiting confirmation.',
  },
  textPrimary: { type: 'fixed', status: 'confirmed' },
  textSecondary: { type: 'fixed', status: 'confirmed' },
  iconPrimary: {
    type: 'fixed',
    status: 'confirmed',
    reason:
      'Design calc cell says 0.92 but the value and hex are 0.94; 0.94 is used (matches text-primary).',
  },
  iconSecondary: { type: 'fixed', status: 'confirmed' },
  helperText: {
    type: 'contrast',
    status: 'confirmed',
    relativeTo: 'surface',
  },
  placeholderText: {
    type: 'contrast',
    status: 'confirmed',
    relativeTo: 'field',
    reason:
      'Placeholder text is rendered inside fields, so one shared value is solved against field-01, field-02 and field-03 (at least 4.5:1). Context-aware separation between helper and placeholder text confirmed with Design.',
  },
  helperIcon: {
    type: 'alias',
    status: 'confirmed',
    token: 'helperText',
    reason: 'Icon helper alias of text-helper-01 confirmed with Design.',
  },
  placeholderIcon: {
    type: 'alias',
    status: 'confirmed',
    token: 'placeholderText',
    reason: 'Icon placeholder alias of text-placeholder confirmed with Design.',
  },
  strongBorder: {
    type: 'contrast',
    status: 'confirmed',
    relativeTo: 'surface',
    reason:
      'Solved and validated at >= 3:1 against surfaces only. Contrast against field backgrounds is not enforced (light theme: about 2.3 to 2.8:1 on fields); extending it needs a Design decision.',
  },
  subtleBorder: {
    type: 'lightness-delta',
    status: 'confirmed',
    relativeTo: 'surface',
  },
  skeleton: {
    type: 'lightness-delta',
    status: 'confirmed',
    relativeTo: 'surface',
  },
  textOnColor: {
    type: 'fixed',
    status: 'confirmed',
    reason:
      'Pure white (#ffffff, L=1.0) is the initial value: 5.00:1 WCAG AA contrast against brand background (#0f62fe) in light and dark themes (Design confirmed).',
  },
  borderInverse: {
    type: 'fixed',
    status: 'experimental',
    reason:
      'PROVISIONAL(Q2): Design: "at least 4.5:1 from background, based on text primary for now". Literal L 0.28 (light) / 0.92 (dark); validated >= 4.5:1 on every surface.',
  },
  borderInteractive: {
    type: 'fixed',
    status: 'confirmed',
    reason:
      'Design: light = brand; dark = oklch(0.647 0.189 262) (#4589ff), validated >= 3:1 on every surface.',
  },
  textDisabled: {
    type: 'fixed',
    status: 'confirmed',
    reason:
      'Design: disabled = parent colour with chroma 0.004 at 25% opacity. Parent is text-primary.',
  },
  iconDisabled: {
    type: 'fixed',
    status: 'confirmed',
    reason:
      'Design: disabled = parent colour with chroma 0.004 at 25% opacity. Parent is icon-primary.',
  },
  supportError: {
    type: 'fixed',
    status: 'confirmed',
    reason:
      'Error status fill, converted from canonical Carbon v11 palette anchor (Red 60 / Red 50).',
  },
  supportSuccess: {
    type: 'fixed',
    status: 'confirmed',
    reason:
      'Success status fill, converted from canonical Carbon v11 palette anchor (Green 50 / Green 40).',
  },
  supportWarning: {
    type: 'fixed',
    status: 'confirmed',
    reason:
      'Warning status fill, converted from canonical Carbon v11 palette anchor (Yellow 30).',
  },
  supportInfo: {
    type: 'fixed',
    status: 'confirmed',
    reason:
      'Info status fill, converted from canonical Carbon v11 palette anchor (Blue 70 / Blue 50).',
  },
  supportErrorInverse: {
    type: 'fixed',
    status: 'confirmed',
    reason:
      'Error inverse fill, converted from canonical Carbon v11 palette anchor (Red 50 / Red 60).',
  },
  supportSuccessInverse: {
    type: 'fixed',
    status: 'confirmed',
    reason:
      'Success inverse fill, converted from canonical Carbon v11 palette anchor (Green 40 / Green 50).',
  },
  supportWarningInverse: {
    type: 'fixed',
    status: 'confirmed',
    reason:
      'Warning inverse fill, converted from canonical Carbon v11 palette anchor (Yellow 30).',
  },
  supportInfoInverse: {
    type: 'fixed',
    status: 'confirmed',
    reason:
      'Info inverse fill, converted from canonical Carbon v11 palette anchor (Blue 50 / Blue 70).',
  },
} as const satisfies Record<string, TokenRule>;

/**
 * Carbon v12 default theme specification — neutral hue 262, chroma 0.004
 * (slightly bluish neutral, matching IBM's palette).
 *
 * Override individual fields by passing `overrides` to `generateTheme()`.
 * Partial `interactive` overrides deep-merge, preserving unspecified states.
 */
export const defaultSpecification: ThemeSpecification = {
  /**
   * PROVISIONAL(Q5): Design states neutral hue is "tied to brand hue" while also
   * fixing it at 262. Currently hardcoded to 262 with no dynamic linking to brand hue.
   */
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
  textOnColor: {
    lightness: 1,
    chroma: 0,
    hue: 0,
    fallback: '#ffffff',
  },
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
    /** Light skeleton delta (-0.04 yields 0.93 / 0.96 / 0.90; confirmed 0.90 for surface-dark). */
    skeletonDelta: -0.04,
    accentFloor: 0,
    skeletonFloor: 0,
    borderInverseLightness: 0.28,
    borderInteractive: 'brand',
    textPrimaryLightness: 0.24,
    textSecondaryLightness: 0.48,
    iconPrimaryLightness: 0.24,
    iconSecondaryLightness: 0.48,
    support: {
      error: {
        lightness: 0.5692,
        chroma: 0.2174,
        hue: 25.93,
        fallback: '#da1e28',
      },
      success: {
        lightness: 0.6234,
        chroma: 0.1661,
        hue: 148.09,
        fallback: '#24a148',
      },
      warning: {
        lightness: 0.8321,
        chroma: 0.1655,
        hue: 90.44,
        fallback: '#f1c21b',
      },
      info: {
        lightness: 0.454,
        chroma: 0.221,
        hue: 262.63,
        fallback: '#0043ce',
      },
      errorInverse: {
        lightness: 0.6662,
        chroma: 0.2088,
        hue: 22.13,
        fallback: '#fa4d56',
      },
      successInverse: {
        lightness: 0.712,
        chroma: 0.1677,
        hue: 149.29,
        fallback: '#42be65',
      },
      warningInverse: {
        lightness: 0.8321,
        chroma: 0.1655,
        hue: 90.44,
        fallback: '#f1c21b',
      },
      infoInverse: {
        lightness: 0.647,
        chroma: 0.1888,
        hue: 260.58,
        fallback: '#4589ff',
      },
    },
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
    accentFloor: 0.08,
    skeletonFloor: 0.14,
    borderInverseLightness: 0.92,
    borderInteractive: { lightness: 0.647, chroma: 0.189 },
    textPrimaryLightness: 0.94,
    textSecondaryLightness: 0.72,
    iconPrimaryLightness: 0.94,
    iconSecondaryLightness: 0.72,
    support: {
      error: {
        lightness: 0.6662,
        chroma: 0.2088,
        hue: 22.13,
        fallback: '#fa4d56',
      },
      success: {
        lightness: 0.712,
        chroma: 0.1677,
        hue: 149.29,
        fallback: '#42be65',
      },
      warning: {
        lightness: 0.8321,
        chroma: 0.1655,
        hue: 90.44,
        fallback: '#f1c21b',
      },
      info: {
        lightness: 0.647,
        chroma: 0.1888,
        hue: 260.58,
        fallback: '#4589ff',
      },
      errorInverse: {
        lightness: 0.5692,
        chroma: 0.2174,
        hue: 25.93,
        fallback: '#da1e28',
      },
      successInverse: {
        lightness: 0.6234,
        chroma: 0.1661,
        hue: 148.09,
        fallback: '#24a148',
      },
      warningInverse: {
        lightness: 0.8321,
        chroma: 0.1655,
        hue: 90.44,
        fallback: '#f1c21b',
      },
      infoInverse: {
        lightness: 0.454,
        chroma: 0.221,
        hue: 262.63,
        fallback: '#0043ce',
      },
    },
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
