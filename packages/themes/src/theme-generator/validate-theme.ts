/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { mapToSrgbGamut, oklchToHex } from './color';
import { getContrastRatio, getHexContrastRatio } from './contrast';
import type {
  GeneratedOklchTheme,
  GeneratedColorToken,
} from './generate-theme';
import {
  PLACEHOLDER_TEXT_MIN_CONTRAST,
  surfaceContexts,
  type InteractiveState,
  type InteractiveStateSpec,
  type SurfaceContext,
} from './specification';

export interface ValidationIssue {
  token: string;
  message: string;
  /** 'error' issues mark the theme invalid. 'warning' issues are informational. */
  severity: 'error' | 'warning';
}

export interface ThemeValidationResult {
  valid: boolean;
  /** All error-severity issues. Empty when valid:true. */
  issues: ValidationIssue[];
  /** Informational issues that do not mark the theme invalid (e.g. gamut clipping). */
  warnings: ValidationIssue[];
}

const contexts = surfaceContexts;

/** Maximum per-channel (0–255) distance allowed between a brand `fallback` hex and its OKLCH value. */
const BRAND_FALLBACK_CHANNEL_TOLERANCE = 3;

/** WCAG AA contrast for normal-size text; `text-on-color` must meet it on the brand color. */
const TEXT_ON_COLOR_TARGET = 4.5;

/** Design: `border-inverse` is "at least 4.5:1 contrast from background". */
const BORDER_INVERSE_TARGET = 4.5;

/** `border-interactive` is a UI-component boundary, so WCAG 1.4.11 (3:1) applies. */
const BORDER_INTERACTIVE_TARGET = 3;

/**
 * The contextual token groups from `GeneratedOklchTheme` that are keyed by
 * `SurfaceContext`. Typed as a mapped type so TypeScript will error if a new
 * `Record<SurfaceContext, GeneratedColorToken>` field is added to
 * `GeneratedOklchTheme` without being added to the validator.
 */
type ContextualGroups = {
  [K in keyof GeneratedOklchTheme as GeneratedOklchTheme[K] extends Record<
    SurfaceContext,
    GeneratedColorToken
  >
    ? K
    : never]: GeneratedOklchTheme[K];
};

