/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useRouter } from 'next/router';
import { Header } from '../../../components/Header';

export default function RepoPage() {
  const router = useRouter();
  const { org, repo } = router.query;

  if (org === undefined || repo === undefined) {
    return null;
  }

  console.log(org, repo);

  return (
    <>
      <Header />
      <main>
        <h1>Wazzup</h1>
      </main>
    </>
  );
}
