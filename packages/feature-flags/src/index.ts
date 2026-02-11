/**
 * Copyright IBM Corp. 2015, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { featureFlagInfo } from './generated/feature-flags';
import { FeatureFlagScope, type FeatureFlagRecord } from './FeatureFlagScope';

const FeatureFlags = createScope();

for (let i = 0; i < featureFlagInfo.length; i++) {
  const featureFlag = featureFlagInfo[i];
  FeatureFlags.add(featureFlag.name, featureFlag.enabled);
}

export { FeatureFlags };

export function createScope(flags?: FeatureFlagRecord): FeatureFlagScope {
  return new FeatureFlagScope(flags);
}

export function add(name: string, enabled: boolean): void {
  FeatureFlags.add(name, enabled);
}

export function enable(name: string): void {
  FeatureFlags.enable(name);
}

export function disable(name: string): void {
  FeatureFlags.disable(name);
}

export function enabled(name: string): boolean {
  return FeatureFlags.enabled(name);
}

export function merge(flags: FeatureFlagRecord): void {
  FeatureFlags.merge(flags);
}
