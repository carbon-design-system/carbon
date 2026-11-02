/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { generateTheme, type GeneratedColorToken } from './generate-theme';
import { surfaceContexts } from './specification';
import type { SurfaceContext, ThemeMode } from './specification';

const EXTENSION_NAMESPACE = 'com.ibm.carbon';

interface ColorTokenValue {
  colorSpace: 'oklch';
  components: [number, number, number];
  alpha?: number;
  hex: string;
}

interface ColorToken {
  $type: 'color';
  $value: ColorTokenValue;
  $description: string;
  $extensions: {
    [EXTENSION_NAMESPACE]: {
      status: GeneratedColorToken['status'];
      source: GeneratedColorToken['source'];
    };
  };
}

export interface GeneratedV12TokenFile {
  $schema: string;
  $description: string;
  $extensions: {
    [EXTENSION_NAMESPACE]: {
      experimental: true;
      'color-scheme': ThemeMode;
    };
  };
  [token: string]: unknown;
}

const contexts = surfaceContexts;

function buildThemeTokens(mode: ThemeMode) {
  const theme = generateTheme(mode);

  return {
    'background-brand': toToken(theme.brand, 'Brand background color.'),
    base: toToken(theme.base, 'Shared dark base color.'),
    ...toContextTokens(theme.surfaces, 'Contextual surface', 'layer-'),
    ...toContextTokens(theme.accents, 'Contextual accent', 'layer-accent-'),
    ...toContextTokens(theme.fields, 'Contextual field', 'field-'),
    'text-primary': toToken(theme.textPrimary, 'Primary text color.'),
    'text-secondary': toToken(theme.textSecondary, 'Secondary text color.'),
    ...toContextTokens(
      theme.helperText,
      'Contextual helper text',
      'text-helper-'
    ),
    ...toContextTokens(
      theme.placeholderText,
      'Contextual placeholder text',
      'text-placeholder-'
    ),
    'icon-primary': toToken(theme.iconPrimary, 'Primary icon color.'),
    'icon-secondary': toToken(theme.iconSecondary, 'Secondary icon color.'),
    ...toContextTokens(
      theme.helperIcons,
      'Contextual helper icon',
      'icon-helper-'
    ),
    ...toContextTokens(
      theme.placeholderIcons,
      'Contextual placeholder icon',
      'icon-placeholder-'
    ),
    ...toContextTokens(
      theme.strongBorders,
      'Contextual strong border',
      'border-strong-'
    ),
    ...toContextTokens(
      theme.subtleBorders,
      'Contextual subtle border',
      'border-subtle-'
    ),
    ...toContextTokens(
      theme.skeletons,
      'Contextual skeleton background',
      'skeleton-background-'
    ),
    ...Object.fromEntries(
      (
        Object.entries(theme.interactive) as [string, GeneratedColorToken][]
      ).map(([state, token]) => [
        `state-${state}`,
        toToken(token, `Interactive ${state} state background.`),
      ])
    ),
  };
}

/**
 * Generates the content of each V12 theme's token file.
 */
export function generateV12Tokens(): Record<ThemeMode, GeneratedV12TokenFile> {
  return {
    light: buildTokenFile('light'),
    dark: buildTokenFile('dark'),
  };
}

function buildTokenFile(mode: ThemeMode): GeneratedV12TokenFile {
  return {
    $schema: 'https://www.designtokens.org/schemas/2025.10/format.json',
    $description: `Experimental Carbon V12 ${mode} theme tokens generated from the OKLCH specification.`,
    $extensions: {
      [EXTENSION_NAMESPACE]: {
        experimental: true,
        'color-scheme': mode,
      },
    },
    ...buildThemeTokens(mode),
  };
}

function toContextTokens(
  tokens: Record<SurfaceContext, GeneratedColorToken>,
  description: string,
  prefix: string
) {
  return Object.fromEntries(
    contexts.map((context, index) => [
      `${prefix}0${index + 1}`,
      toToken(
        tokens[context],
        `${description} for surface context ${index + 1}.`
      ),
    ])
  );
}

function toToken(token: GeneratedColorToken, description: string): ColorToken {
  return {
    $type: 'color',
    $value: {
      colorSpace: 'oklch',
      components: [token.color.lightness, token.color.chroma, token.color.hue],
      ...(token.alpha !== undefined && token.alpha < 1
        ? { alpha: token.alpha }
        : {}),
      hex: token.fallback,
    },
    $description: description,
    $extensions: {
      [EXTENSION_NAMESPACE]: {
        status: token.status,
        source: token.source,
      },
    },
  };
}
