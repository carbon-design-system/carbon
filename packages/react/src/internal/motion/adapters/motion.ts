/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  resolveDuration,
  resolveEasing,
  surfaces,
  type DurationName,
  type MotionSurfaceName,
} from '@carbon/motion';
import { animate } from 'motion/mini';

const transparent = 'rgba(0, 0, 0, 0)';

type MotionRect = Pick<DOMRectReadOnly, 'height' | 'left' | 'top' | 'width'>;

export interface MotionAnimation {
  finished: Promise<unknown>;
  stop: () => void;
}

export interface MotionSurfaceElements {
  content: Element[];
  origin: HTMLElement;
  overlay?: HTMLElement;
  target: HTMLElement;
}

export interface MotionSurfaceRun {
  animations: MotionAnimation[];
  finished: Promise<unknown[]>;
}

export interface MotionSurfaceAdapter {
  enter: (
    elements: MotionSurfaceElements & { fromOrigin: boolean }
  ) => MotionSurfaceRun;
  exit: (elements: MotionSurfaceElements) => MotionSurfaceRun;
}

interface TargetInlineStyles {
  transformOrigin: string;
  transition: string;
  willChange: string;
}

function toSeconds(duration: DurationName) {
  return Number.parseInt(resolveDuration(duration), 10) / 1000;
}

function validateRect(
  rect: MotionRect | null,
  name: 'source' | 'target',
  surfaceName: MotionSurfaceName
) {
  if (!rect || rect.width <= 0 || rect.height <= 0) {
    throw new Error(
      `The ${surfaceName} motion surface requires a measurable ${name} element.`
    );
  }
}

function createRun(animations: MotionAnimation[]): MotionSurfaceRun {
  return {
    animations,
    finished: Promise.all(animations.map((animation) => animation.finished)),
  };
}

function restoreTargetWhenSettled(
  run: MotionSurfaceRun,
  target: HTMLElement,
  styles: TargetInlineStyles
) {
  // Restore the element styles after Motion finishes its transform.
  const resetTarget = () => {
    target.style.transformOrigin = styles.transformOrigin;
    target.style.transition = styles.transition;
    target.style.willChange = styles.willChange;
  };

  run.finished.then(resetTarget, resetTarget);
  return run;
}

function prepareTarget(target: HTMLElement) {
  const styles = {
    transformOrigin: target.style.transformOrigin,
    transition: target.style.transition,
    willChange: target.style.willChange,
  };

  // Motion owns the transform while this animation is running.
  target.style.transformOrigin = 'top left';
  target.style.transition = 'none';
  target.style.willChange = 'transform';

  return styles;
}

function getLayoutRect(element: HTMLElement) {
  const transform = element.style.transform;

  // A running FLIP transform changes the visual bounds. Measure the element
  // without that transform so an interrupted exit still targets the origin.
  try {
    element.style.transform = 'none';
    return element.getBoundingClientRect();
  } finally {
    element.style.transform = transform;
  }
}

export function createMotionAdapterConfig(
  surfaceName: MotionSurfaceName,
  shouldReduceMotion = false
) {
  if (surfaceName !== 'expand') {
    throw new Error(
      `The Motion adapter only supports the expand surface. Received: ${surfaceName}`
    );
  }

  const surface = surfaces.expand;
  const duration = toSeconds(surface.duration);
  const [enterName, enterMode] = surface.enterEasing;
  const [exitName, exitMode] = surface.exitEasing;
  const enterEase = [...resolveEasing(enterName, enterMode)] as [
    number,
    number,
    number,
    number,
  ];
  const exitEase = [...resolveEasing(exitName, exitMode)] as [
    number,
    number,
    number,
    number,
  ];
  const fadeDuration = Math.min(duration, toSeconds('moderate-02'));

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
      delay: shouldReduceMotion ? 0 : toSeconds('fast-01'),
      duration: fadeDuration,
      ease: enterEase,
    },
    contentExit: {
      duration: toSeconds('fast-02'),
      ease: exitEase,
    },
    getTransform(sourceRect: MotionRect, targetRect: MotionRect) {
      validateRect(sourceRect, 'source', surfaceName);
      validateRect(targetRect, 'target', surfaceName);

      const x = sourceRect.left - targetRect.left;
      const y = sourceRect.top - targetRect.top;
      const scaleX = sourceRect.width / targetRect.width;
      const scaleY = sourceRect.height / targetRect.height;

      return `translate3d(${x}px, ${y}px, 0) scale(${scaleX}, ${scaleY})`;
    },
  };
}