export function validateTheme(
  theme: GeneratedOklchTheme
): ThemeValidationResult {
  const errors: ValidationIssue[] = [];
  const warnings: ValidationIssue[] = [];

  // Typed assignment — TypeScript will error if a contextual group is added to
  // GeneratedOklchTheme but forgotten here.
  const groups: ContextualGroups = {
    surfaces: theme.surfaces,
    fields: theme.fields,
    accents: theme.accents,
    layerHover: theme.layerHover,
    layerActive: theme.layerActive,
    layerSelected: theme.layerSelected,
    fieldHover: theme.fieldHover,
    accentHover: theme.accentHover,
    accentActive: theme.accentActive,
    helperText: theme.helperText,
    placeholderText: theme.placeholderText,
    helperIcons: theme.helperIcons,
    placeholderIcons: theme.placeholderIcons,
    strongBorders: theme.strongBorders,
    subtleBorders: theme.subtleBorders,
    skeletons: theme.skeletons,
  };

  const groupNames: Record<keyof ContextualGroups, string> = {
    surfaces: 'surface',
    fields: 'field',
    accents: 'accent',
    layerHover: 'layer-hover',
    layerActive: 'layer-active',
    layerSelected: 'layer-selected',
    fieldHover: 'field-hover',
    accentHover: 'layer-accent-hover',
    accentActive: 'layer-accent-active',
    helperText: 'text-helper',
    placeholderText: 'text-placeholder',
    helperIcons: 'icon-helper',
    placeholderIcons: 'icon-placeholder',
    strongBorders: 'border-strong',
    subtleBorders: 'border-subtle',
    skeletons: 'skeleton',
  };

  for (const [key, group] of Object.entries(groups) as [
    keyof ContextualGroups,
    Record<SurfaceContext, GeneratedColorToken>,
  ][]) {
    const groupName = groupNames[key];
    for (const context of contexts) {
      const token = group[context];
      const name = `${groupName}-${context}`;
      if (!token) {
        errors.push({
          token: name,
          message: 'Token is missing',
          severity: 'error',
        });
        continue;
      }
      validateBaseToken(name, token, errors, warnings);
    }
  }

  for (const token of [
    theme.brand,
    theme.base,
    theme.textPrimary,
    theme.textSecondary,
    theme.textOnColor,
    theme.iconPrimary,
    theme.iconSecondary,
    theme.borderInverse,
    theme.borderInteractive,
    theme.textDisabled,
    theme.iconDisabled,
  ]) {
    validateBaseToken(token.name, token, errors, warnings);
  }

  const helperTarget = theme.contrastTargets.helperText;
  const borderTarget = theme.contrastTargets.strongBorder;

  validateContrast(
    theme,
    'text-helper',
    theme.helperText,
    helperTarget,
    errors
  );
  validateContrast(
    theme,
    'border-strong',
    theme.strongBorders,
    borderTarget,
    errors
  );
  validateFallbackContrast(
    theme,
    'text-helper',
    theme.helperText,
    helperTarget,
    errors
  );
  validateFallbackContrast(
    theme,
    'border-strong',
    theme.strongBorders,
    borderTarget,
    errors
  );
  validateSingleTokenContrast(
    theme,
    theme.borderInverse,
    BORDER_INVERSE_TARGET,
    errors
  );
  validateSingleTokenContrast(
    theme,
    theme.borderInteractive,
    BORDER_INTERACTIVE_TARGET,
    errors
  );
  validatePlaceholderText(theme, errors);
  validateDisabledTokens(theme, errors);
  validateBrandFallback(theme, errors);
  validateTextOnColor(theme, errors);
  validateSupportTokens(theme, errors, warnings);
  validateInteractiveTokens(theme, errors, warnings);

  return {
    valid: errors.length === 0,
    issues: errors,
    warnings,
  };
}

/**
 * Validates the basic correctness invariants shared by every generated token:
 * valid lightness range, valid hex fallback, and sRGB gamut coverage.
 * Out-of-gamut is a warning (not an error) — wide-gamut colors are valid but
 * require a CSS @supports / fallback strategy in the consumer.
 */
function validateBaseToken(
  name: string,
  token: GeneratedColorToken,
  errors: ValidationIssue[],
  warnings: ValidationIssue[]
) {
  if (
    !Number.isFinite(token.color.lightness) ||
    token.color.lightness < 0 ||
    token.color.lightness > 1
  ) {
    errors.push({
      token: name,
      message: 'Lightness must be between 0 and 1',
      severity: 'error',
    });
  }
  if (!/^#[\da-f]{6}$/i.test(token.fallback)) {
    errors.push({
      token: name,
      message: 'Fallback must be a hex color',
      severity: 'error',
    });
  }
  if (token.gamutMapped) {
    warnings.push({
      token: name,
      severity: 'warning',
      message:
        'Token color is outside the sRGB gamut and the fallback hex was gamut-mapped. ' +
        'Ensure a CSS @supports or fallback strategy is in place for wide-gamut displays.',
    });
  }
}

function validateInteractiveTokens(
  theme: GeneratedOklchTheme,
  errors: ValidationIssue[],
  warnings: ValidationIssue[]
) {
  // Validate against the theme's own generated tokens, not defaultSpecification,
  // so custom-spec themes are correctly covered.
  for (const [state, token] of Object.entries(theme.interactive) as [
    InteractiveState,
    GeneratedColorToken,
  ][]) {
    const stateSpec = tokenSourceToSpec(token);
    const name = `state-${state}`;

    validateBaseToken(name, token, errors, warnings);

    // Alpha expectation is read from the spec — not a hardcoded name check.
    if (stateSpec.type === 'opacity') {
      if (token.alpha === undefined || token.alpha <= 0 || token.alpha >= 1) {
        errors.push({
          token: name,
          severity: 'error',
          message: `Opacity state must carry an alpha between 0 and 1 (exclusive); got ${token.alpha}`,
        });
      }
    } else {
      if (token.alpha !== undefined) {
        errors.push({
          token: name,
          severity: 'error',
          message: 'Non-opacity state tokens must not carry an alpha value',
        });
      }
    }
  }
}

