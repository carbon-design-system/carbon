/**
 * Copyright IBM Corp. 2015, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { featureFlagInfo } from './generated/feature-flags';

const featureFlags = new Map();

for (let i = 0; i < featureFlagInfo.length; i++) {
  const featureFlag = featureFlagInfo[i];
  featureFlags.set(featureFlag.name, featureFlag.enabled);
}

/**
 * Check to see if a flag exists
 * @param {string} name
 */
function checkForFlag(name) {
  if (!featureFlags.has(name)) {
    throw new Error(`Unable to find a feature flag with the name \`${name}\``);
  }
}

/**
 * Add a feature flag
 * @param {string} name
 * @param {boolean} enabled
 */
export function add(name, enabled) {
  if (featureFlags.has(name)) {
    throw new Error(`The feature flag: ${name} already exists`);
  }
  featureFlags.set(name, enabled);
}

/**
 * Enable a feature flag
 * @param {string} name
 */
export function enable(name) {
  checkForFlag(name);
  featureFlags.set(name, true);
}

/**
 * Disable a feature flag
 * @param {string} name
 */
export function disable(name) {
  checkForFlag(name);
  featureFlags.set(name, false);
}

/**
 * Merge the given feature flags with the current set of feature flags.
 * Duplicate keys will be set to the value in the given feature flags.
 * @param {object} flags
 */
export function merge(flags) {
  Object.keys(flags).forEach((key) => {
    featureFlags.set(key, flags[key]);
  });
}

/**
 * Check if a feature flag is enabled
 * @param {string} name
 * @returns {boolean}
 */
export function enabled(name) {
  checkForFlag(name);
  return featureFlags.get(name);
}

export { featureFlagInfo as unstable_featureFlagInfo };
