/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as classes from './IssueExplorer.module.scss';
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from '@carbon/react';
import { useState } from 'react';

function IssueExplorer({ issues }) {
  const [activeLabelIds, setActiveLabelIds] = useState([]);
  const issuesById = new Map();
  const labelsById = new Map();
  const labelGroups = new Map();
  const filteredIssues = issues.filter((issue) => {
    return activeLabelIds.every((labelId) => {
      return issue.labels.find((label) => {
        return label.id === labelId;
      });
    });
  });

  for (const issue of filteredIssues) {
    issuesById.set(issue.number, issue);

    for (const label of issue.labels) {
      if (!labelsById.has(label.id)) {
        labelsById.set(label.id, {
          ...label,
          issues: [],
        });
      }

      const details = labelsById.get(label.id);
      details.issues.push(issue.number);

      if (label.name.includes(': ')) {
        const [group] = label.name.split(': ');

        if (!labelGroups.has(group)) {
          labelGroups.set(group, {
            label: group,
            labels: new Set(),
          });
        }

        const labelGroup = labelGroups.get(group);
        if (!labelGroup.labels.has(label.id)) {
          labelGroup.labels.add(label.id);
        }
      }
    }
  }

  const groups = Array.from(labelGroups.values()).sort((a, b) => {
    return b.labels.length - a.labels.length;
  });

  function toggleLabel(label) {
    const index = activeLabelIds.findIndex((id) => {
      return id === label.id;
    });

    // Selected
    if (index >= 0) {
      const ids = activeLabelIds.slice();
      ids.splice(index, 1);
      setActiveLabelIds(ids);
    } else {
      setActiveLabelIds(activeLabelIds.concat(label.id));
    }
  }

  return (
    <div className={classes.layout}>
      <aside className={classes.filterLayout}>
        <div className={classes.filters}>
          {groups.map((group) => {
            const total = Array.from(group.labels).reduce((sum, labelId) => {
              const label = labelsById.get(labelId);
              return sum + label.issues.length;
            }, 0);
            return (
              <details key={group.label} className={classes.filter}>
                <summary className={classes.filterLabel}>
                  {group.label} ({total})
                </summary>

                <ul className={classes.options}>
                  {Array.from(group.labels).map((id) => {
                    const label = labelsById.get(id);
                    return (
                      <li key={id}>
                        <label>
                          <input
                            type="checkbox"
                            onChange={() => {
                              toggleLabel(label);
                            }}
                            checked={activeLabelIds.includes(label.id)}
                          />
                          <span>
                            {label.name} ({label.issues.length})
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </details>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => {
            setActiveLabelIds([]);
          }}>
          Reset
        </button>
      </aside>
      <div className={classes.issues}>
        <h1>Issues ({filteredIssues.length})</h1>
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
                        return <li key={label.id}>{label.name}</li>;
                      })}
                    </ul>
                  </TableCell>
                  <TableCell>{issue.created_at}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export { IssueExplorer };
