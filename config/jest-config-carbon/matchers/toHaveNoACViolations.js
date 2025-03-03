/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

let aChecker = null;

async function toHaveNoACViolations(node, label) {
  if (aChecker === null) {
    aChecker = require('accessibility-checker');

    const denylist = new Set([
      'html_lang_exists',
      'page_title_exists',
      'skip_main_exists',
      'html_skipnav_exists',
      'aria_content_in_landmark',
      'aria_child_tabbable',
    ]);
    const ruleset = await aChecker.getRuleset('IBM_Accessibility');
    const customRuleset = JSON.parse(JSON.stringify(ruleset));

    customRuleset.id = 'Custom_Ruleset';
    customRuleset.checkpoints = customRuleset.checkpoints.map((checkpoint) => {
      checkpoint.rules = checkpoint.rules.filter((rule) => {
        return !denylist.has(rule.id);
      });
      return checkpoint;
    });

    aChecker.addRuleset(customRuleset);
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
