/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as classes from './IssueExplorer.module.scss';
import {
  Button,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Tag,
} from '@carbon/react';
import { ChevronDown } from '@carbon/react/icons';
import { parseISO, format } from 'date-fns';
import { Flex } from '../Flex';
import { Text } from '../Text';
import { useState } from 'react';

function IssueExplorer({ issues, labelGroups }) {
  const [activeLabelIds, setActiveLabelIds] = useState([]);
  const issuesById = new Map();
  const labelsById = new Map();

  for (const group of labelGroups) {
    for (const label of group.labels) {
      if (!labelsById.has(label.id)) {
        labelsById.set(label.id, {
          ...label,
          issues: [],
        });
      }
    }
  }

  for (const issue of issues) {
    const isActive = activeLabelIds.every((labelId) => {
      return issue.labels.find((label) => {
        return label.id === labelId;
      });
    });

    issuesById.set(issue.number, {
      ...issue,
      isActive: isActive,
    });

    for (const label of issue.labels) {
      labelsById.get(label.id).issues.push(issue.number);
    }
  }

  const filteredIssues = issues.filter((issue) => {
    return issuesById.get(issue.number).isActive;
  });

  function toggleLabel(labelId) {
    const index = activeLabelIds.findIndex((id) => {
      return id === labelId;
    });

    // Selected
    if (index >= 0) {
      const ids = activeLabelIds.slice();
      ids.splice(index, 1);
      setActiveLabelIds(ids);
    } else {
      setActiveLabelIds(activeLabelIds.concat(labelId));
    }
  }

  return (
    <div className={classes.layout}>
      <aside className={classes.filterLayout}>
        <h1>
          <Flex align-center justify-between px-5 pt-5 pb-2>
            <Text productive-heading-01>Issues</Text>
            <span>{filteredIssues.length}</span>
          </Flex>
        </h1>
        <div className={classes.filters}>
          {labelGroups.map((group) => {
            const total = Array.from(group.labels).reduce((sum, label) => {
              const { issues } = labelsById.get(label.id);
              const activeIssues = issues.filter((id) => {
                return issuesById.get(id).isActive;
              });
              return sum + activeIssues.length;
            }, 0);

            return (
              <details key={group.name} className={classes.filter}>
                <summary className={classes.filterLabel}>
                  <Flex align-center gap-x-2>
                    <ChevronDown />
                    <Text body-short-02>{group.name}</Text>
                  </Flex>
                  <span>{total}</span>
                </summary>

                <ul className={classes.options}>
                  {group.labels.map((label) => {
                    const activeIssues = labelsById
                      .get(label.id)
                      .issues.filter((id) => {
                        return issuesById.get(id).isActive;
                      });

                    return (
                      <li key={label.id}>
                        <label className={classes.label}>
                          <Flex align-center gap-x-1 as="span">
                            <input
                              type="checkbox"
                              onChange={() => {
                                toggleLabel(label.id);
                              }}
                              checked={activeLabelIds.includes(label.id)}
                            />
                            {label.name}
                          </Flex>
                          <span>{activeIssues.length}</span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </details>
            );
          })}
        </div>
        <Flex col gap-y-3>
          <Flex px-5 wrap pt-3>
            {activeLabelIds.length > 0
              ? activeLabelIds.map((id) => {
                  const label = labelsById.get(id);
                  return (
                    <Tag
                      key={id}
                      type="high-contrast"
                      filter
                      onClick={() => {
                        toggleLabel(id);
                      }}>
                      {label.name}
                    </Tag>
                  );
                })
              : null}
          </Flex>
          <Button
            onClick={() => {
              setActiveLabelIds([]);
            }}>
            Reset
          </Button>
        </Flex>
      </aside>
      <div className={classes.issues}>
        {filteredIssues.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Title</TableHeader>
                <TableHeader>Labels</TableHeader>
                <TableHeader>Created at</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredIssues.map((issue) => {
                return (
                  <TableRow key={issue.number}>
                    <TableCell>
                      <a
                        rel="noopener noreferrer"
                        target="_blank"
                        href={issue.html_url}>
                        {issue.title}
                      </a>
                    </TableCell>
                    <TableCell>
                      <ul>
                        {issue.labels.map((label) => {
                          const isActive = activeLabelIds.includes(label.id);
                          return (
                            <li key={label.id}>
                              <Tag
                                type={isActive ? 'high-contrast' : 'gray'}
                                filter={isActive}
                                onClick={() => {
                                  toggleLabel(label.id);
                                }}>
                                {label.name}
                              </Tag>
                            </li>
                          );
                        })}
                      </ul>
                    </TableCell>
                    <TableCell>
                      {format(parseISO(issue.created_at), 'MMMM do')}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <p>No issues available for the current filters</p>
        )}
      </div>
    </div>
  );
}

export { IssueExplorer };
