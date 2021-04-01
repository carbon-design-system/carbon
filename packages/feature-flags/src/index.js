/**
 * Copyright IBM Corp. 2015, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { featureFlagInfo } from './generated/feature-flags';
import { FeatureFlagScope } from './FeatureFlagScope';

const FeatureFlags = createScope();

for (let i = 0; i < featureFlagInfo.length; i++) {
  const featureFlag = featureFlagInfo[i];
  FeatureFlags.add(featureFlag.name, featureFlag.enabled);
}

export { FeatureFlags };

export function createScope(flags) {
  return new FeatureFlagScope(flags);
}

export function add(...args) {
  return FeatureFlags.add(...args);
}

export function enable(...args) {
  return FeatureFlags.enable(...args);
}

export function disable(...args) {
  return FeatureFlags.disable(...args);
}

export function enabled(...args) {
  return FeatureFlags.enabled(...args);
}

export function merge(...args) {
  return FeatureFlags.merge(...args);
}
