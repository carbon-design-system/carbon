/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  clampLightness,
  formatOklch,
  isInSrgbGamut,
  mapToSrgbGamut,
  oklchToHex,
  type OklchColor,
} from './color';
import { findLightnessForContrast, getContrastRatio } from './contrast';
import {
  defaultSpecification,
  tokenRules,
  type OklchThemeSpecification,
  type RuleStatus,
  type SurfaceContext,
  type ThemeMode,
} from './specification';

type CalculationSource =
  | { type: 'fixed' }
  | { type: 'lightness-delta'; delta: number; relativeTo: SurfaceContext }
  | { type: 'contrast'; target: number; relativeTo: SurfaceContext }
  | { type: 'alias'; token: string };

export interface GeneratedColorToken {
  name: string;
  status: RuleStatus;
  context?: SurfaceContext;
  source: CalculationSource;
  color: OklchColor;
  oklch: string;
  fallback: string;
  inSrgbGamut: boolean;
  gamutMapped: boolean;
  contrast?: number;
}

export interface GeneratedOklchTheme {
  mode: ThemeMode;
  brand: GeneratedColorToken;
  base: GeneratedColorToken;
  textPrimary: GeneratedColorToken;
  textSecondary: GeneratedColorToken;
  iconPrimary: GeneratedColorToken;
  iconSecondary: GeneratedColorToken;
  surfaces: Record<SurfaceContext, GeneratedColorToken>;
  fields: Record<SurfaceContext, GeneratedColorToken>;
  accents: Record<SurfaceContext, GeneratedColorToken>;
  helperText: Record<SurfaceContext, GeneratedColorToken>;
  placeholderText: Record<SurfaceContext, GeneratedColorToken>;
  helperIcons: Record<SurfaceContext, GeneratedColorToken>;
  placeholderIcons: Record<SurfaceContext, GeneratedColorToken>;
  strongBorders: Record<SurfaceContext, GeneratedColorToken>;
  subtleBorders: Record<SurfaceContext, GeneratedColorToken>;
  skeletons: Record<SurfaceContext, GeneratedColorToken>;
}

const contexts: SurfaceContext[] = ['surface', 'surface-light', 'surface-dark'];

export function generateTheme(
  mode: ThemeMode,
  overrides: Partial<OklchThemeSpecification> = {}
): GeneratedOklchTheme {
  const specification = mergeSpecification(overrides);
  const modeSpecification = specification[mode];
  const { hue, chroma } = specification.neutral;
  const surfaceLightness = modeSpecification.surfaceLightness;
  const surfaces = Object.fromEntries(
    contexts.map((context) => {
      const offset =
        context === 'surface-light'
          ? modeSpecification.surfaceStep
          : context === 'surface-dark'
            ? -modeSpecification.surfaceStep
            : 0;
      return [
        context,
        createToken({
          name: context,
          status: tokenRules.surface.status,
          context,
          source: { type: 'fixed' },
          color: {
            lightness: clampLightness(surfaceLightness + offset),
            chroma,
            hue,
          },
        }),
      ];
    })
  ) as Record<SurfaceContext, GeneratedColorToken>;

  const helperText = mapDeltaOrContrast(
    'text-helper',
    tokenRules.helperText.status,
    surfaces,
    (background, context) =>
      createContrastToken(
        'text-helper',
        tokenRules.helperText.status,
        context,
        background.color,
        specification.contrastTargets.helperText,
        mode,
        chroma,
        hue
      )
  );

  return {
    mode,
    brand: createFixedToken(
      'brand',
      tokenRules.brand.status,
      {
        lightness: specification.brand.lightness,
        chroma: specification.brand.chroma,
        hue: specification.brand.hue,
      },
      specification.brand.fallback
    ),
    base: createFixedToken('base', tokenRules.base.status, {
      lightness: specification.baseLightness,
      chroma,
      hue,
    }),
    textPrimary: createFixedToken(
      'text-primary',
      tokenRules.textPrimary.status,
      {
        lightness: modeSpecification.textPrimaryLightness,
        chroma,
        hue,
      }
    ),
    textSecondary: createFixedToken(
      'text-secondary',
      tokenRules.textSecondary.status,
      {
        lightness: modeSpecification.textSecondaryLightness,
        chroma,
        hue,
      }
    ),
    iconPrimary: createFixedToken(
      'icon-primary',
      tokenRules.iconPrimary.status,
      {
        lightness: modeSpecification.iconPrimaryLightness,
        chroma,
        hue,
      }
    ),
    iconSecondary: createFixedToken(
      'icon-secondary',
      tokenRules.iconSecondary.status,
      {
        lightness: modeSpecification.iconSecondaryLightness,
        chroma,
        hue,
      }
    ),
    surfaces,
    fields: createDeltaTokens(
      'field',
      tokenRules.field.status,
      surfaces,
      modeSpecification.fieldDelta
    ),
    accents: createDeltaTokens(
      'accent',
      tokenRules.accent.status,
      surfaces,
      modeSpecification.accentDelta
    ),
    helperText,
    placeholderText: createAliasTokens(
      'text-placeholder',
      tokenRules.placeholderText.status,
      'text-helper',
      helperText
    ),
    helperIcons: createAliasTokens(
      'icon-helper',
      tokenRules.helperIcon.status,
      'text-helper',
      helperText
    ),
    placeholderIcons: createAliasTokens(
      'icon-placeholder',
      tokenRules.placeholderIcon.status,
      'text-helper',
      helperText
    ),
    strongBorders: mapDeltaOrContrast(
      'border-strong',
      tokenRules.strongBorder.status,
      surfaces,
      (background, context) =>
        createContrastToken(
          'border-strong',
          tokenRules.strongBorder.status,
          context,
          background.color,
          specification.contrastTargets.strongBorder,
          mode,
          chroma,
          hue
        )
    ),
    subtleBorders: createDeltaTokens(
      'border-subtle',
      tokenRules.subtleBorder.status,
      surfaces,
      modeSpecification.subtleBorderDelta
    ),
    skeletons: createDeltaTokens(
      'skeleton',
      tokenRules.skeleton.status,
      surfaces,
      modeSpecification.skeletonDelta
    ),
  };
}

