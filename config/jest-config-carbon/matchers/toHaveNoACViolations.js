/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as aChecker from 'accessibility-checker';

// defer loading the engine until a test actually asserts against it
let aCheckerPromise;

const getAChecker = () => {
  aCheckerPromise ??= (async () => {
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
    return aChecker;
  })();

  return aCheckerPromise;
};

async function toHaveNoACViolations(node, label) {
  const aChecker = await getAChecker();
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

export default toHaveNoACViolations;
