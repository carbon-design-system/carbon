/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

'use strict';

const Octokit = require('@octokit/rest');
const { prompt } = require('inquirer');

const CustomOctokit = Octokit.plugin([
  require('@octokit/plugin-throttling'),
  require('@octokit/plugin-retry'),
]);

async function getGitHubClient() {
  let { GH_TOKEN } = process.env;

  if (!GH_TOKEN) {
    const question = [
      {
        type: 'password',
        name: 'token',
        message: 'Provide a GitHub access token',
        hint:
          'Help: https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line',
      },
    ];
    const answers = await prompt(question);
    GH_TOKEN = answers.token;
  }

  const octokit = new CustomOctokit({
    auth: `token ${GH_TOKEN}`,
    throttle: {
      onRateLimit: (retryAfter, options) => {
        console.log(
          `Request quota exhausted for request ${options.method} ${options.url}`
        );

        if (options.request.retryCount === 0) {
          // only retries once
          console.log(`Retrying after ${retryAfter} seconds!`);
          return true;
        }
      },
      onAbuseLimit: (retryAfter, options) => {
        // does not retry, only logs a warning
        console.log(
          `Abuse detected for request ${options.method} ${options.url}`
        );
        if (options.request.retryCount === 0) {
          // only retries once
          console.log(`Retrying after ${retryAfter} seconds!`);
          return true;
        }
      },
    },
  });

  try {
    await octokit.users.getAuthenticated();
    return octokit;
  } catch (error) {
    throw new Error('Invalid GitHub token');
  }
}

module.exports = getGitHubClient;
