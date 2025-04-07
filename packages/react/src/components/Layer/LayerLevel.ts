/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const levels = ['one', 'two', 'three'] as const;

export const MIN_LEVEL = 0;
export const MAX_LEVEL = levels.length - 1;

export const LayerLevels = [0, 1, 2] as const;

export type LayerLevel = (typeof LayerLevels)[number];
