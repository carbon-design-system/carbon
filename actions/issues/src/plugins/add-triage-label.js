/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as core from '@actions/core';
import { events } from '../conditions.js';
import labels from '../labels.js';

const plugin = {
  name: 'Add triage label',
  conditions: [events.issues.opened],
  async run(context, octokit) {
    const { issue, repository } = context.payload;
    const roles = new Set(['OWNER', 'COLLABORATOR', 'MEMBER']);
    if (roles.has(issue.author_association)) {
      core.info(
        'Issue opened by project collaborator. No triage label necessary'
      );
      return;
    }

    const hasTriageLabel = issue.labels.find((label) => {
      return label.name === labels.status.needsTriage;
    });

    if (!hasTriageLabel) {
      await octokit.rest.issues.addLabels({
        owner: repository.owner.login,
        repo: repository.name,
        issue_number: issue.number,
        labels: [labels.status.needsTriage],
      });
    }
  },
};

export default plugin;
