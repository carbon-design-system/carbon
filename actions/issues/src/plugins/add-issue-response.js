/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { events, states, or } = require('../conditions');
const labels = require('../labels');

const {
  needsTriage,
  needsMoreInfo,
  waitingForAuthor,
  waitingForMaintainer,
  question,
} = labels.status;

const teams = ['design', 'developers-system'];

const plugin = {
  name: 'Add triage response',
  conditions: [
    events.comments.created,
    states.issues.open,
    or(
      states.issues.has(needsTriage),
      states.issues.has(needsMoreInfo),
      states.issues.has(question)
    ),
  ],
  async run(context, octokit) {
    const { comment, issue, repository } = context.payload;
    const roles = new Set(['OWNER', 'COLLABORATOR', 'MEMBER']);

    // waiting for author's response
    if (roles.has(comment.author_association)) {
      const hasMaintainerLabel = issue.labels.find((label) => {
        return label.name === waitingForMaintainer;
      });

      // Check if the `comment.body` contains a mention to another team member
      const members = await Promise.all(
        teams.map(async (slug) => {
          const { data } = await octokit.teams.listMembersInOrg({
            org: 'carbon-design-system',
            team_slug: slug,
          });
          return data.map((member) => {
            return member.login;
          });
        })
      ).then((responses) => {
        // Deduplicate members in case the same member is on different teams
        const members = new Set(responses.flat());
        return Array.from(members);
      });
      const doesNotMentionAnotherMember = members.every((member) => {
        return !comment.body.includes(`@${member.slug}`);
      });

      if (hasMaintainerLabel && doesNotMentionAnotherMember) {
        await octokit.rest.issues.removeLabel({
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

      await octokit.rest.issues.addLabels({
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
        await octokit.rest.issues.removeLabel({
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

      await octokit.rest.issues.addLabels({
        owner: repository.owner.login,
        repo: repository.name,
        issue_number: issue.number,
        labels: [waitingForMaintainer],
      });
    }
  },
};

module.exports = plugin;
