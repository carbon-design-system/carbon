/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

'use strict';

const chalk = require('chalk');
const { exec } = require('child-process-promise');
const { prompt } = require('inquirer');
const path = require('path');
const createLogger = require('progress-estimator');
const getGitHubClient = require('./tools/getGitHubClient');

const logger = createLogger();

chalk.link = chalk.dim.underline.italic;
chalk.dimmed = chalk.dim.italic;

async function setup() {
  console.log(chalk`
{bold Hi there!} 👋
This tools is built for people looking to contribute to carbon.`);

  if (!process.env.GH_TOKEN) {
    console.log(chalk`
To get started, you will need a GitHub account {link (https://github.com/)}

Once you have an account you will need to setup a GitHub access token
{link (https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line)}
`);
  }

  const client = await getGitHubClient();
  const { data: whoami } = await client.users.getAuthenticated();

  console.log(`Thanks for that, ${chalk.underline(
    whoami.name
  )}! Now, let's get started...

Our first step is going to be to create a fork for each project you want to work on.
`);

  const { projects } = await prompt([
    {
      type: 'checkbox',
      name: 'projects',
      message: 'Select the projects you would like to contribute to',
      choices: availableProjects,
    },
  ]);

  console.log();
  console.log(`Awesome! Let's get started`);
  console.log();

  const cwd = process.cwd();

  for (const project of projects) {
    await fork(client, cwd, project);
  }

  console.log('Done! 🥳  Thanks so much for contributing to Carbon! 🙏');
}

async function fork(client, cwd, project) {
  const { commands, gitCloneEstimate, owner, repo } = project;

  const createForkPromise = client.repos.createFork({
    owner: project.owner,
    repo: project.repo,
  });
  const { data } = await logger(
    createForkPromise,
    `Creating your fork for ${owner}/${repo}...`,
    {
      estimate: 1000,
    }
  );

  console.log(
    `Your fork is done! Now let's setup the project on your computer.`
  );
  console.log();

  const { folder } = await prompt([
    {
      type: 'input',
      name: 'folder',
      message: 'Where would you like this project to be on your computer?',
      default: path.join(cwd, project.repo),
    },
  ]);
  const folderPath = path.isAbsolute(folder)
    ? folder
    : path.resolve(cwd, folder);

  const gitCloneCommand = `git clone ${data.git_url} ${path.relative(
    cwd,
    folderPath
  )}`;
  const gitClonePromise = exec(gitCloneCommand);
  await logger(gitClonePromise, `Running: ${chalk.dim(gitCloneCommand)}\n`, {
    estimate: gitCloneEstimate,
  });

  const gitRemoteCommand = `git remote add upstream git@github.com:${owner}/${repo}.git`;
  const gitRemotePromise = exec(gitRemoteCommand, {
    cwd: folderPath,
  });
  await logger(gitRemotePromise, `Running: ${chalk.dim(gitRemoteCommand)}\n`, {
    estimate: 500,
  });

  for (const { command, estimate, reason } of commands) {
    await logger(
      exec(command, {
        cwd: folderPath,
      }),
      `Running: ${chalk.dim(`\`${command}\``)} ${reason}\n`,
      {
        estimate,
      }
    );
  }

  console.log(
    `All done! You can find your project at ${chalk.underline(
      path.relative(cwd, folderPath)
    )}`
  );
}

function wrap(fn) {
  return async (...args) => {
    try {
      await fn(...args);
    } catch (error) {
      console.log(chalk.yellow.bold('Yikes!'));
      console.log(
        chalk`Looks like something went wrong 🙈 {dimmed (we're sorry about that)}

Here is the error message:
{dim ${indent(error.message, 4)}}

If this is not helpful, please reach out! We're happy to help 🙂 You can make
an issue over at:
{link https://github.com/carbon-design-system/carbon/issues/new/choose}`
      );
    }
  };
}

function indent(string, spaces = 2) {
  return string
    .split('\n')
    .map((s) => s.padStart(spaces + s.length, ' '))
    .join('\n');
}

const availableProjects = [
  {
    name: 'carbon',
    value: {
      owner: 'carbon-design-system',
      repo: 'carbon',
      gitCloneEstimate: 180 * 1000,
      commands: [
        {
          command: 'yarn install --offline',
          estimate: 150 * 1000,
          reason: `to install the project's dependencies`,
        },
        {
          command: 'yarn build',
          estimate: 60 * 1000 * 5,
          reason: `to build all the project's packages`,
        },
      ],
    },
  },
  {
    name: 'carbon-website',
    value: {
      owner: 'carbon-design-system',
      repo: 'carbon-website',
      gitCloneEstimate: 180 * 1000,
      commands: [
        {
          command: 'yarn install --offline',
          estimate: 45 * 1000,
          reason: "to install the project's dependencies",
        },
        {
          command: 'cd packages/addons-website && yarn build',
          estimate: 30 * 1000,
          reason: "to build all the project's packages",
        },
      ],
    },
  },
  {
    name: 'gatsby-theme-carbon',
    value: {
      owner: 'carbon-design-system',
      repo: 'gatsby-theme-carbon',
      gitCloneEstimate: 10 * 1000,
      commands: [
        {
          command: 'yarn install',
          estimate: 60 * 1000,
          reason: "to install the project's dependencies",
        },
        {
          command: 'yarn build',
          estimate: 150 * 1000,
          reason: "to build all the project's packages",
        },
      ],
    },
  },
];

module.exports = {
  command: 'setup',
  desc: 'setup your environment',
  handler: wrap(setup),
};
