/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  resolveDuration,
  resolveEasing,
  type DurationName,
  type EasingMode,
  type EasingName,
} from './tokens';

// easing curve token names
interface MotionEasing {
  name: EasingName;
  mode: EasingMode;
}

/**
 * from/to styles for reveal surface - plain CSS property/value pairs
 * keep values engine-neutral so CSS, WAAPI, and Motion can all consume
 * them
 */
type RevealKeyframe = Record<string, string | number>;

interface MotionSurfaceBase {
  duration: DurationName;
  enterEasing: MotionEasing;
  exitEasing: MotionEasing;
}

//  reveal surfaces animate a single element between from/to styles
//  works on every engine, including plain CSS
interface RevealSurface extends MotionSurfaceBase {
  kind: 'reveal';
  enter: RevealKeyframe;
  exit: RevealKeyframe;
}

// shared-element surfaces morph one element into another
// the adapter picks mechanism (Motion layout projection, View Transitions, FLIP)
// optional enter/exit keyframes document the CSS-replicable layer (opacity /
// scale) for Sass consumers and future View Transitions fallbacks
interface SharedElementSurface extends MotionSurfaceBase {
  kind: 'shared-element';
  enter?: RevealKeyframe;
  exit?: RevealKeyframe;
  // when set to `trigger`, morph starts from the invoking element
  origin?: 'trigger';
}

export type MotionSurfaceDefinition = SharedElementSurface | RevealSurface;

/**
 * Named motion intents. These definitions are engine and framework agnostic.
 *
 * `prefers-reduced-motion` is intentionally not represented here: surfaces
 * never animate when the users request reduced motion. Framework adapters
 * bail before running, and the Sass output is wrapped in a
 * `prefers-reduced-motion: no-preference` media query
 */
export const surfaces = {
  // Accordion, table-row expand - reveal in place
  disclosure: {
    kind: 'reveal',
    duration: 'moderate-01',
    enter: { blockSize: 'auto', opacity: 1 },
    exit: { blockSize: 0, opacity: 0 },
    enterEasing: { name: 'entrance', mode: 'productive' },
    exitEasing: { name: 'exit', mode: 'productive' },
  },
  // Icon > tooltip/popover
  contextual: {
    kind: 'reveal',
    duration: 'fast-02',
    enter: { opacity: 1, transform: 'scale(1)' },
    exit: { opacity: 0, transform: 'scale(0.96)' },
    enterEasing: { name: 'entrance', mode: 'expressive' },
    exitEasing: { name: 'exit', mode: 'expressive' },
  },
  // Card/tile > side-panel/tearsheet
  expand: {
    kind: 'shared-element',
    duration: 'moderate-02',
    enter: { opacity: 1, transform: 'scale(1)' },
    exit: { opacity: 0, transform: 'scale(0.96)' },
    enterEasing: { name: 'standard', mode: 'productive' },
    exitEasing: { name: 'standard', mode: 'productive' },
  },
  // Button > modal/menu/popover - morphs from the trigger
  invoke: {
    kind: 'shared-element',
    origin: 'trigger',
    duration: 'moderate-02',
    enterEasing: { name: 'standard', mode: 'expressive' },
    exitEasing: { name: 'standard', mode: 'expressive' },
  },
} as const satisfies Record<string, MotionSurfaceDefinition>;

export type MotionSurfaceName = keyof typeof surfaces;

/**
 * Anywhere a surface is accepted, it can be one of the built-in names or a
 * user-defined definition. Not every animation is a system-wide intent, and
 * every name in `surfaces` is public API, so a custom surface supplies a
 * definition of the same shape rather than claiming a name.
 */
export type MotionSurfaceInput = MotionSurfaceName | MotionSurfaceDefinition;

const isSurfaceDefinition = (
  surface: MotionSurfaceInput
): surface is MotionSurfaceDefinition => typeof surface === 'object';

/**
 * Name a surface for error messages, so a mistake in an inline definition is
 * not reported as a problem with a catalog name.
 */
export const describeSurface = (surface: MotionSurfaceInput) =>
  isSurfaceDefinition(surface) ? 'custom surface' : `\`${surface}\` surface`;

const isKeyframe = (value: unknown) =>
  typeof value === 'object' && value !== null && Object.keys(value).length > 0;

/**
 * Assert that a definition carries every key its `kind` requires, with values
 * the token system recognizes.
 *
 * Catalog entries are generated and so are always well formed, but inline
 * definitions are user-defined and several mistakes are otherwise silent: a
 * reveal missing `enter` resolves to an empty keyframe and animates nothing,
 * and a missing `kind` falls through to the shared-element path. Token names
 * are checked by `resolveDuration`/`resolveEasing`, which raise their own
 * errors.
 */
const validateSurface = (
  definition: MotionSurfaceDefinition,
  label: string
): MotionSurfaceDefinition => {
  const { kind } = definition;

  if (kind !== 'reveal' && kind !== 'shared-element') {
    throw new Error(
      `Expected the ${label} to declare a \`kind\` of \`reveal\` or ` +
        `\`shared-element\`, but found \`${kind ?? 'nothing'}\`.`
    );
  }

  // shared-element keyframes are optional; reveal surfaces animate between them
  if (kind === 'reveal') {
    for (const key of ['enter', 'exit'] as const) {
      if (!isKeyframe(definition[key])) {
        throw new Error(
          `Expected the ${label} to define \`${key}\` as an object with at ` +
            'least one CSS property.'
        );
      }
    }
  }

  for (const key of ['enterEasing', 'exitEasing'] as const) {
    const easing = definition[key];

    if (!easing || typeof easing !== 'object' || !easing.name || !easing.mode) {
      throw new Error(
        `Expected the ${label} to define \`${key}\` as \`{ name, mode }\`, ` +
          "for example `{ name: 'entrance', mode: 'expressive' }`."
      );
    }
  }

  try {
    resolveDuration(definition.duration);
    resolveEasing(definition.enterEasing.name, definition.enterEasing.mode);
    resolveEasing(definition.exitEasing.name, definition.exitEasing.mode);
  } catch (error) {
    throw new Error(
      `Invalid ${label}. ${error instanceof Error ? error.message : error}`
    );
  }

  return definition;
};

/**
 * Author a custom surface.
 *
 * Nothing here changes the value — it is returned as given. What it buys is
 * type inference at the definition site and validation at module load rather
 * than at first animation. Assigning a bare object to `MotionSurfaceDefinition`
 * reports against the wrong union member (a `kind: 'reveal'` object is faulted
 * for not being a `SharedElementSurface`); the generic constraint here narrows
 * the literals so errors point at the property actually at fault.
 *
 * Module scope is the natural home for one, but it is not required — the React
 * adapter keys its memoization on the definition's structure rather than its
 * identity, so writing one inline in JSX is also fine.
 */
export const defineMotionSurface = <T extends MotionSurfaceDefinition>(
  definition: T
): T => validateSurface(definition, 'custom surface') as T;

/**
 * Resolve a surface to its definition. A name is looked up in the shared
 * catalog; an inline definition is validated and passed through.
 */
export function getMotionSurface(
  surface: MotionSurfaceInput
): MotionSurfaceDefinition {
  if (isSurfaceDefinition(surface)) {
    return validateSurface(surface, describeSurface(surface));
  }

  const definition: MotionSurfaceDefinition | undefined = surfaces[surface];

  if (!definition) {
    throw new Error(
      `Unable to find motion surface \`${surface}\`. Expected one of: ` +
        Object.keys(surfaces).join(', ')
    );
  }

  return definition;
}
