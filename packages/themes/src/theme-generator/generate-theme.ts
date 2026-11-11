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
  normalizeHue,
  oklchToHex,
  type OklchColor,
} from './color';
import {
  findLightnessForContrast,
  findLightnessForContrastAgainstAll,
  getContrastRatio,
} from './contrast';
import {
  PLACEHOLDER_TEXT_MIN_CONTRAST,
  defaultSpecification,
  surfaceContexts,
  tokenRules,
  type InteractiveState,
  type InteractiveStateSpec,
  type ThemeSpecification,
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
  | {
      /** One value solved against every listed field background at once. */
      type: 'shared-contrast';
      target: number;
      relativeTo: 'field';
      contexts: SurfaceContext[];
    }
  | { type: 'alias'; token: string }
  | {
      type: 'opacity';
      parent: string;
      chroma: number;
      alpha: number;
    }
  | { type: 'floor'; delta: number; floor: number; relativeTo: SurfaceContext }
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
  /**
   * WCAG contrast ratio against the contextual surface (the contextual field
   * for `text-placeholder`). Present on contrast tokens only.
   */
  contrast?: number;
  /** Alpha (0–1) for `opacity`-type interactive state tokens. Absent on all other tokens. */
  alpha?: number;
}

/** The full set of color tokens produced for a single theme mode. */
export interface GeneratedOklchTheme {
  mode: ThemeMode;
  contrastTargets: {
    helperText: number;
    strongBorder: number;
  };
  brand: GeneratedColorToken;
  base: GeneratedColorToken;
  textPrimary: GeneratedColorToken;
  textSecondary: GeneratedColorToken;
  textOnColor: GeneratedColorToken;
  textDisabled: GeneratedColorToken;
  iconPrimary: GeneratedColorToken;
  iconSecondary: GeneratedColorToken;
  iconDisabled: GeneratedColorToken;
  borderInverse: GeneratedColorToken;
  borderInteractive: GeneratedColorToken;
  supportError: GeneratedColorToken;
  supportSuccess: GeneratedColorToken;
  supportWarning: GeneratedColorToken;
  supportInfo: GeneratedColorToken;
  supportErrorInverse: GeneratedColorToken;
  supportSuccessInverse: GeneratedColorToken;
  supportWarningInverse: GeneratedColorToken;
  supportInfoInverse: GeneratedColorToken;
  surfaces: Record<SurfaceContext, GeneratedColorToken>;
  fields: Record<SurfaceContext, GeneratedColorToken>;
  accents: Record<SurfaceContext, GeneratedColorToken>;
  layerHover: Record<SurfaceContext, GeneratedColorToken>;
  layerActive: Record<SurfaceContext, GeneratedColorToken>;
  layerSelected: Record<SurfaceContext, GeneratedColorToken>;
  fieldHover: Record<SurfaceContext, GeneratedColorToken>;
  accentHover: Record<SurfaceContext, GeneratedColorToken>;
  accentActive: Record<SurfaceContext, GeneratedColorToken>;
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
  overrides: Partial<ThemeSpecification> = {}
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

