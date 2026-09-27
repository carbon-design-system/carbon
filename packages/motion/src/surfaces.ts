/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Surface definitions are generated from src/dtcg/surfaces.json by
// `yarn build:tokens` (tasks/build.js) and written to
// js/generated/surfaces.js before this file is bundled.
// Run `yarn build` to regenerate them.
export { surfaces, getMotionSurface } from '../js/generated/surfaces.js';

// ── TypeScript types ─────────────────────────────────────────────────────────
// These are hand-authored here rather than generated because they describe the
// Carbon-specific structure of a surface recipe and are referenced by consumers
// who need to type-check against the surface API.

import type { DurationName, EasingName, EasingMode } from './tokens';

type MotionEasing = readonly [EasingName, EasingMode];

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
export type MotionSurfaceName =
  | 'disclosure'
  | 'contextual'
  | 'stretch'
  | 'expand'
  | 'invoke';
