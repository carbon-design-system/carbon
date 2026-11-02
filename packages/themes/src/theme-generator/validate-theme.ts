/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {
  GeneratedOklchTheme,
  GeneratedColorToken,
} from './generate-theme';
import {
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
    theme.iconPrimary,
    theme.iconSecondary,
  ]) {
    validateBaseToken(token.name, token, errors, warnings);
  }

  validateContrast(theme, 'text-helper', theme.helperText, 4.5, errors);
  validateContrast(theme, 'border-strong', theme.strongBorders, 3, errors);
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
