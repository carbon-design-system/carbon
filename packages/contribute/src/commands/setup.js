/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const childProcess = require('child_process');
const enquirer = require('enquirer');
const path = require('path');
const util = require('util');
const getGitHubClient = require('./tools/getGitHubClient');

const exec = util.promisify(childProcess.exec);

async function setup(args, env) {
  const client = await getGitHubClient();
  const { data: whoami } = await client.users.getAuthenticated();

  console.log(`Hi there, ${whoami.name}! 👋`);

  console.log('Creating your fork...');
  const { data } = await client.repos.createFork({
    owner: 'carbon-design-system',
    repo: 'carbon',
  });

  console.log('Cloning your repo...');
  const response = await enquirer.prompt([
    {
      type: 'input',
      name: 'folder',
      message: 'What folder do you want?',
    },
  ]);
  const folderPath = path.resolve(env.cwd, response.folder);

  console.log(`Cloning to: ${folderPath}`);
  await exec(`git clone ${data.git_url} ${folderPath}`);

  console.log('Setting up upstream...');
  await exec(
    `git remote add upstream git@github.com:carbon-design-system/carbon.git`,
    {
      cwd: folderPath,
    }
  );

  console.log('Installing all dependencies...');
  await exec('yarn install --offline', {
    cwd: folderPath,
  });

  console.log('Building all dependencies...');
  await exec('yarn build', {
    cwd: folderPath,
  });

  console.log('Done!');
}

function register(cli, env) {
  cli.command(
    'setup',
    'get your machine ready for contributing 🥳',
    {},
    (...args) => setup(...args, env)
  );
  return cli;
}

module.exports = {
  setup,
  register,
};
