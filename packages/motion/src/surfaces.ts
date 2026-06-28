/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { DurationName, EasingMode, EasingName } from './tokens';

export type MotionSurfaceKind = 'reveal' | 'shared-element';
export type MotionSurfaceOrigin = 'surface' | 'trigger';
export type ReducedMotionStrategy = 'fade' | 'none';
export type MotionEasing = readonly [EasingName, EasingMode];

export interface MotionSurfaceDefinition {
  kind: MotionSurfaceKind;
  origin: MotionSurfaceOrigin;
  duration: DurationName;
  enterEasing: MotionEasing;
  exitEasing: MotionEasing;
  reducedMotion: ReducedMotionStrategy;
}

/**
 * Named motion intents. These definitions are engine and framework agnostic.
 */
export const surfaces = {
  expand: {
    kind: 'shared-element',
    origin: 'surface',
    duration: 'slow-01',
    enterEasing: ['entrance', 'expressive'],
    exitEasing: ['exit', 'expressive'],
    reducedMotion: 'fade',
  },
} as const satisfies Record<string, MotionSurfaceDefinition>;

export type MotionSurfaceName = keyof typeof surfaces;

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