function validateSupportTokens(
  theme: GeneratedOklchTheme,
  errors: ValidationIssue[],
  warnings: ValidationIssue[]
) {
  const supportTokens = [
    { name: 'support-error', token: theme.supportError },
    { name: 'support-success', token: theme.supportSuccess },
    { name: 'support-warning', token: theme.supportWarning },
    { name: 'support-info', token: theme.supportInfo },
    { name: 'support-error-inverse', token: theme.supportErrorInverse },
    { name: 'support-success-inverse', token: theme.supportSuccessInverse },
    { name: 'support-warning-inverse', token: theme.supportWarningInverse },
    { name: 'support-info-inverse', token: theme.supportInfoInverse },
  ];

  for (const { name, token } of supportTokens) {
    validateBaseToken(name, token, errors, warnings);
  }
}

/**
 * Reconstructs the effective `InteractiveStateSpec` variant from a generated
 * token's `source` field. This is the single source of truth — avoids coupling
 * validation to `defaultSpecification` or any hardcoded state names.
 */
function tokenSourceToSpec(token: GeneratedColorToken): InteractiveStateSpec {
  const { source } = token;
  if (source.type === 'interactive-opacity') {
    return {
      type: 'opacity',
      status: token.status,
      chroma: source.chroma,
      alpha: source.alpha,
    };
  }
  if (source.type === 'interactive-state') {
    return {
      type: 'lightness-delta',
      status: token.status,
      delta: source.delta,
    };
  }
  throw new Error(
    `validateTheme: token "${token.name}" is in theme.interactive but has an unexpected ` +
      `source type "${source.type}". Only "interactive-state" and "interactive-opacity" ` +
      `sources are valid for interactive tokens.`
  );
}

/**
 * Checks the contrast browsers without OKLCH support actually render: the 8-bit
 * hex `fallback` of each contrast token against its surface's hex `fallback`.
 */
function validateFallbackContrast(
  theme: GeneratedOklchTheme,
  groupName: string,
  group: GeneratedOklchTheme['helperText'],
  target: number,
  errors: ValidationIssue[]
) {
  for (const context of contexts) {
    const ratio = getHexContrastRatio(
      group[context].fallback,
      theme.surfaces[context].fallback
    );
    if (ratio + Number.EPSILON < target) {
      errors.push({
        token: `${groupName}-${context}`,
        severity: 'error',
        message:
          `Hex fallback expected at least ${target}:1 contrast against the ` +
          `${context} fallback, received ${ratio.toFixed(4)}:1 in the ` +
          `${theme.mode} theme`,
      });
    }
  }
}

/**
 * The brand `fallback` is a free-form hex supplied by the spec. Catch it
 * drifting from the OKLCH brand color (e.g. after overriding brand L/C/H
 * without updating the hex).
 */
function validateBrandFallback(
  theme: GeneratedOklchTheme,
  errors: ValidationIssue[]
) {
  const expected = oklchToHex(mapToSrgbGamut(theme.brand.color));
  const distance = Math.max(
    ...[1, 3, 5].map((index) =>
      Math.abs(
        parseInt(theme.brand.fallback.slice(index, index + 2), 16) -
          parseInt(expected.slice(index, index + 2), 16)
      )
    )
  );
  if (distance > BRAND_FALLBACK_CHANNEL_TOLERANCE) {
    errors.push({
      token: theme.brand.name,
      severity: 'error',
      message:
        `Brand fallback ${theme.brand.fallback} does not match the OKLCH brand ` +
        `color (${expected}); update brand.fallback in the specification`,
    });
  }
}

/**
 * Checks a non-contextual token against every surface, in both OKLCH math and
 * the 8-bit hex fallbacks browsers without OKLCH support render.
 */
