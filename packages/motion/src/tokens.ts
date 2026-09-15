/**
 * Copyright IBM Corp. 2018, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Token values are generated from src/dtcg/motion.json by `yarn build:tokens`
// (tasks/build.js) and written to js/generated/tokens.js before this file is
// bundled. Run `yarn build` to regenerate them.
import {
  durationFast01,
  durationFast02,
  durationModerate01,
  durationModerate02,
  durationSlow01,
  durationSlow02,
  easings,
} from '../js/generated/tokens.js';

export {
  durationFast01,
  durationFast02,
  durationModerate01,
  durationModerate02,
  durationSlow01,
  durationSlow02,
  fast01,
  fast02,
  moderate01,
  moderate02,
  slow01,
  slow02,
  easings,
  unstable_tokens,
} from '../js/generated/tokens.js';

export type DurationName =
  | 'fast-01'
  | 'fast-02'
  | 'moderate-01'
  | 'moderate-02'
  | 'slow-01'
  | 'slow-02';

export type EasingName = 'standard' | 'entrance' | 'exit';
export type EasingMode = 'productive' | 'expressive';
export type CubicBezier = readonly [number, number, number, number];
export type EasingMap = Record<EasingName, Record<EasingMode, string>>;

// Map the surface names to the existing Carbon duration tokens.
const durations: Record<DurationName, string> = {
  'fast-01': durationFast01,
  'fast-02': durationFast02,
  'moderate-01': durationModerate01,
  'moderate-02': durationModerate02,
  'slow-01': durationSlow01,
  'slow-02': durationSlow02,
};

type EasingCurveMap = Record<EasingName, Record<EasingMode, CubicBezier>>;

// Keep one numeric source for every Carbon easing curve.
// Used by resolveEasing() — surfaces need raw numeric arrays, not CSS strings.
const easingCurves: EasingCurveMap = {
  standard: {
    productive: [0.2, 0, 0.38, 0.9],
    expressive: [0.4, 0.14, 0.3, 1],
  },
  entrance: {
    productive: [0, 0, 0.38, 0.9],
    expressive: [0, 0, 0.3, 1],
  },
  exit: {
    productive: [0.2, 0, 1, 0.9],
    expressive: [0.4, 0.14, 1, 1],
  },
};

export const motion = (name: EasingName, mode: EasingMode) => {
  const easing = easings[name];
  if (!easing) {
    throw new Error(
      `Unable to find easing \`${name}\` in our supported easings. Expected ` +
        `one of: ${Object.keys(easings).join(', ')}`
    );
  }
  if (!easing[mode]) {
    throw new Error(
      `Unable to find a mode for the easing \`${name}\` called: \`${mode}\`. ` +
        `Expected one of: ${Object.keys(easing).join(', ')}`
    );
  }
  return easing[mode];
};

// Return the numeric curve required by JavaScript animation engines.
export const resolveEasing = (name: EasingName, mode: EasingMode) => {
  if (!easingCurves[name]) {
    throw new Error(
      `Unable to find easing \`${name}\` in our supported easings. Expected ` +
        `one of: ${Object.keys(easingCurves).join(', ')}`
    );
  }

  const easing = easingCurves[name];
  if (!easing[mode]) {
    throw new Error(
      `Unable to find a mode for the easing \`${name}\` called: \`${mode}\`. ` +
        `Expected one of: ${Object.keys(easing).join(', ')}`
    );
  }

  return easing[mode];
};

// Return the existing Carbon duration for a named surface token.
export const resolveDuration = (name: DurationName) => {
  const duration = durations[name];

  if (!duration) {
    throw new Error(
      `Unable to find duration \`${name}\` in our supported durations. ` +
        `Expected one of: ${Object.keys(durations).join(', ')}`
    );
  }

  return duration;
};
