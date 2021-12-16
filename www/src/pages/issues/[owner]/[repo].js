/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Header } from '../../../components/Header';
import { getRepoIssueDetails, filters } from '../../../github';
import { IssueExplorer } from '../../../components/IssueExplorer';

export default function IssuePage({ issues }) {
  return (
    <>
      <Header />
      <main>
        <IssueExplorer issues={issues} />
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

  return {
    props: {
      owner,
      repo,
      issues: open,
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
