/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { generateTheme, type GeneratedColorToken } from './generate-theme';
import type { SurfaceContext, ThemeMode } from './specification';

interface DtcgColorValue {
  colorSpace: 'oklch';
  components: [number, number, number];
  alpha: 1;
  hex: string;
}

interface DtcgColorToken {
  $type: 'color';
  $value: DtcgColorValue;
  $description: string;
  $extensions: {
    'org.carbon': {
      status: GeneratedColorToken['status'];
      source: GeneratedColorToken['source'];
      fallback: string;
    };
  };
}

export interface GeneratedV12DtcgThemes {
  $schema: string;
  $description: string;
  $extensions: {
    'org.carbon': {
      experimental: true;
    };
  };
  themes: {
    [mode in ThemeMode]: {
      $extensions: { 'org.carbon': { 'color-scheme': mode } };
      [group: string]: unknown;
    };
  };
}

const contexts: SurfaceContext[] = ['surface', 'surface-light', 'surface-dark'];

function buildThemeTokens(mode: ThemeMode) {
  const theme = generateTheme(mode);

  return {
    $extensions: {
      'org.carbon': {
        'color-scheme': mode,
      },
    },
    background: {
      brand: toDtcgToken(theme.brand, 'Brand background color.'),
    },
    base: toDtcgToken(theme.base, 'Shared dark base color.'),
    layer: {
      ...toContextTokens(theme.surfaces, 'Contextual surface'),
      ...toContextTokens(theme.accents, 'Contextual accent', 'accent-'),
    },
    field: toContextTokens(theme.fields, 'Contextual field'),
    text: {
      primary: toDtcgToken(theme.textPrimary, 'Primary text color.'),
      secondary: toDtcgToken(theme.textSecondary, 'Secondary text color.'),
      ...toContextTokens(theme.helperText, 'Contextual helper text', 'helper-'),
      ...toContextTokens(
        theme.placeholderText,
        'Contextual placeholder text',
        'placeholder-'
      ),
    },
    icon: {
      primary: toDtcgToken(theme.iconPrimary, 'Primary icon color.'),
      secondary: toDtcgToken(theme.iconSecondary, 'Secondary icon color.'),
      ...toContextTokens(
        theme.helperIcons,
        'Contextual helper icon',
        'helper-'
      ),
      ...toContextTokens(
        theme.placeholderIcons,
        'Contextual placeholder icon',
        'placeholder-'
      ),
    },
    border: {
      ...toContextTokens(
        theme.strongBorders,
        'Contextual strong border',
        'strong-'
      ),
      ...toContextTokens(
        theme.subtleBorders,
        'Contextual subtle border',
        'subtle-'
      ),
    },
    skeleton: toContextTokens(
      theme.skeletons,
      'Contextual skeleton background',
      'background-'
    ),
  };
}

export function generateV12DtcgThemes(): GeneratedV12DtcgThemes {
  return {
    $schema: 'https://tr.designtokens.org/format/',
    $description:
      'Experimental Carbon V12 themes (light + dark) generated from the OKLCH specification.',
    $extensions: {
      'org.carbon': {
        experimental: true,
      },
    },
    themes: {
      light: buildThemeTokens(
        'light'
      ) as GeneratedV12DtcgThemes['themes']['light'],
      dark: buildThemeTokens(
        'dark'
      ) as GeneratedV12DtcgThemes['themes']['dark'],
    },
  };
}

function toContextTokens(
  tokens: Record<SurfaceContext, GeneratedColorToken>,
  description: string,
  prefix = ''
) {
  return Object.fromEntries(
    contexts.map((context, index) => [
      `${prefix}0${index + 1}`,
      toDtcgToken(
        tokens[context],
        `${description} for surface context ${index + 1}.`
      ),
    ])
  );
}

function toDtcgToken(
  token: GeneratedColorToken,
  description: string
): DtcgColorToken {
  return {
    $type: 'color',
    $value: {
      colorSpace: 'oklch',
      components: [token.color.lightness, token.color.chroma, token.color.hue],
      alpha: 1,
      hex: token.fallback,
    },
    $description: description,
    $extensions: {
      'org.carbon': {
        status: token.status,
        source: token.source,
        fallback: token.fallback,
      },
    },
  };
}
