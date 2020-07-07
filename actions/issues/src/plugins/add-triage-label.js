/**
 * Copyright IBM Corp. 2020, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const core = require('@actions/core');
const { events } = require('../github');
const { needsTriageLabel } = require('../labels');

const plugin = {
  name: 'Add triage label',
  conditions: [events.issues.opened],
  async run(context, octokit) {
    const { issue, repository } = context.payload;
    const roles = new Set(['OWNER', 'COLLABORATOR']);
    if (roles.has(issue.author_association)) {
      core.info(
        'Issue opened by project collaborator. No triage label necessary'
      );
      return;
    }

    const hasTriageLabel = issue.labels.find((label) => {
      return label.name === needsTriageLabel;
    });

    if (!hasTriageLabel) {
      await octokit.issues.addLabels({
        owner: repository.owner.login,
        repo: repository.name,
        issue_number: issue.number,
        labels: [needsTriageLabel],
      });
    }
  },
};

module.exports = plugin;
