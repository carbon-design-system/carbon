/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { workspace } = require('../workspace');

const tasks = {
  npm: require('./sync/npm'),
  package: require('./sync/package'),
  readme: require('./sync/readme'),
};

async function sync(args, env) {
  const { target } = args;
  const tasksToRun = target === 'all' ? Object.keys(tasks) : [target];

  for (const name of tasksToRun) {
    const task = tasks[name];
    await task.run(env);
  }
}

function register(cli) {
  cli.command(
    'sync [target]',
    'sync files across workspaces',
    yargs => {
      yargs.positional('target', {
        describe: 'choose a target to sync',
        choices: ['all', 'npm', 'package', 'readme'],
        default: 'all',
      });
    },
    workspace(sync)
  );

  return cli;
}

module.exports = {
  sync,
  register,
};
