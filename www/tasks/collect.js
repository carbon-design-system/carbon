/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { Octokit } = require('@octokit/rest');
const { retry } = require('@octokit/plugin-retry');
const { throttling } = require('@octokit/plugin-throttling');
const fs = require('fs-extra');
const path = require('path');

const CustomOctokit = Octokit.plugin(retry, throttling);
const octokit = new CustomOctokit({
  auth: process.env.GH_TOKEN,
  userAgent: 'carbon',
  throttle: {
    onRateLimit: (retryAfter, options) => {
      octokit.log.warn(
        `Request quota exhausted for request ${options.method} ${options.url}`
      );

      if (options.request.retryCount === 0) {
        // only retries once
        octokit.log.info(`Retrying after ${retryAfter} seconds!`);
        return true;
      }
    },
    onAbuseLimit: (_retryAfter, options) => {
      // does not retry, only logs a warning
      octokit.log.warn(
        `Abuse detected for request ${options.method} ${options.url}`
      );

      return true;
    },
  },
  retry: {
    doNotRetry: ['429'],
  },
});
const DATA_DIRECTORY = path.resolve(__dirname, '../data');
const ISSUE_FIELDS = new Set([
  'number',
  'title',
  'labels',
  'created_at',
  'closed_at',
  'state',
  'html_url',
  'author_association',
]);
const PULL_FIELDS = new Set([
  'number',
  'state',
  'title',
  'created_at',
  'closed_at',
  'merged_at',
  'labels',
  'author_association',
  'html_url',
]);

async function main() {
  const repos = [
    {
      owner: 'carbon-design-system',
      repo: 'carbon',
    },
    {
      owner: 'carbon-design-system',
      repo: 'carbon-charts',
    },
    {
      owner: 'carbon-design-system',
      repo: 'carbon-website',
    },
  ];

  const today = new Date();
  const snapshot = {
    issues: [],
    pulls: [],
    created_at: today.toISOString(),
  };

  for (const { owner, repo } of repos) {
    console.log('Fetching issue data for: %s/%s', owner, repo);

    const filepath = path.join(DATA_DIRECTORY, 'issues', owner, `${repo}.json`);
    const iterator = octokit.paginate.iterator(
      octokit.rest.issues.listForRepo,
      {
        owner,
        repo,
        per_page: 100,
        state: 'all',
      }
    );
    const issues = [];
    let pageIndex = 0;

    for await (const page of iterator) {
      console.log('Page: %s', ++pageIndex);

      issues.push(
        ...page.data
          .filter((item) => {
            return !item.pull_request;
          })
          .map((item) => {
            const filtered = {};
            for (const [key, value] of Object.entries(item)) {
              if (ISSUE_FIELDS.has(key)) {
                filtered[key] = value;
              }
            }
            return filtered;
          })
      );
    }

    await fs.ensureFile(filepath);
    await fs.writeJson(filepath, issues);

    snapshot.issues.push({
      owner,
      repo,
      filepath: path.relative(DATA_DIRECTORY, filepath),
    });
  }

  for (const { owner, repo } of repos) {
    console.log('Fetching pull data for: %s/%s', owner, repo);

    const filepath = path.join(DATA_DIRECTORY, 'pulls', owner, `${repo}.json`);
    const iterator = octokit.paginate.iterator(octokit.rest.pulls.list, {
      owner,
      repo,
      per_page: 100,
      state: 'all',
    });
    const pulls = [];
    let pageIndex = 0;

    for await (const page of iterator) {
      console.log('Page: %s', ++pageIndex);

      pulls.push(
        ...page.data.map((item) => {
          const filtered = {};
          for (const [key, value] of Object.entries(item)) {
            if (PULL_FIELDS.has(key)) {
              filtered[key] = value;
            }
          }
          return filtered;
        })
      );
    }

    await fs.ensureFile(filepath);
    await fs.writeJson(filepath, pulls);

    snapshot.pulls.push({
      owner,
      repo,
      filepath: path.relative(DATA_DIRECTORY, filepath),
    });
  }

  const filepath = path.join(DATA_DIRECTORY, 'snapshot.json');
  await fs.ensureFile(filepath);
  await fs.writeJson(filepath, snapshot);
}

main().catch((error) => {
  console.log(error);
  process.exit(1);
});
