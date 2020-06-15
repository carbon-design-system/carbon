/**
 * Copyright IBM Corp. 2015, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import featureFlagInfo from './generated/feature-flags';

const featureFlagState = new Map();

for (let i = 0; i < featureFlagInfo.length; i++) {
  const featureFlag = featureFlagInfo[i];
  featureFlagState.set(featureFlag.name, featureFlag.enabled);
}

function checkForFlag(name) {
  if (!featureFlagState.has(name)) {
    throw new Error(`Unable to find a feature flag with the name ${name}`);
  }
}

export function addFeatureFlag(name, enabled) {
  featureFlagState.set(name, enabled);
}

export function enableFeatureFlag(name) {
  checkForFlag(name);
  featureFlagState.set(name, true);
}

export function disableFeatureFlag(name) {
  checkForFlag(name);
  featureFlagState.set(name, false);
}

export function featureFlagEnabled(name) {
  checkForFlag(name);
  return featureFlagState.get(name);
}

export { featureFlagInfo as unstable_featureFlagInfo };

export const featureFlags = featureFlagInfo.map((flag) => flag.name);