function mapDeltaOrContrast(
  _name: string,
  _status: RuleStatus,
  surfaces: Record<SurfaceContext, GeneratedColorToken>,
  create: (
    surface: GeneratedColorToken,
    context: SurfaceContext
  ) => GeneratedColorToken
) {
  return Object.fromEntries(
    contexts.map((context) => [context, create(surfaces[context], context)])
  ) as Record<SurfaceContext, GeneratedColorToken>;
}

function createDeltaTokens(
  name: string,
  status: RuleStatus,
  surfaces: Record<SurfaceContext, GeneratedColorToken>,
  delta: number
) {
  return mapDeltaOrContrast(name, status, surfaces, (background, context) =>
    createToken({
      name,
      status,
      context,
      source: { type: 'lightness-delta', delta, relativeTo: context },
      color: adjustLightness(background.color, delta),
    })
  );
}

function createAliasTokens(
  name: string,
  status: RuleStatus,
  alias: string,
  sourceTokens: Record<SurfaceContext, GeneratedColorToken>
) {
  return Object.fromEntries(
    contexts.map((context) => [
      context,
      createToken({
        name,
        status,
        context,
        source: { type: 'alias', token: alias },
        color: sourceTokens[context].color,
        contrast: sourceTokens[context].contrast,
      }),
    ])
  ) as Record<SurfaceContext, GeneratedColorToken>;
}

function adjustLightness(color: OklchColor, delta: number): OklchColor {
  return {
    ...color,
    lightness: clampLightness(color.lightness + delta),
  };
}

function createContrastToken(
  name: string,
  status: RuleStatus,
  context: SurfaceContext,
  background: OklchColor,
  target: number,
  mode: ThemeMode,
  chroma: number,
  hue: number
) {
  const color = findLightnessForContrast({
    background,
    target,
    direction: mode === 'light' ? 'darker' : 'lighter',
    chroma,
    hue,
  });
  return createToken({
    name,
    status,
    context,
    source: { type: 'contrast', target, relativeTo: context },
    color,
    contrast: getContrastRatio(color, background),
  });
}

function createFixedToken(
  name: string,
  status: RuleStatus,
  color: OklchColor,
  fallback?: string
) {
  return createToken({
    name,
    status,
    source: { type: 'fixed' },
    color,
    fallback,
  });
}

function createToken({
  name,
  status,
  context,
  source,
  color,
  contrast,
  fallback,
}: {
  name: string;
  status: RuleStatus;
  context?: SurfaceContext;
  source: CalculationSource;
  color: OklchColor;
  contrast?: number;
  fallback?: string;
}): GeneratedColorToken {
  const inSrgbGamut = isInSrgbGamut(color);
  const fallbackColor = mapToSrgbGamut(color);
  return {
    name,
    status,
    ...(context ? { context } : {}),
    source,
    color,
    oklch: formatOklch(color),
    fallback: fallback ?? oklchToHex(fallbackColor),
    inSrgbGamut,
    gamutMapped: !inSrgbGamut,
    ...(contrast === undefined ? {} : { contrast }),
  };
}

function mergeSpecification(
  overrides: Partial<OklchThemeSpecification>
): OklchThemeSpecification {
  return {
    ...defaultSpecification,
    ...overrides,
    neutral: { ...defaultSpecification.neutral, ...overrides.neutral },
    brand: { ...defaultSpecification.brand, ...overrides.brand },
    contrastTargets: {
      ...defaultSpecification.contrastTargets,
      ...overrides.contrastTargets,
    },
    light: { ...defaultSpecification.light, ...overrides.light },
    dark: { ...defaultSpecification.dark, ...overrides.dark },
  };
}
