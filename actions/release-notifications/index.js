/**
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';
const core = require('@actions/core');
const github = require('@actions/github');
const { request } = require('@octokit/request');
let githubtoken = core.getInput('GITHUB_TOKEN', { required: true });
const octokit = github.getOctokit(githubtoken);

async function run() {
  let owner = core.getInput('OWNER', { required: true });
  let repo = core.getInput('REPO_NAME', { required: true });

  if (repo.length <= 0 || owner.length <= 0) {
    core.setFailed('Invalid owner and repo details mentioned on action.yml');
    return;
  }

  let releaseDetails = await getReleases(owner, repo);

  let commitsRange = await getCommitsBetweenTwoTags(
    releaseDetails[1],
    releaseDetails[0],
    owner,
    repo
  );

  let pullRequestList = [];

  await Promise.all(
    commitsRange.map(async (x) => {
      let pullReqNumber = await getPullRequestForCommit(owner, repo, x.sha);

      if (!pullRequestList.includes(pullReqNumber[0])) {
        pullRequestList.push(pullReqNumber[0]);
      }
    })
  );
  pullRequestList.map((prNumber) => {
    sendComments(
      owner,
      repo,
      prNumber,
      `Hey there! ${releaseDetails[0]} was just released that references this issue/PR.`
    );
  });
}

run().catch((error) => {
  console.log(error);
  core.setFailed(`Error while executing the github action ${error}`);
  process.exit(1);
});

function sendComments(orgName, repoName, issue_number, message) {
  return octokit.rest.issues
    .createComment({
      owner: orgName,
      repo: repoName,
      issue_number: issue_number,
      body: message,
    })
    .then(() =>
      console.log(
        `Posted comment to https://www.github.com/carbon-design-system/carbon/issues/${issue_number}`
      )
    )
    .catch((err) => {
      console.log(
        `Error posting comment to https://www.github.com/carbon-design-system/carbon/issues/${issue_number}`
      );
      console.log(err);
    });
}

async function getReleases(owner, repo) {
  const result = await request(`GET /repos/${owner}/${repo}/releases`, {
    owner: owner,
    repo: repo,
    headers: {
      authorization: `token ${githubtoken}`,
    },
  });

  let releasesArray = result.data.map((x) => x.tag_name);
  console.log(
    `Gathered releases for ${owner}/${repo}, ${releasesArray[0]} to ${
      releasesArray[releasesArray.length - 1]
    }`
  );
  return releasesArray;
}

async function getCommitsBetweenTwoTags(startCommit, endCommit, owner, repo) {
  const result = await request(
    `GET /repos/${owner}/${repo}/compare/${startCommit}...${endCommit}`,
    {
      headers: {
        authorization: `token ${githubtoken}`,
      },
    }
  );

  console.log(
    `Gathered commits for ${owner}/${repo} from ${startCommit} to ${endCommit}`
  );

  return result.data.commits;
}

async function getPullRequestForCommit(owner, repo, commit) {
  const result = await request(
    `GET /repos/${owner}/${repo}/commits/${commit}/pulls`
  );

  const pullRequestList = result.data.map((x) => x.number);

  console.log(
    `Found ${pullRequestList.length} pull requests for commit ${commit} in ${owner}/${repo}:`
  );
  pullRequestList.forEach((pullRequestNumber, index) => {
    console.log(
      `${
        index + 1
      }. https://www.github.com/carbon-design-system/carbon/pull/${pullRequestNumber}`
    );
  });

  return pullRequestList;
}
