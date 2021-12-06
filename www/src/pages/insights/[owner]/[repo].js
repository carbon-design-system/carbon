/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  unstable_Heading as Heading,
  unstable_Section as Section,
} from '@carbon/react';
import {
  isAfter,
  isBefore,
  parseISO,
  isWithinInterval,
  formatISO,
  format,
} from 'date-fns';
import { useRouter } from 'next/router';
import React from 'react';
import { getRepoIssueDetails, getLabelBreakdown } from '../../../github';
import { getSprintsByYear } from '../../../sprints';
import { percent, percentChanged } from '../../../format';

export default function InsightsPage(props) {
  const router = useRouter();

  if (router.query.owner && router.query.repo) {
    const { issues, sprints, statistics } = props;
    return (
      <>
        <header>Carbon Design System</header>
        <main>
          <Heading>Insights</Heading>
          <Section>
            <header>
              <p>{router.query.repo} </p>
            </header>
            <article>
              <Heading>Overview</Heading>
              <dl>
                <dt>Open issues</dt>
                <dd>{issues.open}</dd>
                <dt>Issues closed per sprint</dt>
                <dd>{statistics.issues_closed_per_sprint.median}</dd>
                <dt>Issues created per sprint</dt>
                <dd>{statistics.issues_created_per_sprint.median}</dd>
              </dl>
            </article>
            <article>
              <Heading>Labels</Heading>
              <ol>
                {issues.labels.map((label) => {
                  return (
                    <li key={label.name}>
                      <span>
                        {label.percent} - {label.name}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </article>
            <Section
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gridGap: '1rem',
              }}>
              <Heading style={{ gridColumn: '1 / -1' }}>Sprints</Heading>
              {sprints.map((sprint) => {
                const start = parseISO(sprint.start);
                const end = parseISO(sprint.end);

                function formatChange(change) {
                  if (change) {
                    const symbol = change.type === 'increase' ? '+' : '';
                    return `(${symbol}${change.value})`;
                  }
                  return '';
                }

                const stddevs = {
                  closed:
                    Math.abs(
                      statistics.issues_closed_per_sprint.mean -
                        sprint.issues.states.closed.total
                    ) / statistics.issues_closed_per_sprint.stddev,
                  created:
                    Math.abs(
                      statistics.issues_created_per_sprint.mean -
                        sprint.issues.states.created.total
                    ) / statistics.issues_created_per_sprint.stddev,
                };
                const closedStyle = {};
                const createdStyle = {};

                if (stddevs.created >= 2) {
                  createdStyle.background = 'red';
                  createdStyle.color = 'black';
                } else if (stddevs.created >= 1) {
                  createdStyle.background = 'yellow';
                  createdStyle.color = 'black';
                }

                if (stddevs.closed >= 2) {
                  closedStyle.background = 'red';
                  closedStyle.color = 'black';
                } else if (stddevs.closed >= 1) {
                  closedStyle.background = 'yellow';
                  closedStyle.color = 'black';
                }

                const delta =
                  sprint.issues.states.created.total -
                  sprint.issues.states.closed.total;

                return (
                  <article
                    key={sprint.start}
                    style={{
                      padding: '1rem',
                      border: '1px solid black',
                    }}>
                    <div>
                      {format(start, 'MMMM do')} - {format(end, 'MMMM do')}
                    </div>
                    <dl
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'max-content 1fr',
                        gridRowGap: '0.5rem',
                        gridColumnGap: '1rem',
                      }}>
                      <dt>Open issues</dt>
                      <dd>
                        {sprint.issues.states.open.total}{' '}
                        {formatChange(sprint.issues.states.open.change)}
                      </dd>
                      <dt style={closedStyle}>Issues closed</dt>
                      <dd>
                        {sprint.issues.states.closed.total}{' '}
                        {formatChange(sprint.issues.states.closed.change)}
                      </dd>
                      <dt style={createdStyle}>Issues created</dt>
                      <dd>
                        {sprint.issues.states.created.total}{' '}
                        {formatChange(sprint.issues.states.created.change)}
                      </dd>
                      <dt>Delta</dt>
                      <dd>{`${delta > 0 ? '+' : ''}${delta}`}</dd>
                    </dl>
                  </article>
                );
              })}
            </Section>
          </Section>
        </main>
      </>
    );
  }

  return 'Loading...';
}

export async function getStaticProps({ params }) {
  const { owner, repo } = params;
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
  const sprints = getSprintsByYear(2021)
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
    props: {
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
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          owner: 'carbon-design-system',
          repo: 'carbon',
        },
      },
      {
        params: {
          owner: 'carbon-design-system',
          repo: 'carbon-website',
        },
      },
    ],
    fallback: false,
  };
}
