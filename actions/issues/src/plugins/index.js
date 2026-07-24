/**
 * Copyright IBM Corp. 2020, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Central registry for every issue-triage plugin. Plugins run sequentially in
 * this order, while the runner records failures and continues with independent
 * plugins so one API failure does not hide all later diagnostics.
 */
import initializeBugMetadata from './initialize-bug-metadata.js';
import manageContributionComments from './manage-contribution-comments.js';
import bobBugTriage from './bob-bug-triage.js';

export const plugins = [
  // Initialize fields and community defaults before generating assessment text.
  initializeBugMetadata,
  // Preserve the behavior formerly spread across four contribution workflows.
  manageContributionComments,
  // Run Bob last because it is the slowest plugin and is independent of fields.
  bobBugTriage,
];
