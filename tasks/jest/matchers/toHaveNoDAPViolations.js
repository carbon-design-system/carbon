/**
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

let AAT;

async function toHaveNoDAPViolations(node, label) {
  // We defer initialization of AAT as it seems to have a race condition if
  // we are running a test suite in node instead of jsdom. As a result, we only
  // initialize it if this matcher is called
  if (!AAT) {
    AAT = require('@ibma/aat');
  }

  const results = await AAT.getCompliance(node, label);
  if (AAT.assertCompliance(results.report) === 0) {
    return {
      pass: true,
    };
  } else {
    return {
      pass: false,
      message: () => AAT.stringifyResults(results.report),
    };
  }
}

module.exports = toHaveNoDAPViolations;
