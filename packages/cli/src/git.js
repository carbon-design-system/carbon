/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { execa } from 'execa';

/**
 * For certain release types, we want to be certain that our base branch is
 * up-to-date with the upstream remote. This helper will first check that the
 * upstream remote exists, and create it if it does not, and then will pull the
 * latest changes into the local project.
 *
 * @returns {void}
 */
export async function fetchLatestFromUpstream() {
  try {
    // This command will fail if no upstream is present, with `catch` we can
    // create the appropriate remote before running the next commands
    await execa('git', ['remote', 'get-url', 'upstream']);
  } catch {
    await execa('git', [
      'remote',
      'add',
      'upstream',
      'git@github.com:carbon-design-system/carbon.git',
    ]);
  }
  await execa('git', ['fetch', 'upstream', 'main', '--tags']);
}
