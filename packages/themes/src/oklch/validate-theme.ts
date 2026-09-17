/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { GeneratedOklchTheme } from './generate-theme';
import type { SurfaceContext } from './specification';

export interface ValidationIssue {
  token: string;
  message: string;
}

export interface ThemeValidationResult {
  valid: boolean;
  issues: ValidationIssue[];
}

const contexts: SurfaceContext[] = ['surface', 'surface-light', 'surface-dark'];

export function validateTheme(
  theme: GeneratedOklchTheme
): ThemeValidationResult {
  const issues: ValidationIssue[] = [];
  const groups = {
    surface: theme.surfaces,
    field: theme.fields,
    accent: theme.accents,
    'text-helper': theme.helperText,
    'text-placeholder': theme.placeholderText,
    'icon-helper': theme.helperIcons,
    'icon-placeholder': theme.placeholderIcons,
    'border-strong': theme.strongBorders,
    'border-subtle': theme.subtleBorders,
    skeleton: theme.skeletons,
  };

  for (const [groupName, group] of Object.entries(groups)) {
    for (const context of contexts) {
      const token = group[context];
      const name = `${groupName}-${context}`;
      if (!token) {
        issues.push({ token: name, message: 'Token is missing' });
        continue;
      }
      if (
        !Number.isFinite(token.color.lightness) ||
        token.color.lightness < 0 ||
        token.color.lightness > 1
      ) {
        issues.push({
          token: name,
          message: 'Lightness must be between 0 and 1',
        });
      }
      if (!/^#[\da-f]{6}$/i.test(token.fallback)) {
        issues.push({ token: name, message: 'Fallback must be a hex color' });
      }
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
    if (!/^#[\da-f]{6}$/i.test(token.fallback)) {
      issues.push({
        token: token.name,
        message: 'Fallback must be a hex color',
      });
    }
  }

  validateContrast(theme, 'text-helper', theme.helperText, 4.5, issues);
  validateContrast(theme, 'border-strong', theme.strongBorders, 3, issues);

  return { valid: issues.length === 0, issues };
}

function validateContrast(
  theme: GeneratedOklchTheme,
  groupName: string,
  group: GeneratedOklchTheme['helperText'],
  target: number,
  issues: ValidationIssue[]
) {
  for (const context of contexts) {
    const contrast = group[context].contrast ?? 0;
    if (contrast + Number.EPSILON < target) {
      issues.push({
        token: `${groupName}-${context}`,
        message: `Expected at least ${target}:1 contrast against ${context}, received ${contrast.toFixed(
          4
        )}:1 in the ${theme.mode} theme`,
      });
    }
  }
}
