/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useMemo } from 'react';
import {
  getMotionSurface,
  resolveDuration,
  resolveEasing,
  type EasingMode,
  type EasingName,
  type MotionSurfaceName,
} from '@carbon/motion';
import type { TargetAndTransition, Transition } from 'motion/react';
import { useMotionEnabled } from './useMotionEnabled';

// Motion transitions in seconds; Carbon tokens are `ms` strings
const toSeconds = (duration: string) => Number.parseInt(duration, 10) / 1000;

// Motion expects cubic-bezier tuple
const toEase = (name: EasingName, mode: EasingMode) =>
  [...resolveEasing(name, mode)] as [number, number, number, number];

interface ResolvedSurfaceBase {
  enabled: boolean;
  enterTransition: Transition;
  exitTransition: Transition;
}

export interface ResolvedRevealSurface extends ResolvedSurfaceBase {
  kind: 'reveal';
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  exit: TargetAndTransition;
}

export interface ResolvedSharedElementSurface extends ResolvedSurfaceBase {
  kind: 'shared-element';
  origin?: 'trigger';
}

export type ResolvedMotionSurface =
  | ResolvedRevealSurface
  | ResolvedSharedElementSurface;

/**
 * resolve named Carbon motion surfaces to Motion-ready values
 * definitions stay in `@carbon/motion`; this hook only translates tokens
 * (duration/easing names) into the numeric forms `motion/react` consumes
 */
export function useMotionSurface(
  name: MotionSurfaceName
): ResolvedMotionSurface {
  const enabled = useMotionEnabled();

  return useMemo(() => {
    const surface = getMotionSurface(name);
    const duration = toSeconds(resolveDuration(surface.duration));
    const [enterName, enterMode] = surface.enterEasing;
    const [exitName, exitMode] = surface.exitEasing;
    const enterTransition: Transition = {
      duration,
      ease: toEase(enterName, enterMode),
    };
    const exitTransition: Transition = {
      duration,
      ease: toEase(exitName, exitMode),
    };

    if (surface.kind === 'reveal') {
      return {
        kind: 'reveal',
        enabled,
        enterTransition,
        exitTransition,
        initial: { ...surface.exit } as TargetAndTransition,
        animate: {
          ...surface.enter,
          transition: enterTransition,
        } as TargetAndTransition,
        exit: {
          ...surface.exit,
          transition: exitTransition,
        } as TargetAndTransition,
      };
    }

    return {
      kind: 'shared-element',
      enabled,
      enterTransition,
      exitTransition,
      origin: 'origin' in surface ? surface.origin : undefined,
    };
  }, [enabled, name]);
}
