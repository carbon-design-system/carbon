/**
 * Copyright IBM Corp. 2018, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Token values are generated from src/dtcg/motion.json by `yarn build:tokens`
// (tasks/build.js) and written to js/generated/tokens.js before this file is
// bundled. Run `yarn build` to regenerate them.
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

export type EasingName = 'standard' | 'entrance' | 'exit';
export type EasingMode = 'productive' | 'expressive';
export type EasingMap = Record<EasingName, Record<EasingMode, string>>;

import { easings } from '../js/generated/tokens.js';

export const motion = (name: EasingName, mode: EasingMode) => {
  if (!easings[name]) {
    throw new Error(
      `Unable to find easing \`${name}\` in our supported easings. Expected ` +
        `one of: ${Object.keys(easings).join(', ')}`
    );
  }

  const easing = easings[name];
  if (!easing[mode]) {
    throw new Error(
      `Unable to find a mode for the easing \`${name}\` called: \`${mode}\`. ` +
        `Expected one of: ${Object.keys(easing).join(', ')}`
    );
  }

  return easing[mode];
};
