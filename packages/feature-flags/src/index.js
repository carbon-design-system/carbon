/**
 * Copyright IBM Corp. 2015, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { featureFlagInfo } from './generated/feature-flags';

const featureFlags = createScope();

for (let i = 0; i < featureFlagInfo.length; i++) {
  const featureFlag = featureFlagInfo[i];
  featureFlags.add(featureFlag.name, featureFlag.enabled);
}

export function add(...args) {
  return featureFlags.add(...args);
}

export function enable(...args) {
  return featureFlags.enable(...args);
}

export function disable(...args) {
  return featureFlags.disable(...args);
}

export function enabled(...args) {
  return featureFlags.enabled(...args);
}

export function merge(...args) {
  return featureFlags.merge(...args);
}

export function createScope(flags) {
  return new FeatureFlagScope(flags);
}
