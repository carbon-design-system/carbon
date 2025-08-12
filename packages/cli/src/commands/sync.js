/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { workspace } from '../workspace.js';
import npmTask from './sync/npm.js';
import packageTask from './sync/package.js';
import readmeTask from './sync/readme.js';

const tasks = {
  npm: npmTask,
  package: packageTask,
  readme: readmeTask,
};

async function sync(args, env) {
  const { target } = args;
  const tasksToRun = target === 'all' ? Object.keys(tasks) : [target];

  for (const name of tasksToRun) {
    const task = tasks[name];
    await task(env);
  }
}

export function builder(yargs) {
  yargs.positional('target', {
    describe: 'choose a target to sync',
    choices: ['all', 'npm', 'package', 'readme'],
    default: 'all',
  });
}

export const command = 'sync [target]';
export const desc = 'sync files across workspaces';
export const handler = workspace(sync);