function validateSingleTokenContrast(
  theme: GeneratedOklchTheme,
  token: GeneratedColorToken,
  target: number,
  errors: ValidationIssue[]
) {
  for (const context of contexts) {
    const surface = theme.surfaces[context];
    const oklchRatio = getContrastRatio(token.color, surface.color);
    const hexRatio = getHexContrastRatio(token.fallback, surface.fallback);
    for (const [kind, ratio] of [
      ['OKLCH', oklchRatio],
      ['hex fallback', hexRatio],
    ] as const) {
      if (ratio + Number.EPSILON < target) {
        errors.push({
          token: `${token.name}-${context}`,
          severity: 'error',
          message:
            `Expected at least ${target}:1 contrast (${kind}) against ${context}, ` +
            `received ${ratio.toFixed(4)}:1 in the ${theme.mode} theme`,
        });
      }
    }
  }
}

/**
 * Placeholder text is rendered inside fields, so every emitted
 * `text-placeholder-*` value must reach `PLACEHOLDER_TEXT_MIN_CONTRAST` against
 * EVERY `field-*` background, in OKLCH math and in the emitted hex fallbacks.
 * The minimum is a constant, not `theme.contrastTargets`, so a lowered
 * generation target cannot bypass it. Ratios are recomputed from the emitted
 * colours rather than read from `token.contrast`.
 */
function validatePlaceholderText(
  theme: GeneratedOklchTheme,
  errors: ValidationIssue[]
) {
  for (const context of contexts) {
    const placeholder = theme.placeholderText[context];
    contexts.forEach((fieldContext, fieldIndex) => {
      const field = theme.fields[fieldContext];
      for (const [kind, ratio] of [
        ['OKLCH', getContrastRatio(placeholder.color, field.color)],
        [
          'hex fallback',
          getHexContrastRatio(placeholder.fallback, field.fallback),
        ],
      ] as const) {
        if (ratio + Number.EPSILON < PLACEHOLDER_TEXT_MIN_CONTRAST) {
          errors.push({
            token: `text-placeholder-${context}`,
            severity: 'error',
            message:
              `Expected at least ${PLACEHOLDER_TEXT_MIN_CONTRAST}:1 contrast (${kind}) against ` +
              `field-0${fieldIndex + 1} (${fieldContext}), received ${ratio.toFixed(4)}:1 ` +
              `in the ${theme.mode} theme`,
          });
        }
      }
    });
  }
}

/** Disabled tokens must carry a fractional alpha, as the design rule is "25% opacity". */
function validateDisabledTokens(
  theme: GeneratedOklchTheme,
  errors: ValidationIssue[]
) {
  for (const token of [theme.textDisabled, theme.iconDisabled]) {
    if (token.alpha === undefined || token.alpha <= 0 || token.alpha >= 1) {
      errors.push({
        token: token.name,
        severity: 'error',
        message: `Disabled token must carry an alpha between 0 and 1 (exclusive); got ${token.alpha}`,
      });
    }
  }
}

/** `text-on-color` is rendered on the brand color, so it must meet AA there. */
function validateTextOnColor(
  theme: GeneratedOklchTheme,
  errors: ValidationIssue[]
) {
  const ratio = getHexContrastRatio(
    theme.textOnColor.fallback,
    theme.brand.fallback
  );
  if (ratio + Number.EPSILON < TEXT_ON_COLOR_TARGET) {
    errors.push({
      token: theme.textOnColor.name,
      severity: 'error',
      message:
        `Expected at least ${TEXT_ON_COLOR_TARGET}:1 contrast against the brand ` +
        `color, received ${ratio.toFixed(4)}:1 in the ${theme.mode} theme`,
    });
  }
}

function validateContrast(
  theme: GeneratedOklchTheme,
  groupName: string,
  group: GeneratedOklchTheme['helperText'],
  target: number,
  errors: ValidationIssue[]
) {
  for (const context of contexts) {
    const contrast = group[context].contrast ?? 0;
    if (contrast + Number.EPSILON < target) {
      errors.push({
        token: `${groupName}-${context}`,
        severity: 'error',
        message:
          `Expected at least ${target}:1 contrast against ${context}, received ` +
          `${contrast.toFixed(4)}:1 in the ${theme.mode} theme`,
      });
    }
  }
}
