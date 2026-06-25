/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// https://github.com/IBMa/equal-access/blob/master/accessibility-checker/boilerplates/jest/matchers/toBeAccessible.js

let accessibilityChecker;

export default async (node, label) => {
  // For performance, defer initialization to when the matcher is needed.
  if (!accessibilityChecker) {
    accessibilityChecker = require('accessibility-checker');
  }

  const { assertCompliance, getCompliance, stringifyResults } =
    accessibilityChecker;

  const { report } = await getCompliance(node, label);

  return {
    message: () => stringifyResults(report),
    pass: assertCompliance(report) === 0,
  };
};
