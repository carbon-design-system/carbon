/**
 * Copyright IBM Corp. 2015, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export type FeatureFlagRecord = Record<string, boolean>;
// TODO: Remove in the next major version.
/** @deprecated Use `FeatureFlagRecord` instead. */
export type FeatureFlags = FeatureFlagRecord;

export class FeatureFlagScope {
  flags: Map<string, boolean>;

  constructor(flags?: FeatureFlagRecord) {
    this.flags = new Map<string, boolean>();

    if (flags) {
      Object.keys(flags).forEach((key) => {
        this.flags.set(key, flags[key]);
      });
    }
  }

  /**
   * Check to see if a flag exists
   */
  checkForFlag(name: string) {
    if (!this.flags.has(name)) {
      throw new Error(
        `Unable to find a feature flag with the name: \`${name}\``
      );
    }
  }

  /**
   * Add a feature flag
   */
  add(name: string, enabled: boolean) {
    if (this.flags.has(name)) {
      throw new Error(`The feature flag: ${name} already exists`);
    }
    this.flags.set(name, enabled);
  }

  /**
   * Enable a feature flag
   */
  enable(name: string) {
    this.checkForFlag(name);
    this.flags.set(name, true);
  }

  /**
   * Disable a feature flag
   */
  disable(name: string) {
    this.checkForFlag(name);
    this.flags.set(name, false);
  }

  /**
   * Merge the given feature flags with the current set of feature flags.
   * Duplicate keys will be set to the value in the given feature flags.
   */
  merge(flags: FeatureFlagRecord) {
    Object.keys(flags).forEach((key) => {
      this.flags.set(key, flags[key]);
    });
  }

  mergeWithScope(scope: FeatureFlagScope) {
    for (const [key, value] of scope.flags) {
      if (this.flags.has(key)) {
        continue;
      }
      this.flags.set(key, value);
    }
  }

  /**
   * Check if a feature flag is enabled
   */
  enabled(name: string) {
    this.checkForFlag(name);

    return this.flags.get(name) ?? false;
  }
}
