/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

'use strict';

const { reporter } = require('@carbon/cli-reporter');
const childProcess = require('child_process');
const util = require('util');
const { workspace } = require('../workspace');

const exec = util.promisify(childProcess.exec);

async function check(args, env) {
  reporter.info('Running checks in CI...');

  const options = {
    cwd: env.root.directory,
  };
  const tasks = [
    'yarn format:diff',
    'yarn lint',
    `yarn bundler check --ignore '**/@(node_modules|examples|components|react)/**' 'packages/**/*.scss'`,
    `cross-env BABEL_ENV=test yarn test --ci --maxWorkers 2 --reporters=default --reporters=jest-junit`,
    `cross-env BABEL_ENV=test yarn test:e2e --ci --maxWorkers 2 --reporters=default --reporters=jest-junit`,
  ];

  reporter.info('Running the following tasks:');
  for (let i = 0; i < tasks.length; i++) {
    reporter.info(`[${i}] ${tasks[i]}`);
  }

  const promise = Promise.all(tasks.map(task => exec(task, options)));
  const interval = setInterval(() => {
    process.stdout.write('.');
  }, 1000);

  try {
    await promise;
    clearInterval(interval);
    console.log();
    reporter.success('Done! 🎉');
  } catch (error) {
    clearInterval(interval);
    console.log();
    console.log(error.message);
    console.log(error.stdout);
    process.exit(1);
  }
}

function register(cli) {
  cli.command('ci-check', 'run CI checks', {}, workspace(check));
  return cli;
}

module.exports = {
  check,
  register,
};
