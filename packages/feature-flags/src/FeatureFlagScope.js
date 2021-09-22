/**
 * Copyright IBM Corp. 2015, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export class FeatureFlagScope {
  constructor(flags) {
    this.flags = new Map();

    if (flags) {
      Object.keys(flags).forEach((key) => {
        this.flags.set(key, flags[key]);
      });
    }
  }

  /**
   * Check to see if a flag exists
   * @param {string} name
   */
  checkForFlag(name) {
    if (!this.flags.has(name)) {
      throw new Error(
        `Unable to find a feature flag with the name: \`${name}\``
      );
    }
  }

  /**
   * Add a feature flag
   * @param {string} name
   * @param {boolean} enabled
   */
  add(name, enabled) {
    if (this.flags.has(name)) {
      throw new Error(`The feature flag: ${name} already exists`);
    }
    this.flags.set(name, enabled);
  }

  /**
   * Enable a feature flag
   * @param {string} name
   */
  enable(name) {
    this.checkForFlag(name);
    this.flags.set(name, true);
  }

  /**
   * Disable a feature flag
   * @param {string} name
   */
  disable(name) {
    this.checkForFlag(name);
    this.flags.set(name, false);
  }

  /**
   * Merge the given feature flags with the current set of feature flags.
   * Duplicate keys will be set to the value in the given feature flags.
   * @param {object} flags
   */
  merge(flags) {
    Object.keys(flags).forEach((key) => {
      this.flags.set(key, flags[key]);
    });
  }

  /**
   * @param {FeatureFlagScope} scope
   */
  mergeWithScope(scope) {
    for (const [key, value] of scope.flags) {
      if (this.flags.has(key)) {
        continue;
      }
      this.flags.set(key, value);
    }
  }

  /**
   * Check if a feature flag is enabled
   * @param {string} name
   * @returns {boolean}
   */
  enabled(name) {
    this.checkForFlag(name);
    return this.flags.get(name);
  }
}
