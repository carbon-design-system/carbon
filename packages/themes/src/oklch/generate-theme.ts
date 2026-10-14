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
  surfaceContexts,
  tokenRules,
  type InteractiveState,
  type InteractiveStateSpec,
  type OklchThemeSpecification,
  type RuleStatus,
  type SurfaceContext,
  type ThemeMode,
} from './specification';

/**
 * Records how a token's color was computed. Stored on every `GeneratedColorToken`
 * so consumers and validators can audit provenance without re-running the pipeline.
 */
type CalculationSource =
  | { type: 'fixed' }
  | { type: 'lightness-delta'; delta: number; relativeTo: SurfaceContext }
  | { type: 'contrast'; target: number; relativeTo: SurfaceContext }
  | { type: 'alias'; token: string }
  | { type: 'interactive-state'; state: InteractiveState; delta: number }
  | {
      type: 'interactive-opacity';
      state: InteractiveState;
      chroma: number;
      alpha: number;
    };

/** A single resolved color token produced by `generateTheme`. */
export interface GeneratedColorToken {
  /** CSS custom-property stem (e.g. `"surface"` → `--cds-surface`). */
  name: string;
  status: RuleStatus;
  /** Present on contextual tokens that vary across surface layers. */
  context?: SurfaceContext;
  /** How this token's color was derived — see `CalculationSource`. */
  source: CalculationSource;
  /** The resolved OKLCH color (may be outside sRGB gamut for brand tokens). */
  color: OklchColor;
  /** Pre-formatted CSS `oklch()` string. */
  oklch: string;
  /** Gamut-mapped hex fallback for `oklch()`-unaware environments. */
  fallback: string;
  /** True when `color` is within the sRGB gamut without mapping. */
  inSrgbGamut: boolean;
  /** True when `fallback` was produced by chroma-reduction, not exact conversion. */
  gamutMapped: boolean;
  /** WCAG contrast ratio against the contextual surface. Present on contrast tokens only. */
  contrast?: number;
  /** Alpha (0–1) for `opacity`-type interactive state tokens. Absent on all other tokens. */
  alpha?: number;
}

/** The full set of color tokens produced for a single theme mode. */
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
  /** Interactive state tokens keyed by state name. */
  interactive: Record<InteractiveState, GeneratedColorToken>;
}

// Local alias — surfaceContexts drives iteration order and DTCG numbering.
const contexts = surfaceContexts;

/**
 * Generates all color tokens for the given `mode` from the OKLCH specification.
 *
 * Pass `overrides` to customize individual values without replacing the full
 * specification. Partial `interactive` overrides deep-merge — unspecified
 * states keep their default values.
 *
 * Throws if the specification produces contrast targets that cannot be met
 * (e.g. extreme `surfaceLightness` values). The error message names the
 * failing token and suggests which spec fields to adjust.
 */
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
    interactive: createInteractiveTokens(
      modeSpecification.interactive,
      surfaces['surface'],
      chroma,
      hue
    ),
  };
}

/**
 * Generates all interactive-state tokens relative to the default surface color
 * for the current mode. Iterates over the `InteractiveStateModeSpec` record so
 * adding a new state requires only one entry in the specification — no changes
 * here.
 *
 * - `lightness-delta` states: shift the surface L by `delta`.
 * - `opacity` states: keep the surface color but apply an alpha channel.
 */
function createInteractiveTokens(
  spec: OklchThemeSpecification['light']['interactive'],
  surface: GeneratedColorToken,
  chroma: number,
  hue: number
): Record<InteractiveState, GeneratedColorToken> {
  const baseLightness = surface.color.lightness;

  return Object.fromEntries(
    (Object.entries(spec) as [InteractiveState, InteractiveStateSpec][]).map(
      ([state, stateSpec]) => {
        // status comes from the spec entry — no separate tokenRules lookup needed.
        const { status } = stateSpec;
        let base: GeneratedColorToken;
        let token: GeneratedColorToken;

        if (stateSpec.type === 'lightness-delta') {
          base = createToken({
            name: `state-${state}`,
            status,
            source: {
              type: 'interactive-state',
              state,
              delta: stateSpec.delta,
            },
            color: {
              lightness: clampLightness(baseLightness + stateSpec.delta),
              chroma,
              hue,
            },
          });
          token = base;
        } else {
          base = createToken({
            name: `state-${state}`,
            status,
            source: {
              type: 'interactive-opacity',
              state,
              chroma: stateSpec.chroma,
              alpha: stateSpec.alpha,
            },
            color: { lightness: baseLightness, chroma: stateSpec.chroma, hue },
          });
          token = { ...base, alpha: stateSpec.alpha };
        }

        return [state, token];
      }
    )
  ) as Record<InteractiveState, GeneratedColorToken>;
}

/**
 * Applies `create` to each surface context and returns the result as a
 * `Record<SurfaceContext, GeneratedColorToken>`. The `_name` and `_status`
 * params are accepted for call-site symmetry with `createDeltaTokens` but
 * are not used here — the caller's `create` function is responsible for
 * embedding them in the token it returns.
 */
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
  let color: OklchColor;
  try {
    color = findLightnessForContrast({
      background,
      target,
      direction: mode === 'light' ? 'darker' : 'lighter',
      chroma,
      hue,
    });
  } catch (cause) {
    throw new Error(
      `generateTheme(${mode}): cannot meet ${target}:1 contrast for token "${name}" ` +
        `in context "${context}" against surface L=${background.lightness.toFixed(4)}. ` +
        `Check surfaceLightness and contrastTargets in your specification.`,
      { cause }
    );
  }
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
    light: mergeModeSpec(defaultSpecification.light, overrides.light),
    dark: mergeModeSpec(defaultSpecification.dark, overrides.dark),
  };
}

/**
 * Merges a mode specification, deep-merging the `interactive` record so that
 * a partial override (e.g. changing only `hover`) does not silently drop the
 * other interactive states.
 */
function mergeModeSpec(
  base: OklchThemeSpecification['light'],
  override: Partial<OklchThemeSpecification['light']> | undefined
): OklchThemeSpecification['light'] {
  if (!override) return base;
  return {
    ...base,
    ...override,
    interactive: {
      ...base.interactive,
      ...override.interactive,
    },
  };
}
