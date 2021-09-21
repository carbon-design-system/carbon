/**
 * Copyright IBM Corp. 2020, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const github = require('@actions/github');
const core = require('@actions/core');

async function run() {
  const { context } = github;
  const token = core.getInput('GITHUB_TOKEN', {
    required: true,
  });
  const autoLabelUsers = core.getInput('AUTO_LABEL_USERS').split(',');
  const octokit = new github.GitHub(token);
  const { pull_request: pullRequest, repository, review } = context.payload;
  const { state, draft } = pullRequest;

  // We only want to work with Pull Requests that are marked as open
  if (state !== 'open') {
    return;
  }

  // We only want to work with Pull Requests that are not draft PRs
  if (draft) {
    return;
  }

  const {
    data: permissionLevel,
  } = await octokit.repos.getCollaboratorPermissionLevel({
    owner: repository.owner.login,
    repo: repository.name,
    username: review.user.login,
  });

  // If the reviewer doesn't have one of the following permission levels
  // then ignore the event
  const acceptedPermissionLevels = new Set(['admin', 'write']);
  if (!acceptedPermissionLevels.has(permissionLevel.permission)) {
    return;
  }

  // If the review was not an approval then we'll ignore the event
  if (review.state !== 'approved') {
    return;
  }

  const { data: allReviews } = await octokit.pulls.listReviews({
    owner: repository.owner.login,
    repo: repository.name,
    pull_number: pullRequest.number,
    per_page: 100,
  });

  // The `listReviews` endpoint will return all of the reviews for the pull
  // request. We only care about the most recent reviews so we'll go through the
  // list and get the most recent review for each reviewer
  const reviewers = {};
  const reviews = [];

  // Process reviews in reverse order since they are listed from oldest to newest
  for (const review of allReviews.reverse()) {
    const { author_association: association, user } = review;
    // If we've already saved a review for this user we already have the most
    // recent review
    if (reviewers[user.login]) {
      continue;
    }

    // If the author of the review is not a collaborator we ignore it
    if (association !== 'COLLABORATOR') {
      continue;
    }

    reviewers[user.login] = true;
    reviews.push(review);
  }

  const approved = reviews.filter((review) => {
    return review.state === 'APPROVED';
  });

  const additionalReviewLabel = 'status: one more review 👀';
  const readyForReviewLabel = 'status: ready for review 👀';
  const readyToMergeLabel = 'status: ready to merge 🎉';
  const visualReviewLabel = 'status: visual review 🔍';
  const contentReviewLabel = 'status: content review ✍️';
  const needsReviewLabels = new Set([visualReviewLabel, contentReviewLabel]);

  if (approved.length > 0) {
    const hasReadyLabel = pullRequest.labels.find((label) => {
      return label.name === readyForReviewLabel;
    });
    if (hasReadyLabel) {
      await octokit.issues.removeLabel({
        owner: repository.owner.login,
        repo: repository.name,
        issue_number: pullRequest.number,
        name: readyForReviewLabel,
      });
    }
  }

  if (approved.length === 1) {
    const hasAdditionalReviewLabel = pullRequest.labels.find((label) => {
      return label.name === additionalReviewLabel;
    });
    if (!hasAdditionalReviewLabel) {
      await octokit.issues.addLabels({
        owner: repository.owner.login,
        repo: repository.name,
        issue_number: pullRequest.number,
        labels: [additionalReviewLabel],
      });
    }
    return;
  }

  if (approved.length >= 2) {
    const hasAdditionalReviewLabel = pullRequest.labels.find((label) => {
      return label.name === additionalReviewLabel;
    });
    if (hasAdditionalReviewLabel) {
      await octokit.issues.removeLabel({
        owner: repository.owner.login,
        repo: repository.name,
        issue_number: pullRequest.number,
        name: additionalReviewLabel,
      });
    }

    const allNeedsReviewLabels = pullRequest.labels.filter((label) => {
      return needsReviewLabels.has(label.name);
    });
    if (allNeedsReviewLabels.length > 0) {
      return;
    }

    const shouldAutoLabel = autoLabelUsers.find((user) => {
      return user === pullRequest.user.login;
    });
    if (shouldAutoLabel) {
      await octokit.issues.addLabels({
        owner: repository.owner.login,
        repo: repository.name,
        issue_number: pullRequest.number,
        labels: [readyToMergeLabel],
      });
    }
    return;
  }
}

run().catch((error) => {
  console.log(error);
  process.exit(1);
});
