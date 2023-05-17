/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  isAfter,
  isBefore,
  parseISO,
  isWithinInterval,
  formatISO,
} from 'date-fns';
import fs from 'fs-extra';
import path from 'path';
import { percent, percentChanged } from '../format';
import { getSprintsByYear } from '../sprints';

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

export async function getIssueStatistics(owner, repo) {
  const details = await getRepoIssueDetails({
    owner,
    repo,
  });

  const filters = {
    open: (issue) => {
      return issue.state === 'open';
    },
    closed: (issue) => {
      return issue.state === 'closed';
    },
    created: (interval) => (issue) => {
      return isWithinInterval(parseISO(issue.created_at), interval);
    },
    closed_at: (interval) => (issue) => {
      if (issue.closed_at) {
        return isWithinInterval(parseISO(issue.closed_at), interval);
      }
      return false;
    },
  };

  function apply(collection, ...filters) {
    return filters.reduce((acc, filter) => {
      const result = [];

      for (const item of acc) {
        if (filter(item)) {
          result.push(item);
        }
      }

      return result;
    }, collection);
  }

  function or(a, b) {
    return (issue) => {
      if (a(issue) || b(issue)) {
        return true;
      }
      return false;
    };
  }

  function mean(collection, getValue) {
    let result = 0;
    for (const item of collection) {
      result += getValue(item);
    }
    return result / collection.length;
  }

  function median(collection, getValue) {
    const values = collection
      .map((item) => {
        return getValue(item);
      })
      .sort();
    return values[Math.floor(collection.length / 2)];
  }

  function sum(collection, getValue) {
    return collection.reduce((acc, item) => {
      return acc + getValue(item);
    }, 0);
  }

  function stddev(collection, getValue) {
    const count = collection.length;
    const m = mean(collection, getValue);
    const differences = collection.map((item) => {
      const value = getValue(item);
      const difference = value - m;
      return Math.pow(difference, 2);
    });
    const differences_sum = sum(differences, (i) => i);
    const variance = differences_sum / count;
    return Math.sqrt(variance);
  }

  const open = apply(details.issues, filters.open);
  const sprints = getSprintsByYear(2022)
    .map((sprint) => {
      const itemsWithActivity = apply(
        details.issues,
        or(filters.created(sprint), filters.closed_at(sprint))
      );
      const created = apply(details.issues, filters.created(sprint));
      const closed = apply(details.issues, filters.closed_at(sprint));
      const open = details.issues.filter((issue) => {
        if (isAfter(parseISO(issue.created_at), sprint.end)) {
          return false;
        }

        if (issue.state === 'open') {
          return true;
        }

        if (isBefore(parseISO(issue.closed_at), sprint.end)) {
          return false;
        }

        return true;
      });
      const states = {
        open: {
          total: open.length,
        },
        created: {
          total: created.length,
          percent: percent(itemsWithActivity.length, created.length),
        },
        closed: {
          total: closed.length,
          percent: percent(itemsWithActivity.length, closed.length),
        },
      };
      return {
        start: formatISO(sprint.start),
        end: formatISO(sprint.end),
        issues: {
          states,
        },
      };
    })
    .map((sprint, index, sprints) => {
      if (index === 0) {
        return sprint;
      }
      const prevSprint = sprints[index - 1];
      return {
        ...sprint,
        issues: {
          ...sprint.issues,
          states: {
            ...sprint.issues.states,
            open: {
              ...sprint.issues.states.open,
              change: percentChanged(
                prevSprint.issues.states.open.total,
                sprint.issues.states.open.total
              ),
            },
            created: {
              ...sprint.issues.states.created,
              change: percentChanged(
                prevSprint.issues.states.created.total,
                sprint.issues.states.created.total
              ),
            },
            closed: {
              ...sprint.issues.states.closed,
              change: percentChanged(
                prevSprint.issues.states.closed.total,
                sprint.issues.states.closed.total
              ),
            },
          },
        },
      };
    });

  return {
    issues: {
      open: open.length,
      labels: getLabelBreakdown(open).splice(0, 10),
    },
    sprints: sprints.reverse(),
    statistics: {
      issues_closed_per_sprint: {
        mean: mean(sprints, (sprint) => {
          return sprint.issues.states.closed.total;
        }),
        median: median(sprints, (sprint) => {
          return sprint.issues.states.closed.total;
        }),
        stddev: stddev(sprints, (sprint) => {
          return sprint.issues.states.closed.total;
        }),
      },
      issues_created_per_sprint: {
        mean: mean(sprints, (sprint) => {
          return sprint.issues.states.created.total;
        }),
        median: median(sprints, (sprint) => {
          return sprint.issues.states.created.total;
        }),
        stddev: stddev(sprints, (sprint) => {
          return sprint.issues.states.created.total;
        }),
      },
    },
  };
}

export function getEnabledRepos() {
  return [
    {
      owner: 'carbon-design-system',
      repo: 'carbon',
    },
    {
      owner: 'carbon-design-system',
      repo: 'carbon-website',
    },
    {
      owner: 'carbon-design-system',
      repo: 'carbon-charts',
    },
  ];
}
