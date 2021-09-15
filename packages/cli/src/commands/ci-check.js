/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

'use strict';

const { reporter } = require('@carbon/cli-reporter');
const { exec } = require('child-process-promise');
const { workspace } = require('../workspace');

async function check(args, env) {
  reporter.info('Running checks in CI...');

  const options = {
    cwd: env.root.directory,
    stdio: 'inherit',
  };
  const tasks = [
    `yarn carbon-cli check --ignore '**/@(node_modules|examples|components|react|fixtures|compat)/**' 'packages/**/*.scss'`,
    `cross-env BABEL_ENV=test yarn test --ci --maxWorkers 2 --reporters=default --reporters=jest-junit`,
    `cross-env BABEL_ENV=test yarn test:e2e --ci --maxWorkers 2 --reporters=default --reporters=jest-junit`,
    `cross-env PERCY_TOKEN=dd3392142006a6483c8f524697f39f052755fa9dc087ff4437cac3d64227abdd yarn run percy exec -- yarn workspace carbon-components-react test:e2e`,
  ];

  try {
    for (const task of tasks) {
      const now = Date.now();

      reporter.info(`Running: ${task}`);
      await exec(task, options);
      reporter.success(`Done in: ${Date.now() - now}ms`);
    }
  } catch (error) {
    console.log(error.stdout);
    console.log(error.stderr);
    console.log(error);
    process.exit(1);
  }
}

module.exports = {
  command: 'ci-check',
  desc: 'run CI checks',
  builder: {},
  handler: workspace(check),
};
