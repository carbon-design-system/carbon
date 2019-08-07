/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const parse = require('@commitlint/parse');
const fs = require('fs-extra');
const execa = require('execa');
const { prompt } = require('inquirer');
const path = require('path');
const semver = require('semver');
const createLogger = require('../createLogger');
const displayBanner = require('../displayBanner');

const logger = createLogger('publish');

async function publish({ tag }) {
  displayBanner();

  logger.start('Validating the given tag');

  if (tag[0] !== 'v') {
    throw new Error(
      `Expected tag name to match vX.Y.Z, instead received: ${tag}`
    );
  }

  if (!semver.valid(tag.slice(1))) {
    throw new Error(
      `Given tag is not a semantically valid version, received: ${tag}`
    );
  }

  logger.stop();

  logger.start('Resetting the project to a known state');

  // logger.info('Pulling latest from upstream for master');
  // await execa('git', ['checkout', 'master']);
  // await execa('git', ['pull', 'upstream']);

  // logger.info('Cleaning any local artifacts or node_modules');
  // // Make sure that our tooling is defined before running clean
  // await execa('yarn', ['install', '--offline']);
  // await execa('yarn', ['clean']);

  // logger.info('Installing known dependencies from offline mirror');
  // await execa('yarn', ['install', '--offline']);

  // logger.info('Building packages from source');
  // await execa('yarn', ['build']);

  logger.stop();

  logger.start('Checking project for out-of-sync generated files');
  // const { stdout } = await execa('git', ['status', '--porcelain']);
  // if (stdout !== '') {
  // const { confirmed } = await prompt([
  // {
  // type: 'confirm',
  // name: 'confirmed',
  // message:
  // 'The git status of the project is currently not clean. Would ' +
  // 'you like to commit these changes to the project?',
  // },
  // ]);

  // if (confirmed) {
  // await execa('git', ['add', '-A']);
  // await execa('git', [
  // 'commit',
  // '-m',
  // 'chore(project): sync generated files [skip ci]',
  // ]);
  // }
  // }

  logger.stop();

  logger.start('Publishing packages');
  logger.info('Logging into npm');

  // try {
  // // This command will fail if the user is unauthenticated
  // await execa('npm', ['whoami']);
  // } catch {
  // await execa('npm', ['login'], {
  // stdio: 'inherit',
  // });
  // }

  // // This is going to update all the package.json files with new version
  // await execa(
  // 'yarn',
  // ['lerna', 'publish', 'from-package', '--dist-tag', 'next'],
  // {
  // stdio: 'inherit',
  // }
  // );

  logger.stop();

  // const answers = await prompt([
  // {
  // type: 'confirm',
  // name: 'tags',
  // message: 'Would you like to update the package tags from next to latest?',
  // },
  // ]);

  // if (answers.tags) {
  // //
  // }

  logger.start('Generating git tag and pushing to upstream');

  logger.info(`Generating the tag ${tag}`);
  // await execa('git', ['tag', '-a', tag, '-m', tag]);

  // const { upstream } = await prompt([
  // {
  // type: 'confirm',
  // name: 'upstream',
  // message: `Should we push the tag ${tag} upstream?`,
  // },
  // ]);

  // if (upstream) {
  // logger.info(`Pushing the tag ${tag} upstream`);
  // // await execa('git', ['push', 'upstream', tag]);
  // }

  logger.stop();

  // Generate changelog
  logger.start('Generating the changelog');

  logger.info('Getting package folders');
  const { stdout: packageInfo } = await execa('ls', ['packages']);
  const packages = packageInfo
    .split('\n')
    .map(folder => {
      const directory = path.join(process.cwd(), 'packages', folder);
      const packageJsonPath = path.join(directory, 'package.json');
      const packageJson = fs.readJsonSync(packageJsonPath);

      return {
        directory,
        packageJson,
      };
    })
    .filter(({ directory, packageJson }) => {
      const stats = fs.statSync(directory);
      if (!stats.isDirectory()) {
        return false;
      }

      if (packageJson.private === 'true') {
        return false;
      }

      return true;
    });

  const { stdout: tagInfo } = await execa('git', [
    'tag',
    '-l',
    '--sort=-v:refname',
  ]);
  const tags = tagInfo.split('\n');
  const [latestTag, lastTag] = tags;
  const commitRange = `${lastTag}...${latestTag}`;

  logger.info(`Using commits from ${commitRange}`);

  const allCommits = await Promise.all(
    packages.map(async pkg => {
      const { stdout } = await execa('git', [
        'rev-list',
        commitRange,
        '--oneline',
        '--',
        pkg.directory,
      ]);
      if (stdout === '') {
        return {
          ...pkg,
          commits: [],
        };
      }

      const commits = await Promise.all(
        stdout.split('\n').map(async commit => {
          const hash = commit.slice(0, 9);
          const text = commit.slice(10);
          const info = await parse(text);

          return {
            info,
            hash,
            text,
          };
        })
      );

      return {
        ...pkg,
        commits,
      };
    })
  );
  const commitsToInclude = allCommits.filter(
    ({ commits }) => commits.length > 0
  );

  const sections = [
    {
      title: 'Bug fixes :bug:',
      types: ['fix'],
    },
    {
      title: 'New features :rocket:',
      types: ['feat'],
    },
    {
      title: 'Documentation :memo:',
      types: ['docs'],
    },
    {
      title: 'Housekeeping :house:',
      types: ['build', 'ci', 'chore', 'perf', 'refactor', 'revert', 'test'],
    },
  ];

  logger.stop();

  // Create new branch with updated package numbers to commit as PR
  // Find linked PRs or issues and notify of this release
}

module.exports = {
  command: 'publish <tag>',
  desc:
    'publish packages that have different versions from the package registry',
  builder(yargs) {
    yargs.positional('tag', {
      describe: 'the version tag associated with the release',
      type: 'string',
    });
  },
  handler: publish,
};
