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

// Built-in surface definitions are generated from src/dtcg/surfaces.json by
// `yarn build:tokens` (tasks/build.js) and written to js/generated/surfaces.js
// before this file is bundled. Run `yarn build` to regenerate them.
//
// The generated `getMotionSurface` looks up a built-in name and nothing else.
// It is wrapped below so the same entry point also accepts a custom surface.
import {
  surfaces,
  getMotionSurface as getBuiltInSurface,
} from '../js/generated/surfaces.js';

export { surfaces };

// ── TypeScript types ─────────────────────────────────────────────────────────
// Hand-authored here rather than generated because they describe the
// Carbon-specific structure of a surface recipe and are referenced by consumers
// who need to type-check against the surface API.

/**
 * Which easing curve to use, given as token names rather than raw values.
 *
 * The parts are named instead of ordered. As a plain two item list this was
 * both harder to read — nothing told you what the second slot was for — and
 * easy to break: reformatting a hand-written Sass `(entrance expressive)` into
 * `(entrance expressive,)` quietly turns it into a list of one. Naming the
 * parts fixes both. A map means the same thing however it is formatted.
 */
interface MotionEasing {
  name: EasingName;
  mode: EasingMode;
}

// from/to styles for reveal surface - plain CSS property/value pairs
// keep values engine-neutral so CSS, WAAPI, and Motion can all consume them
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
 * Name a surface for error messages, so a mistake in a custom surface is not
 * reported as a problem with a built-in name.
 */
export const describeSurface = (surface: MotionSurfaceInput) =>
  isSurfaceDefinition(surface) ? 'custom surface' : `\`${surface}\` surface`;

const isKeyframe = (value: unknown) =>
  typeof value === 'object' && value !== null && Object.keys(value).length > 0;

/**
 * Assert that a definition carries every key its `kind` requires, with values
 * the token system recognizes.
 *
 * Built-in surfaces are generated and so are always well formed, but custom
 * surfaces are user-defined and several mistakes are otherwise silent: a reveal
 * missing `enter` resolves to an empty keyframe and animates nothing, and a
 * missing `kind` falls through to the shared-element path. Token names are
 * checked by `resolveDuration`/`resolveEasing`, which raise their own errors.
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
 * Resolve a surface to its definition. A built-in name is looked up in the
 * generated catalog; a custom surface is validated and passed through.
 */
export function getMotionSurface(
  surface: MotionSurfaceInput
): MotionSurfaceDefinition {
  if (isSurfaceDefinition(surface)) {
    return validateSurface(surface, describeSurface(surface));
  }

  // the generated lookup raises its own error listing the built-in names
  return getBuiltInSurface(surface) as MotionSurfaceDefinition;
}
