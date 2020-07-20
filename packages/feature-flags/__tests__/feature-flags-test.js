/**
 * Copyright IBM Corp. 2015, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  addFeatureFlag,
  enableFeatureFlag,
  disableFeatureFlag,
  featureFlagEnabled,
} from '../src';

describe('@carbon/feature-flags', () => {
  it('should let the user check if a feature flag is enabled', () => {
    addFeatureFlag('test', false);
    expect(featureFlagEnabled('test')).toBe(false);

    enableFeatureFlag('test');
    expect(featureFlagEnabled('test')).toBe(true);

    disableFeatureFlag('test');
    expect(featureFlagEnabled('test')).toBe(false);
  });

  it('should throw an error if a flag does not exist', () => {
    expect(() => {
      enableFeatureFlag('does-not-exist');
    }).toThrow();

    expect(() => {
      disableFeatureFlag('does-not-exist');
    }).toThrow();

    expect(() => {
      featureFlagEnabled('does-not-exist');
    }).toThrow();
  });
});