export function createMotionAdapter(
  surfaceName: MotionSurfaceName,
  shouldReduceMotion: boolean
): MotionSurfaceAdapter {
  if (surfaceName === 'invoke') {
    const surface = surfaces.invoke;
    const duration = toSeconds(surface.duration);
    const fadeDuration = Math.min(duration, toSeconds('moderate-02'));
    const [enterName, enterMode] = surface.enterEasing;
    const [exitName, exitMode] = surface.exitEasing;
    const enterEase = [...resolveEasing(enterName, enterMode)] as [
      number,
      number,
      number,
      number,
    ];
    const exitEase = [...resolveEasing(exitName, exitMode)] as [
      number,
      number,
      number,
      number,
    ];
    const activeDuration = shouldReduceMotion ? fadeDuration : duration;

    return {
      enter({ target }) {
        return createRun([
          animate(
            target,
            shouldReduceMotion
              ? { opacity: [0, 1] }
              : {
                  opacity: [0, surface.enter.opacity],
                  clipPath: ['inset(50% 0 50% 0)', surface.enter.clipPath],
                },
            { duration: activeDuration, ease: enterEase }
          ),
        ]);
      },

      exit({ target }) {
        return createRun([
          animate(
            target,
            shouldReduceMotion
              ? { opacity: [1, 0] }
              : {
                  opacity: [surface.enter.opacity, surface.exit.opacity],
                  clipPath: [surface.enter.clipPath, surface.exit.clipPath],
                },
            { duration: activeDuration, ease: exitEase }
          ),
        ]);
      },
    };
  }

  if (surfaceName !== 'expand') {
    throw new Error(
      `Unsupported motion surface "${surfaceName}". Expected one of: expand, invoke`
    );
  }

  const config = createMotionAdapterConfig('expand', shouldReduceMotion);

  return {
    enter({ content, fromOrigin, origin, overlay, target }) {
      if (config.shouldReduceMotion) {
        return createRun([
          animate(
            overlay ?? target,
            { opacity: fromOrigin ? [0, 1] : 1 },
            config.enter
          ),
        ]);
      }

      const animations: MotionAnimation[] = [];
      const styles = prepareTarget(target);

      if (overlay) {
        const overlayColor = getComputedStyle(overlay).backgroundColor;
        animations.push(
          animate(
            overlay,
            {
              backgroundColor: fromOrigin
                ? [transparent, overlayColor]
                : overlayColor,
            },
            config.enter
          )
        );
      }

      animations.push(
        animate(
          target,
          {
            transform: fromOrigin
              ? [
                  config.getTransform(
                    origin.getBoundingClientRect(),
                    getLayoutRect(target)
                  ),
                  'none',
                ]
              : 'none',
          },
          config.enter
        )
      );

      if (content.length > 0) {
        animations.push(
          animate(
            content,
            { opacity: fromOrigin ? [0, 1] : 1 },
            config.contentEnter
          )
        );
      }

      return restoreTargetWhenSettled(createRun(animations), target, styles);
    },

    exit({ content, origin, overlay, target }) {
      if (config.shouldReduceMotion) {
        return createRun([
          animate(overlay ?? target, { opacity: 0 }, config.exit),
        ]);
      }

      const sourceRect = origin.getBoundingClientRect();
      const targetRect = getLayoutRect(target);
      const animations: MotionAnimation[] = [];
      const styles = prepareTarget(target);

      if (overlay) {
        animations.push(
          animate(overlay, { backgroundColor: transparent }, config.exit)
        );
      }

      animations.push(
        animate(
          target,
          { transform: config.getTransform(sourceRect, targetRect) },
          config.exit
        )
      );

      if (content.length > 0) {
        animations.push(animate(content, { opacity: 0 }, config.contentExit));
      }

      return restoreTargetWhenSettled(createRun(animations), target, styles);
    },
  };
}
