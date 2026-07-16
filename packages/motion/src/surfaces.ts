/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { DurationName, EasingMode, EasingName } from './tokens';

type MotionEasing = readonly [EasingName, EasingMode];

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
    enterEasing: ['entrance', 'productive'],
    exitEasing: ['exit', 'productive'],
  },
  // Icon > tooltip/popover
  contextual: {
    kind: 'reveal',
    duration: 'fast-02',
    enter: { opacity: 1, transform: 'scale(1)' },
    exit: { opacity: 0, transform: 'scale(0.96)' },
    enterEasing: ['entrance', 'expressive'],
    exitEasing: ['exit', 'expressive'],
  },
  // Component reveal, "stretching" from vertical axis
  stretch: {
    kind: 'reveal',
    duration: 'slow-01',
    enter: { opacity: 1, clipPath: 'inset(0 0 0 0)' },
    exit: { opacity: 0, clipPath: 'inset(50% 0 50% 0)' },
    enterEasing: ['entrance', 'expressive'],
    exitEasing: ['exit', 'expressive'],
  },
  // Card/tile > side-panel/tearsheet
  expand: {
    kind: 'shared-element',
    duration: 'moderate-02',
    enter: { opacity: 1, transform: 'scale(1)' },
    exit: { opacity: 0, transform: 'scale(0.96)' },
    enterEasing: ['standard', 'productive'],
    exitEasing: ['standard', 'productive'],
  },
  // Button > modal/menu/popover - morphs from the trigger
  invoke: {
    kind: 'shared-element',
    origin: 'trigger',
    duration: 'moderate-02',
    enterEasing: ['standard', 'expressive'],
    exitEasing: ['standard', 'expressive'],
  },
} as const satisfies Record<string, MotionSurfaceDefinition>;

export type MotionSurfaceName = keyof typeof surfaces;

// Give JavaScript consumers a clear error for an unknown surface name.
export const getMotionSurface = (name: MotionSurfaceName) => {
  const surface = surfaces[name];

  if (!surface) {
    throw new Error(
      `Unable to find motion surface \`${name}\`. Expected one of: ` +
        Object.keys(surfaces).join(', ')
    );
  }

  return surface;
};
