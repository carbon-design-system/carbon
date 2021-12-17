/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Header } from '../../../components/Header';
import { getRepoIssueDetails, filters } from '../../../github';
import { IssueExplorer } from '../../../components/IssueExplorer';

export default function IssuePage({ issues, labels }) {
  return (
    <>
      <Header />
      <main>
        <IssueExplorer issues={issues} labelGroups={labels} />
      </main>
    </>
  );
}

export async function getStaticProps({ params }) {
  const { owner, repo } = params;
  const { issues } = await getRepoIssueDetails({
    owner,
    repo,
  });
  const open = filters.apply(issues, filters.open);
  const labels = new Map();

  for (const issue of open) {
    for (const label of issue.labels) {
      if (!labels.has(label.id)) {
        labels.set(label.id, {
          id: label.id,
          name: label.name,
          color: label.color,
        });
      }
    }
  }

  const categories = new Map([
    [
      'uncategorized',
      {
        name: 'uncategorized',
        labels: [],
      },
    ],
  ]);

  for (const label of labels.values()) {
    if (label.name.includes(': ')) {
      const [category] = label.name.split(': ');
      if (!categories.has(category)) {
        categories.set(category, {
          name: category,
          labels: [],
        });
      }
      categories.get(category).labels.push(label);
    } else {
      categories.get('uncategorized').labels.push(label);
    }
  }

  const order = [
    'type',
    'component',
    'package',
    'status',
    'impact',
    'severity',
    'proposal',
    'planning',
  ];

  return {
    props: {
      owner,
      repo,
      issues: open,
      labels: Array.from(categories.values())
        .sort((a, b) => {
          const weightA = order.indexOf(a.name);
          const weightB = order.indexOf(b.name);
          if (weightA === -1 && weightB === -1) {
            return a.name.localeCompare(b.name);
          }
          if (weightA === -1) {
            return 1;
          }
          if (weightB === -1) {
            return -1;
          }
          return weightA - weightB;
        })
        .map((group) => {
          return {
            ...group,
            labels: group.labels.sort((a, b) => {
              return a.name.localeCompare(b.name);
            }),
          };
        }),
    },
  };
}

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: [
      {
        params: {
          owner: 'carbon-design-system',
          repo: 'carbon',
        },
      },
    ],
  };
}
