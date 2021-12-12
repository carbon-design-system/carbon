/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Link from 'next/link';
import { getEnabledRepos } from '../../github';
import { Header } from '../../components/Header';
import { Text } from '../../components/Text';

export default function InsightsPage({ repos }) {
  return (
    <>
      <Header />
      <main>
        <Text productive-heading-03>
          <h1>Insights</h1>
        </Text>
        <ul>
          {repos.map((repo) => {
            const { owner, repo: name } = repo;
            const key = `${owner}:${name}`;
            return (
              <li key={key}>
                <Link href={`/insights/${owner}/${name}`}>
                  <a>{name}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      repos: getEnabledRepos(),
    },
  };
}
