/**
 * Copyright IBM Corp. 2020, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { events, states } = require('../conditions');
const labels = require('../labels');

const { needsTriage, waitingForAuthor, waitingForMaintainer } = labels.status;

const plugin = {
  name: 'Add triage response',
  conditions: [
    events.comments.created,
    states.issues.open,
    states.issues.has(needsTriage),
  ],
  async run(context, octokit) {
    const { comment, issue, repository } = context.payload;
    const roles = new Set(['OWNER', 'COLLABORATOR', 'MEMBER']);

    // waiting for author's response
    if (roles.has(comment.author_association)) {
      const hasMaintainerLabel = issue.labels.find((label) => {
        return label.name === waitingForMaintainer;
      });
      if (hasMaintainerLabel) {
        await octokit.issues.removeLabel({
          owner: repository.owner.login,
          repo: repository.name,
          issue_number: issue.number,
          name: waitingForMaintainer,
        });
      }

      const hasAuthorLabel = issue.labels.find((label) => {
        return label.name === waitingForAuthor;
      });

      if (hasAuthorLabel) {
        return;
      }

      await octokit.issues.addLabels({
        owner: repository.owner.login,
        repo: repository.name,
        issue_number: issue.number,
        labels: [waitingForAuthor],
      });
    } else {
      const hasAuthorLabel = issue.labels.find((label) => {
        return label.name === waitingForAuthor;
      });
      if (hasAuthorLabel) {
        await octokit.issues.removeLabel({
          owner: repository.owner.login,
          repo: repository.name,
          issue_number: issue.number,
          name: waitingForAuthor,
        });
      }

      const hasMaintainerLabel = issue.labels.find((label) => {
        return label.name === waitingForMaintainer;
      });
      if (hasMaintainerLabel) {
        return;
      }

      await octokit.issues.addLabels({
        owner: repository.owner.login,
        repo: repository.name,
        issue_number: issue.number,
        labels: [waitingForMaintainer],
      });
    }
  },
};

module.exports = plugin;
