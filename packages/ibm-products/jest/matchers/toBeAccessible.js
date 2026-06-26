/**
 * Copyright IBM Corp. 2020, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// https://github.com/IBMa/equal-access/blob/master/accessibility-checker/boilerplates/jest/matchers/toBeAccessible.js

// Initialize accessibility-checker eagerly at module load time (during
// setupFilesAfterEnv), not lazily inside a test. Jest 30 (circus) forbids
// registering hooks (afterAll etc.) from within a running test, and
// accessibility-checker registers its own afterAll on first require.
import * as accessibilityChecker from 'accessibility-checker';

const { assertCompliance, getCompliance, stringifyResults } =
  accessibilityChecker;

export default async function toBeAccessible(node, label) {
  const { report } = await getCompliance(node, label);

  return {
    message: () => stringifyResults(report),
    pass: assertCompliance(report) === 0,
  };
}
