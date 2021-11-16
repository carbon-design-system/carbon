import {
  isAfter,
  isBefore,
  parseISO,
  startOfDay,
  endOfDay,
  sub,
  isWithinInterval,
} from 'date-fns';
import { octokit } from '../../github';

export default async function (req, res) {
  const result = await octokit.issues.listForRepo({
    owner: 'carbon-design-system',
    repo: 'carbon',
    per_page: 100,
    state: 'all',
  });
  const issues = result.filter((issue) => {
    if (issue.pull_request) {
      return false;
    }

    // https://docs.github.com/en/graphql/reference/enums#commentauthorassociation
    // if (issue.author_association === 'NONE') {
    // return true;
    // }

    return true;
  });

  for (const issue of issues) {
    console.log(issue.author_association);
  }

  const filters = {
    open: (issue) => {
      return issue.state === 'open';
    },
    closed: (issue) => {
      return issue.state === 'closed';
    },
    interval: (interval, field) => {
      return (issue) => {
        return isWithinInterval(parseISO(issue[field]), interval);
      };
    },
    created: (interval) => (issue) => {
      return isWithinInterval(parseISO(issue.created_at), interval);
    },
    closed: (interval) => (issue) => {
      if (issue.closed_at) {
        return isWithinInterval(parseISO(issue.closed_at), interval);
      }
      return false;
    },
  };

  function or(a, b) {
    return (issue) => {
      if (a(issue) || b(issue)) {
        return true;
      }
      return false;
    };
  }

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

  function percent(total, value) {
    return Math.round((value / total) * 100) + '%';
  }

  function percentChanged(x1, x2) {
    const value = Math.round(((x2 - x1) / x1) * 100);
    if (value > 0) {
      return {
        type: 'increase',
        value: value + '%',
      };
    }

    if (value < 0) {
      return {
        type: 'decrease',
        value: value + '%',
      };
    }

    return {
      type: 'neutral',
      value: value + '%',
    };
  }

  const prevSprints = 40;
  const sprints = [
    {
      start: startOfDay(new Date('1 November 2021')),
      end: endOfDay(new Date('12 November 2021')),
    },
  ];

  for (let i = 1; i < prevSprints; i++) {
    const prevSprint = sprints[i - 1];
    const sprint = {
      start: startOfDay(
        sub(prevSprint.start, {
          weeks: 2,
        })
      ),
      end: sub(prevSprint.end, {
        weeks: 2,
      }),
    };
    sprints.push(sprint);
  }
  const segments = sprints.map((sprint) => {
    const items = apply(
      issues,
      or(filters.created(sprint), filters.closed(sprint))
    );
    const created = apply(issues, filters.created(sprint));
    const closed = apply(issues, filters.closed(sprint));
    const open = issues.filter((issue) => {
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
        percent: percent(items.length, created.length),
      },
      closed: {
        total: closed.length,
        percent: percent(items.length, closed.length),
      },
    };

    const issueLabelsFrequency = new Map();

    for (const item of items) {
      for (const label of item.labels) {
        if (!issueLabelsFrequency.has(label.id)) {
          issueLabelsFrequency.set(label.id, {
            name: label.name,
            count: 0,
          });
        }

        const entry = issueLabelsFrequency.get(label.id);

        issueLabelsFrequency.set(label.id, {
          ...entry,
          count: entry.count + 1,
        });
      }
    }

    const labels = Array.from(issueLabelsFrequency.values())
      .filter((label) => {
        if (label.name.includes('status: needs triage')) {
          return false;
        }

        if (label.name.includes('status: waiting for author')) {
          return false;
        }

        return true;
      })
      .map((label) => {
        return {
          name: label.name,
          count: label.count,
          percent: percent(items.length, label.count),
        };
      })
      .sort((a, b) => {
        return b.count - a.count;
      })
      .slice(0, 5);

    return {
      ...sprint,
      issues: {
        states,
        labels,
      },
    };
  });

  for (let i = segments.length - 2; i >= 0; i--) {
    const prevSprint = segments[i + 1];
    const sprint = segments[i];

    segments[i] = {
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

  const issueLabels = new Map();
  const open = apply(issues, filters.open);

  for (const issue of open) {
    for (const label of issue.labels) {
      if (!issueLabels.has(label.id)) {
        issueLabels.set(label.id, {
          name: label.name,
          count: 0,
        });
      }

      const value = issueLabels.get(label.id);

      issueLabels.set(label.id, {
        ...value,
        count: value.count + 1,
      });
    }
  }

  const categories = Array.from(issueLabels.values())
    .map((label) => {
      return {
        ...label,
        percent: percent(open.length, label.count),
      };
    })
    .sort((a, b) => {
      return b.count - a.count;
    })
    .splice(0, 10);

  const json = {
    statistics: {
      issues_closed_per_sprint: {
        mean: mean(segments, (sprint) => {
          return sprint.issues.states.closed.total;
        }),
        median: median(segments, (sprint) => {
          return sprint.issues.states.closed.total;
        }),
        stddev: stddev(segments, (sprint) => {
          return sprint.issues.states.closed.total;
        }),
      },
      issues_created_per_sprint: {
        mean: mean(segments, (sprint) => {
          return sprint.issues.states.created.total;
        }),
        median: median(segments, (sprint) => {
          return sprint.issues.states.created.total;
        }),
        stddev: stddev(segments, (sprint) => {
          return sprint.issues.states.created.total;
        }),
      },
    },
    categories,
    sprints: segments,
  };

  res.send(JSON.stringify(json, null, 2));

  return;

  const segmentz = [
    {
      title: 'Last week',
      duration: {
        weeks: 1,
      },
    },
    {
      title: 'Last two weeks',
      duration: {
        weeks: 2,
      },
    },
    {
      title: 'Last month',
      duration: {
        months: 1,
      },
    },
    {
      title: 'Last three months',
      duration: {
        months: 3,
      },
    },
    {
      title: 'Last six months',
      duration: {
        months: 6,
      },
    },
  ];

  const payload = {
    segments: segments.map((segment) => {
      const end = startOfDay(new Date());
      const start = sub(end, segment.duration);
      const interval = {
        start,
        end,
      };
      const items = apply(
        issues,
        or(
          filters.interval(interval, 'created_at'),
          filters.interval(interval, 'closed_at')
        )
      );
      const opened = apply(items, filters.open);
      const closed = apply(items, filters.closed);
      const issueLabelsFrequency = new Map();

      for (const item of items) {
        for (const label of item.labels) {
          if (!issueLabelsFrequency.has(label.id)) {
            issueLabelsFrequency.set(label.id, {
              name: label.name,
              count: 0,
            });
          }

          const entry = issueLabelsFrequency.get(label.id);

          issueLabelsFrequency.set(label.id, {
            ...entry,
            count: entry.count + 1,
          });
        }
      }

      const types = {
        total: issueLabelsFrequency.size,
        labels: Array.from(issueLabelsFrequency.values())
          .filter((label) => {
            if (label.name.includes('status: needs triage')) {
              return false;
            }

            if (label.name.includes('status: waiting for author')) {
              return false;
            }

            return true;
          })
          .map((label) => {
            return {
              name: label.name,
              count: label.count,
              percent: percent(items.length, label.count),
            };
          })
          .sort((a, b) => {
            return b.count - a.count;
          }),
      };

      const previousInterval = {
        start: sub(start, segment.duration),
        end: start,
      };
      const prevItems = apply(
        issues,
        or(
          filters.interval(previousInterval, 'created_at'),
          filters.interval(previousInterval, 'closed_at')
        )
      );
      const prevOpened = apply(prevItems, filters.open);
      const prevClosed = apply(prevItems, filters.closed);

      return {
        title: segment.title,
        issues: {
          total: items.length,
          interval,
          previous: {
            total: prevItems.length,
            interval: previousInterval,
            state: {
              opened: {
                count: prevOpened.length,
                percent: percent(prevItems.length, prevOpened.length),
              },
              closed: {
                count: prevClosed.length,
                percent: percent(prevItems.length, prevClosed.length),
              },
            },
          },
          state: {
            opened: {
              count: opened.length,
              percent:
                opened.length > 0 ? percent(items.length, opened.length) : '-',
              change:
                opened.length > 0
                  ? percentChanged(prevOpened.length, opened.length)
                  : '-',
            },
            closed: {
              count: closed.length,
              percent:
                closed.length > 0 ? percent(items.length, closed.length) : '-',
              change:
                closed.length > 0
                  ? percentChanged(prevClosed.length, closed.length)
                  : '-',
            },
          },
          types,
        },
      };
    }),
  };
}
