/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { DurationName, EasingMode, EasingName } from './tokens';

type MotionEasing = readonly [EasingName, EasingMode];

// Keep the shared definition free from React and animation-library values.
interface MotionSurfaceDefinition {
  kind: 'shared-element';
  origin: 'surface';
  duration: DurationName;
  enterEasing: MotionEasing;
  exitEasing: MotionEasing;
  reducedMotion: 'fade';
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
