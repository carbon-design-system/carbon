/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useMemo } from 'react';
import {
  getMotionSurface,
  resolveDurationMilliseconds,
  resolveEasing,
} from '@carbon/motion';
import { useReducedMotion } from 'motion/react';

const validateRect = (rect, name) => {
  if (!rect || rect.width <= 0 || rect.height <= 0) {
    throw new Error(
      `The expand motion surface requires a measurable ${name} element.`
    );
  }
};

export const createMotionSurfaceConfig = (
  surfaceName,
  shouldReduceMotion = false
) => {
  const surface = getMotionSurface(surfaceName);

  if (surface.kind !== 'shared-element') {
    throw new Error(
      `The Motion adapter only supports shared-element surfaces. Received: ${surface.kind}`
    );
  }

  const duration = resolveDurationMilliseconds(surface.duration) / 1000;
  const enterEase = [...resolveEasing(...surface.enterEasing)];
  const exitEase = [...resolveEasing(...surface.exitEasing)];
  const fadeDuration = Math.min(duration, 0.24);

  return {
    shouldReduceMotion,
    enter: {
      duration: shouldReduceMotion ? fadeDuration : duration,
      ease: enterEase,
    },
    exit: {
      duration: shouldReduceMotion ? fadeDuration : duration,
      ease: exitEase,
    },
    contentEnter: {
      delay: shouldReduceMotion ? 0 : 0.08,
      duration: fadeDuration,
      ease: enterEase,
    },
    contentExit: {
      duration: 0.11,
      ease: exitEase,
    },
    getTransform(sourceRect, targetRect) {
      validateRect(sourceRect, 'source');
      validateRect(targetRect, 'target');

      const x = sourceRect.left - targetRect.left;
      const y = sourceRect.top - targetRect.top;
      const scaleX = sourceRect.width / targetRect.width;
      const scaleY = sourceRect.height / targetRect.height;

      return `translate3d(${x}px, ${y}px, 0) scale(${scaleX}, ${scaleY})`;
    },
  };
};

export const useMotionSurface = (surfaceName) => {
  const shouldReduceMotion = Boolean(useReducedMotion());

  return useMemo(
    () => createMotionSurfaceConfig(surfaceName, shouldReduceMotion),
    [shouldReduceMotion, surfaceName]
  );
};
