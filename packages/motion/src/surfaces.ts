/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { DurationName, EasingMode, EasingName } from './tokens';

type MotionEasing = readonly [EasingName, EasingMode];

interface MotionSurfaceBase {
  duration: DurationName;
  enterEasing: MotionEasing;
  exitEasing: MotionEasing;
  reducedMotion: 'fade';
}

// Keep the shared definition free from React and animation-library values.
interface SharedElementSurface extends MotionSurfaceBase {
  kind: 'shared-element';
}

interface InvokeKeyframe {
  opacity: number;
  clipPath: string;
}

interface RevealSurface extends MotionSurfaceBase {
  kind: 'reveal';
  enter: InvokeKeyframe;
  exit: InvokeKeyframe;
}

type MotionSurfaceDefinition = SharedElementSurface | RevealSurface;

/**
 * Named motion intents. These definitions are engine and framework agnostic.
 */
export const surfaces = {
  expand: {
    kind: 'shared-element',
    duration: 'slow-01',
    enterEasing: ['entrance', 'expressive'],
    exitEasing: ['exit', 'expressive'],
    reducedMotion: 'fade',
  },
  invoke: {
    kind: 'reveal',
    duration: 'slow-01',
    enter: {
      opacity: 1,
      clipPath: 'inset(0 0 0 0)',
    },
    exit: {
      opacity: 0,
      clipPath: 'inset(50% 0 50% 0)',
    },
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