  const helperText = mapSurfaceContexts(surfaces, (background, context) =>
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

  const brand = createFixedToken(
    'brand',
    tokenRules.brand.status,
    {
      lightness: specification.brand.lightness,
      chroma: specification.brand.chroma,
      hue: specification.brand.hue,
    },
    specification.brand.fallback
  );
  const textPrimary = createFixedToken(
    'text-primary',
    tokenRules.textPrimary.status,
    { lightness: modeSpecification.textPrimaryLightness, chroma, hue }
  );
  const iconPrimary = createFixedToken(
    'icon-primary',
    tokenRules.iconPrimary.status,
    { lightness: modeSpecification.iconPrimaryLightness, chroma, hue }
  );
  const fields = createDeltaTokens(
    'field',
    tokenRules.field.status,
    surfaces,
    modeSpecification.fieldDelta
  );
  const accents = createDeltaTokens(
    'accent',
    tokenRules.accent.status,
    surfaces,
    modeSpecification.accentDelta,
    modeSpecification.accentFloor
  );
  const placeholderText = createSharedFieldContrastTokens(
    'text-placeholder',
    tokenRules.placeholderText.status,
    fields,
    // The configured target may raise the requirement but never lower it
    // below the accessibility minimum.
    Math.max(
      specification.contrastTargets.helperText,
      PLACEHOLDER_TEXT_MIN_CONTRAST
    ),
    mode,
    chroma,
    hue
  );

  return {
    mode,
    contrastTargets: specification.contrastTargets,
    brand,
    base: createFixedToken('base', tokenRules.base.status, {
      lightness: specification.baseLightness,
      chroma,
      hue,
    }),
    textPrimary,
    textSecondary: createFixedToken(
      'text-secondary',
      tokenRules.textSecondary.status,
      {
        lightness: modeSpecification.textSecondaryLightness,
        chroma,
        hue,
      }
    ),
    textOnColor: createFixedToken(
      'text-on-color',
      tokenRules.textOnColor.status,
      {
        lightness: specification.textOnColor.lightness,
        chroma: specification.textOnColor.chroma,
        hue: specification.textOnColor.hue,
      },
      specification.textOnColor.fallback
    ),
    textDisabled: createDisabledToken(
      'text-disabled',
      tokenRules.textDisabled.status,
      textPrimary,
      modeSpecification.interactive.disabled
    ),
    iconPrimary,
    iconDisabled: createDisabledToken(
      'icon-disabled',
      tokenRules.iconDisabled.status,
      iconPrimary,
      modeSpecification.interactive.disabled
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
    borderInverse: createFixedToken(
      'border-inverse',
      tokenRules.borderInverse.status,
      {
        lightness: modeSpecification.borderInverseLightness,
        chroma,
        hue,
      }
    ),
    borderInteractive: createFixedToken(
      'border-interactive',
      tokenRules.borderInteractive.status,
      modeSpecification.borderInteractive === 'brand'
        ? brand.color
        : {
            lightness: modeSpecification.borderInteractive.lightness,
            chroma: modeSpecification.borderInteractive.chroma,
            hue: specification.brand.hue,
          },
      modeSpecification.borderInteractive === 'brand'
        ? specification.brand.fallback
        : undefined
    ),
    supportError: createFixedToken(
      'support-error',
      tokenRules.supportError.status,
      modeSpecification.support.error,
      modeSpecification.support.error.fallback
    ),
    supportSuccess: createFixedToken(
      'support-success',
      tokenRules.supportSuccess.status,
      modeSpecification.support.success,
      modeSpecification.support.success.fallback
    ),
    supportWarning: createFixedToken(
      'support-warning',
      tokenRules.supportWarning.status,
      modeSpecification.support.warning,
      modeSpecification.support.warning.fallback
    ),
    supportInfo: createFixedToken(
      'support-info',
      tokenRules.supportInfo.status,
      modeSpecification.support.info,
      modeSpecification.support.info.fallback
    ),
    supportErrorInverse: createFixedToken(
      'support-error-inverse',
      tokenRules.supportErrorInverse.status,
      modeSpecification.support.errorInverse,
      modeSpecification.support.errorInverse.fallback
    ),
    supportSuccessInverse: createFixedToken(
      'support-success-inverse',
      tokenRules.supportSuccessInverse.status,
      modeSpecification.support.successInverse,
      modeSpecification.support.successInverse.fallback
    ),
    supportWarningInverse: createFixedToken(
      'support-warning-inverse',
      tokenRules.supportWarningInverse.status,
      modeSpecification.support.warningInverse,
      modeSpecification.support.warningInverse.fallback
    ),
    supportInfoInverse: createFixedToken(
      'support-info-inverse',
      tokenRules.supportInfoInverse.status,
      modeSpecification.support.infoInverse,
      modeSpecification.support.infoInverse.fallback
    ),
    surfaces,
    fields,
    accents,
    layerHover: createPerParentStateTokens(
      'layer-hover',
      'hover',
      surfaces,
      modeSpecification.interactive.hover
    ),
    layerActive: createPerParentStateTokens(
      'layer-active',
      'active',
      surfaces,
      modeSpecification.interactive.active
    ),
    layerSelected: createPerParentStateTokens(
      'layer-selected',
      'selected',
      surfaces,
      modeSpecification.interactive.selected
    ),
    fieldHover: createPerParentStateTokens(
      'field-hover',
      'hover',
      fields,
      modeSpecification.interactive.hover
    ),
    accentHover: createPerParentStateTokens(
      'layer-accent-hover',
      'hover',
      accents,
      modeSpecification.interactive.hover
    ),
    accentActive: createPerParentStateTokens(
      'layer-accent-active',
      'active',
      accents,
      modeSpecification.interactive.active
    ),
    helperText,
    placeholderText,
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
    strongBorders: mapSurfaceContexts(surfaces, (background, context) =>
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
      modeSpecification.skeletonDelta,
      modeSpecification.skeletonFloor
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
  spec: ThemeSpecification['light']['interactive'],
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
 * Generates per-parent neutral interactive state tokens by shifting the parent
 * token's lightness by the state's delta, keeping hue and chroma constant.
 * The token status is the state's own status (PROVISIONAL(Q3)).
 */
function createPerParentStateTokens(
  name: string,
  state: InteractiveState,
  parents: Record<SurfaceContext, GeneratedColorToken>,
  stateSpec: InteractiveStateSpec
): Record<SurfaceContext, GeneratedColorToken> {
  if (stateSpec.type !== 'lightness-delta') {
    throw new Error(
      `Cannot build "${name}": interactive.${state} must be of type "lightness-delta".`
    );
  }
  const { delta } = stateSpec;
  return Object.fromEntries(
    contexts.map((context) => {
      const parent = parents[context];
      return [
        context,
        createToken({
          name: `${name}-${context}`,
          status: stateSpec.status,
          context,
          source: { type: 'interactive-state', state, delta },
          color: {
            lightness: clampLightness(parent.color.lightness + delta),
            chroma: parent.color.chroma,
            hue: parent.color.hue,
          },
        }),
      ];
    })
  ) as Record<SurfaceContext, GeneratedColorToken>;
}

/**
 * Applies `create` to each surface and returns the result keyed by
 * `SurfaceContext`.
 */
function mapSurfaceContexts(
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

/**
 * Offsets each surface's lightness by `delta`. When `floor` is above 0 the
 * result is clamped to at least `floor`, and the token's `source` records the
 * floor so the clamp is auditable.
 */
function createDeltaTokens(
  name: string,
  status: RuleStatus,
  surfaces: Record<SurfaceContext, GeneratedColorToken>,
  delta: number,
  floor = 0
) {
  return mapSurfaceContexts(surfaces, (background, context) => {
    const unclamped = adjustLightness(background.color, delta);
    const floored = floor > 0 && unclamped.lightness < floor;
    return createToken({
      name,
      status,
      context,
      source: floored
        ? { type: 'floor', delta, floor, relativeTo: context }
        : { type: 'lightness-delta', delta, relativeTo: context },
      color: floored ? { ...unclamped, lightness: floor } : unclamped,
    });
  });
}

/**
 * Builds a "disabled" variant of `parent`: same lightness and hue, chroma
 * replaced by the spec's disabled chroma, rendered at the spec's alpha.
 * Design rule: disabled = chroma 0.004 at 25% opacity, in both themes.
 */
function createDisabledToken(
  name: string,
  status: RuleStatus,
  parent: GeneratedColorToken,
  disabled: InteractiveStateSpec
): GeneratedColorToken {
  if (disabled.type !== 'opacity') {
    throw new Error(
      `Cannot build "${name}": interactive.disabled must be of type "opacity".`
    );
  }
  const token = createToken({
    name,
    status,
    source: {
      type: 'opacity',
      parent: parent.name,
      chroma: disabled.chroma,
      alpha: disabled.alpha,
    },
    color: { ...parent.color, chroma: disabled.chroma },
  });
  return { ...token, alpha: disabled.alpha };
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

/**
 * Solves ONE foreground colour that meets `target`:1 against every field
 * background (OKLCH and 8-bit hex) and emits it under each surface context.
 * Field colours are inputs only and are never modified. Throws, naming each
 * conflicting field and its required/achievable ratio, if no lightness
 * satisfies all of them.
 */
function createSharedFieldContrastTokens(
  name: string,
  status: RuleStatus,
  fields: Record<SurfaceContext, GeneratedColorToken>,
  target: number,
  mode: ThemeMode,
  chroma: number,
  hue: number
) {
  let color: OklchColor;
  try {
    color = findLightnessForContrastAgainstAll({
      backgrounds: contexts.map((context, index) => ({
        name: `field-0${index + 1}`,
        color: fields[context].color,
      })),
      target,
      direction: mode === 'light' ? 'darker' : 'lighter',
      chroma,
      hue,
    });
  } catch (cause) {
    throw new Error(
      `generateTheme(${mode}): cannot find one "${name}" value meeting ${target}:1 ` +
        `against all field backgrounds. ${(cause as Error).message}. ` +
        `Check fieldDelta, surfaceLightness and contrastTargets in your specification.`,
      { cause }
    );
  }
  return Object.fromEntries(
    contexts.map((context) => [
      context,
      createToken({
        name,
        status,
        context,
        source: {
          type: 'shared-contrast',
          target,
          relativeTo: 'field',
          contexts: [...contexts],
        },
        color,
        contrast: getContrastRatio(color, fields[context].color),
      }),
    ])
  ) as Record<SurfaceContext, GeneratedColorToken>;
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

const ALLOWED_TOP_LEVEL_KEYS = new Set([
  'neutral',
  'brand',
  'baseLightness',
  'textOnColor',
  'contrastTargets',
  'light',
  'dark',
]);

const ALLOWED_NEUTRAL_KEYS = new Set(['hue', 'chroma']);
const ALLOWED_TEXT_ON_COLOR_KEYS = new Set([
  'lightness',
  'chroma',
  'hue',
  'fallback',
]);
const ALLOWED_BORDER_INTERACTIVE_KEYS = new Set(['lightness', 'chroma']);
const ALLOWED_BRAND_KEYS = new Set(['lightness', 'chroma', 'hue', 'fallback']);
const ALLOWED_CONTRAST_KEYS = new Set(['helperText', 'strongBorder']);
const ALLOWED_MODE_KEYS = new Set([
  'surfaceLightness',
  'surfaceStep',
  'fieldDelta',
  'accentDelta',
  'subtleBorderDelta',
  'skeletonDelta',
  'accentFloor',
  'skeletonFloor',
  'borderInverseLightness',
  'borderInteractive',
  'textPrimaryLightness',
  'textSecondaryLightness',
  'iconPrimaryLightness',
  'iconSecondaryLightness',
  'support',
  'interactive',
]);
const ALLOWED_SUPPORT_FAMILY_KEYS = new Set([
  'error',
  'success',
  'warning',
  'info',
  'errorInverse',
  'successInverse',
  'warningInverse',
  'infoInverse',
]);
const ALLOWED_SUPPORT_COLOR_KEYS = new Set([
  'lightness',
  'chroma',
  'hue',
  'fallback',
]);
const ALLOWED_INTERACTIVE_STATE_KEYS = new Set([
  'hover',
  'selected',
  'active',
  'disabled',
]);
const ALLOWED_STATE_SPEC_KEYS = new Set([
  'type',
  'status',
  'delta',
  'chroma',
  'alpha',
  'reason',
]);

function validateUnknownKeys(obj: unknown, allowed: Set<string>, path: string) {
  if (typeof obj !== 'object' || obj === null) return;
  for (const key of Object.keys(obj)) {
    if (!allowed.has(key)) {
      throw new Error(`Unknown override key "${key}" at "${path}"`);
    }
  }
}

function validateOverrides(overrides: Partial<ThemeSpecification>) {
  validateUnknownKeys(overrides, ALLOWED_TOP_LEVEL_KEYS, 'overrides');
  if (overrides.neutral) {
    validateUnknownKeys(
      overrides.neutral,
      ALLOWED_NEUTRAL_KEYS,
      'overrides.neutral'
    );
  }
  if (overrides.brand) {
    validateUnknownKeys(overrides.brand, ALLOWED_BRAND_KEYS, 'overrides.brand');
  }
  if (overrides.textOnColor) {
    validateUnknownKeys(
      overrides.textOnColor,
      ALLOWED_TEXT_ON_COLOR_KEYS,
      'overrides.textOnColor'
    );
  }
  if (overrides.contrastTargets) {
    validateUnknownKeys(
      overrides.contrastTargets,
      ALLOWED_CONTRAST_KEYS,
      'overrides.contrastTargets'
    );
  }
  for (const mode of ['light', 'dark'] as const) {
    const modeSpec = overrides[mode];
    if (modeSpec) {
      validateUnknownKeys(modeSpec, ALLOWED_MODE_KEYS, `overrides.${mode}`);
      if (typeof modeSpec.borderInteractive === 'object') {
        validateUnknownKeys(
          modeSpec.borderInteractive,
          ALLOWED_BORDER_INTERACTIVE_KEYS,
          `overrides.${mode}.borderInteractive`
        );
      }
      if (modeSpec.support) {
        validateUnknownKeys(
          modeSpec.support,
          ALLOWED_SUPPORT_FAMILY_KEYS,
          `overrides.${mode}.support`
        );
        for (const [key, colorSpec] of Object.entries(modeSpec.support)) {
          if (colorSpec) {
            validateUnknownKeys(
              colorSpec,
              ALLOWED_SUPPORT_COLOR_KEYS,
              `overrides.${mode}.support.${key}`
            );
          }
        }
      }
      if (modeSpec.interactive) {
        validateUnknownKeys(
          modeSpec.interactive,
          ALLOWED_INTERACTIVE_STATE_KEYS,
          `overrides.${mode}.interactive`
        );
        for (const [state, stateSpec] of Object.entries(modeSpec.interactive)) {
          if (stateSpec) {
            validateUnknownKeys(
              stateSpec,
              ALLOWED_STATE_SPEC_KEYS,
              `overrides.${mode}.interactive.${state}`
            );
          }
        }
      }
    }
  }
}

function assertFiniteNumber(value: number, name: string) {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new Error(
      `Invalid numeric value (${value}) for "${name}". Must be a finite number.`
    );
  }
}

function validateSpecification(spec: ThemeSpecification) {
  assertFiniteNumber(spec.neutral.hue, 'neutral.hue');
  assertFiniteNumber(spec.neutral.chroma, 'neutral.chroma');
  assertFiniteNumber(spec.brand.hue, 'brand.hue');
  assertFiniteNumber(spec.brand.chroma, 'brand.chroma');
  assertFiniteNumber(spec.brand.lightness, 'brand.lightness');
  assertFiniteNumber(spec.baseLightness, 'baseLightness');
  assertFiniteNumber(spec.textOnColor.lightness, 'textOnColor.lightness');
  assertFiniteNumber(spec.textOnColor.chroma, 'textOnColor.chroma');
  assertFiniteNumber(spec.textOnColor.hue, 'textOnColor.hue');
  assertFiniteNumber(
    spec.contrastTargets.helperText,
    'contrastTargets.helperText'
  );
  assertFiniteNumber(
    spec.contrastTargets.strongBorder,
    'contrastTargets.strongBorder'
  );

  if (spec.neutral.chroma < 0) {
    throw new Error(
      `Chroma must be non-negative; got neutral.chroma = ${spec.neutral.chroma}`
    );
  }
  if (spec.brand.chroma < 0) {
    throw new Error(
      `Chroma must be non-negative; got brand.chroma = ${spec.brand.chroma}`
    );
  }

  for (const mode of ['light', 'dark'] as const) {
    const m = spec[mode];
    assertFiniteNumber(m.surfaceLightness, `${mode}.surfaceLightness`);
    assertFiniteNumber(m.surfaceStep, `${mode}.surfaceStep`);
    assertFiniteNumber(m.fieldDelta, `${mode}.fieldDelta`);
    assertFiniteNumber(m.accentDelta, `${mode}.accentDelta`);
    assertFiniteNumber(m.subtleBorderDelta, `${mode}.subtleBorderDelta`);
    assertFiniteNumber(m.skeletonDelta, `${mode}.skeletonDelta`);
    assertFiniteNumber(m.accentFloor, `${mode}.accentFloor`);
    assertFiniteNumber(m.skeletonFloor, `${mode}.skeletonFloor`);
    assertFiniteNumber(
      m.borderInverseLightness,
      `${mode}.borderInverseLightness`
    );
    if (m.borderInteractive !== 'brand') {
      assertFiniteNumber(
        m.borderInteractive.lightness,
        `${mode}.borderInteractive.lightness`
      );
      assertFiniteNumber(
        m.borderInteractive.chroma,
        `${mode}.borderInteractive.chroma`
      );
    }
    assertFiniteNumber(m.textPrimaryLightness, `${mode}.textPrimaryLightness`);
    assertFiniteNumber(
      m.textSecondaryLightness,
      `${mode}.textSecondaryLightness`
    );
    assertFiniteNumber(m.iconPrimaryLightness, `${mode}.iconPrimaryLightness`);
    assertFiniteNumber(
      m.iconSecondaryLightness,
      `${mode}.iconSecondaryLightness`
    );

    if (m.support) {
      for (const [key, colorSpec] of Object.entries(m.support)) {
        assertFiniteNumber(
          colorSpec.lightness,
          `${mode}.support.${key}.lightness`
        );
        assertFiniteNumber(colorSpec.chroma, `${mode}.support.${key}.chroma`);
        assertFiniteNumber(colorSpec.hue, `${mode}.support.${key}.hue`);
        if (colorSpec.chroma < 0) {
          throw new Error(
            `Chroma must be non-negative; got ${mode}.support.${key}.chroma = ${colorSpec.chroma}`
          );
        }
      }
    }

    for (const [state, stateSpec] of Object.entries(m.interactive)) {
      if (stateSpec.type === 'lightness-delta') {
        assertFiniteNumber(
          stateSpec.delta,
          `${mode}.interactive.${state}.delta`
        );
      } else if (stateSpec.type === 'opacity') {
        assertFiniteNumber(
          stateSpec.chroma,
          `${mode}.interactive.${state}.chroma`
        );
        assertFiniteNumber(
          stateSpec.alpha,
          `${mode}.interactive.${state}.alpha`
        );
        if (stateSpec.chroma < 0) {
          throw new Error(
            `Chroma must be non-negative; got ${mode}.interactive.${state}.chroma = ${stateSpec.chroma}`
          );
        }
      }
    }

    if (m.accentDelta > 0) {
      throw new Error(
        `Accent delta must not be positive: an accent is never lighter than its surface (${mode}.accentDelta = ${m.accentDelta})`
      );
    }
  }
}

function mergeSpecification(
  overrides: Partial<ThemeSpecification>
): ThemeSpecification {
  validateOverrides(overrides);

  const merged: ThemeSpecification = {
    ...defaultSpecification,
    ...overrides,
    neutral: {
      ...defaultSpecification.neutral,
      ...overrides.neutral,
    },
    brand: {
      ...defaultSpecification.brand,
      ...overrides.brand,
    },
    textOnColor: {
      ...defaultSpecification.textOnColor,
      ...overrides.textOnColor,
    },
    contrastTargets: {
      ...defaultSpecification.contrastTargets,
      ...overrides.contrastTargets,
    },
    light: mergeModeSpec(defaultSpecification.light, overrides.light),
    dark: mergeModeSpec(defaultSpecification.dark, overrides.dark),
  };

  validateSpecification(merged);

  merged.neutral.hue = normalizeHue(merged.neutral.hue);
  merged.brand.hue = normalizeHue(merged.brand.hue);

  return merged;
}

/**
 * Merges a mode specification, deep-merging the `interactive` record so that
 * a partial override (e.g. changing only `hover`) does not silently drop the
 * other interactive states.
 */
function mergeModeSpec(
  base: ThemeSpecification['light'],
  override: Partial<ThemeSpecification['light']> | undefined
): ThemeSpecification['light'] {
  if (!override) return base;
  return {
    ...base,
    ...override,
    support: {
      ...base.support,
      ...override.support,
    },
    interactive: {
      ...base.interactive,
      ...override.interactive,
    },
  };
}
