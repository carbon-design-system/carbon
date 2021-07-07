'use strict';

let aChecker = null;

async function toHaveNoACViolations(node, label) {
  if (aChecker === null) {
    aChecker = require('accessibility-checker');
  }

  let results = await aChecker.getCompliance(node, label);
  if (aChecker.assertCompliance(results.report) === 0) {
    return {
      pass: true,
    };
  } else {
    return {
      pass: false,
      message: () => aChecker.stringifyResults(results.report),
    };
  }
}

module.exports = toHaveNoACViolations;
