/**
 * Copyright IBM Corp. 2020, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { events, states } = require('../github');
const { needsTriageLabel } = require('../labels');

const plugin = {
  name: 'Add triage response',
  conditions: [events.comments.created, states.issues.open],
  async run(context, octokit) {
    const { comment, issue, repository } = context.payload;
    const hasTriageLabel = issue.labels.find((label) => {
      return label.name === needsTriageLabel;
    });
    if (!hasTriageLabel) {
      return;
    }

    const author = `waiting on author's response`;
    const maintainer = `waiting on maintainer response`;
    const roles = new Set(['OWNER', 'COLLABORATOR']);

    // waiting for author's response
    if (roles.has(comment.author_association)) {
      const hasMaintainerLabel = issue.labels.find((label) => {
        return label.name === maintainer;
      });
      if (hasMaintainerLabel) {
        await octokit.issues.removeLabel({
          owner: repository.owner.login,
          repo: repository.name,
          issue_number: issue.number,
          name: maintainer,
        });
      }

      const hasAuthorLabel = issue.labels.find((label) => {
        return label.name === author;
      });

      if (hasAuthorLabel) {
        return;
      }

      await octokit.issues.addLabels({
        owner: repository.owner.login,
        repo: repository.name,
        issue_number: issue.number,
        labels: [author],
      });
    } else {
      const hasAuthorLabel = issue.labels.find((label) => {
        return label.name === author;
      });
      if (hasAuthorLabel) {
        await octokit.issues.removeLabel({
          owner: repository.owner.login,
          repo: repository.name,
          issue_number: issue.number,
          name: author,
        });
      }

      const hasMaintainerLabel = issue.labels.find((label) => {
        return label.name === maintainer;
      });
      if (hasMaintainerLabel) {
        return;
      }

      await octokit.issues.addLabels({
        owner: repository.owner.login,
        repo: repository.name,
        issue_number: issue.number,
        labels: [maintainer],
      });
    }
  },
};

module.exports = plugin;
