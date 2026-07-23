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

import type { EasingName, EasingMode } from './tokens';

type MotionEasing = readonly [EasingName, EasingMode];

/** Plain CSS property/value pairs used for reveal keyframes. */
type RevealKeyframe = Record<string, string | number>;

interface MotionSurfaceBase {
  duration: string;
  enterEasing: MotionEasing;
  exitEasing: MotionEasing;
}

/** A surface that animates a single element between from/to styles. */
interface RevealSurface extends MotionSurfaceBase {
  kind: 'reveal';
  enter: RevealKeyframe;
  exit: RevealKeyframe;
}

/**
 * A surface that morphs one element into another.
 * The animation engine (Motion layout projection, View Transitions, FLIP) is
 * chosen by the adapter — this type documents the CSS-replicable layer.
 */
interface SharedElementSurface extends MotionSurfaceBase {
  kind: 'shared-element';
  enter?: RevealKeyframe;
  exit?: RevealKeyframe;
  /** When set to `trigger`, the morph starts from the invoking element. */
  origin?: 'trigger';
}

export type MotionSurfaceDefinition = SharedElementSurface | RevealSurface;
export type MotionSurfaceName =
  | 'disclosure'
  | 'contextual'
  | 'stretch'
  | 'expand'
  | 'invoke';
