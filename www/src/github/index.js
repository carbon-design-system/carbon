/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import fs from 'fs-extra';
import path from 'path';
import { percent } from '../format';

const DATA_DIRECTORY = path.join(process.cwd(), 'data');

let _data = null;

export async function loadGitHubData() {
  if (_data) {
    return _data;
  }

  const snapshotPath = path.join(DATA_DIRECTORY, 'snapshot.json');
  const snapshot = await fs.readJson(snapshotPath);
  const issues = await Promise.all(
    snapshot.issues.map(async ({ owner, repo, filepath }) => {
      return {
        owner,
        repo,
        issues: await fs.readJson(path.join(DATA_DIRECTORY, filepath)),
      };
    })
  );
  const pulls = await Promise.all(
    snapshot.pulls.map(async ({ owner, repo, filepath }) => {
      return {
        owner,
        repo,
        pulls: await fs.readJson(path.join(DATA_DIRECTORY, filepath)),
      };
    })
  );

  _data = {
    issues,
    pulls,
    timestamp: snapshot.created_at,
  };

  return _data;
}

export async function getRepoIssueDetails({ owner, repo }) {
  const data = await loadGitHubData();
  const match = data.issues.find((item) => {
    return item.owner === owner && item.repo === repo;
  });

  if (!match) {
    throw new Error(`Unable to load issue data for ${owner}:${repo}`);
  }

  return {
    issues: match.issues,
    timestamp: data.timestamp,
  };
}

export async function getRepoPullDetails({ owner, repo }) {
  const data = await loadGitHubData();
  const match = data.pulls.find((item) => {
    return item.owner === owner && item.repo === repo;
  });

  if (!match) {
    throw new Error(`Unable to load pull data for ${owner}:${repo}`);
  }

  return {
    pulls: match.pulls,
    timestamp: data.timestamp,
  };
}

export function getLabelBreakdown(collection) {
  const total = collection.length;
  const labels = new Map();

  for (const item of collection) {
    for (const label of item.labels) {
      if (!labels.has(label.id)) {
        labels.set(label.id, {
          name: label.name,
          count: 0,
        });
      }
      const entry = labels.get(label.id);
      labels.set(label.id, {
        ...entry,
        count: entry.count + 1,
      });
    }
  }

  return Array.from(labels.values())
    .sort((a, b) => {
      return b.count - a.count;
    })
    .map((label) => {
      return {
        ...label,
        percent: percent(total, label.count),
      };
    });
}
