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
  type MotionSurfaceInput,
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
  // present when the surface definition includes CSS-replicable keyframes
  animate?: TargetAndTransition;
  exit?: TargetAndTransition;
}

export type ResolvedMotionSurface =
  | ResolvedRevealSurface
  | ResolvedSharedElementSurface;

/**
 * resolve Carbon motion surfaces to Motion-ready values
 * definitions stay in `@carbon/motion`; this hook only translates tokens
 * (duration/easing names) into the numeric forms `motion/react` consumes
 *
 * accepts a catalog name or an inline definition
 */
export function useMotionSurface(
  input: MotionSurfaceInput
): ResolvedMotionSurface {
  const enabled = useMotionEnabled();
  // An inline definition is a fresh object on every render, which would defeat
  // the memo below and hand Motion new target objects each time. Key on the
  // definition's structure rather than its identity so callers are free to
  // write the definition inline.
  const key = typeof input === 'string' ? input : JSON.stringify(input);

  return useMemo(() => {
    const surface = getMotionSurface(input);
    const duration = toSeconds(resolveDuration(surface.duration));
    const { name: enterName, mode: enterMode } = surface.enterEasing;
    const { name: exitName, mode: exitMode } = surface.exitEasing;
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

    const sharedElement: ResolvedSharedElementSurface = {
      kind: 'shared-element',
      enabled,
      enterTransition,
      exitTransition,
      origin: 'origin' in surface ? surface.origin : undefined,
    };

    // optional enter/exit keyframes layer opacity/scale on top of the
    // layoutId morph (expand); invoke has neither and stays morph-only
    if ('enter' in surface && surface.enter) {
      sharedElement.animate = {
        ...surface.enter,
        transition: enterTransition,
      } as TargetAndTransition;
    }
    if ('exit' in surface && surface.exit) {
      sharedElement.exit = {
        ...surface.exit,
        transition: exitTransition,
      } as TargetAndTransition;
    }

    return sharedElement;
    // `input` is omitted deliberately: `key` is its structural identity, so a
    // stale reference here is always structurally equal to the current one.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, key]);
}
