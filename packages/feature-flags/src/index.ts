/**
 * Copyright IBM Corp. 2015, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { featureFlagInfo } from './generated/feature-flags';
import { FeatureFlagScope, type FeatureFlagRecord } from './FeatureFlagScope';
export type { FeatureFlagRecord } from './FeatureFlagScope';

export const createScope = (flags?: FeatureFlagRecord) =>
  new FeatureFlagScope(flags);

const createDefaultScope = () => {
  const scope = createScope();

  for (const featureFlag of featureFlagInfo) {
    scope.add(featureFlag.name, featureFlag.enabled);
  }

  return scope;
};

export const FeatureFlags = createDefaultScope();

export const add = FeatureFlags.add.bind(FeatureFlags);
export const enable = FeatureFlags.enable.bind(FeatureFlags);
export const disable = FeatureFlags.disable.bind(FeatureFlags);
export const enabled = FeatureFlags.enabled.bind(FeatureFlags);
export const merge = FeatureFlags.merge.bind(FeatureFlags);
