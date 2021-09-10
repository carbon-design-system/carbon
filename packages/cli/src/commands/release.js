/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const parse = require('@commitlint/parse');
const execa = require('execa');
const { prompt } = require('inquirer');
const semver = require('semver');
const { fetchLatestFromUpstream } = require('../git');
const { createLogger, displayBanner } = require('../logger');

// All supported commit types from our conventional-changelog preset
const types = [
  'build',
  'ci',
  'chore',
  'docs',
  'feat',
  'fix',
  'perf',
  'refactor',
  'revert',
  'style',
  'test',
];

// Filter supported commit types per release bump
const typesByReleaseBump = {
  minor: types,
  patch: types.filter((type) => type !== 'feat'),
};

const logger = createLogger('release');

/**
 * Create a branch with the commits necessary to generate a release for the
 * given release bump. This command will execute the commands a developer may
 * run in their terminal, but helps to create consistency around how to
 * determine the appropriate names for tags or branches, it also helps with
 * automatically determining which commits to cherry-pick over from the `master`
 * into the current release branch
 * @param {object} config
 * @param {string} config.bump
 * @returns {void}
 */
async function release({ bump }) {
  displayBanner();

  logger.start('Getting latest tag');

  // Make sure we've fetched the latest tags from upstream
  await execa('git', ['pull', 'upstream', 'master', '--tags']);
  const { stdout: tagInfo } = await execa('git', [
    'tag',
    '-l',
    '--sort=-v:refname',
  ]);
  const tags = tagInfo.split('\n');
  const [latestTag] = tags;

  if (!latestTag) {
    throw new Error('Unable to find latest tag from git tags');
  }

  logger.stop();
  logger.start(`Finding next available version for bump: ${bump}`);

  const nextTag = semver.inc(latestTag, bump);

  logger.info(`Bumping ${latestTag} to ${nextTag}`);
  logger.stop();

  const branchName = `chore/release-${nextTag}`;
  logger.start(`Creating branch: ${branchName}`);

  if (bump === 'patch') {
    logger.info(`Using tag ${latestTag} as base`);
    // If we're bumping for a patch release, we'll need to base our release off
    // of the previous known tag
    await execa('git', ['checkout', latestTag]);
  } else {
    logger.info(`Using master branch as base`);
    // If we're publishing other releases, we'll need to base our release off of
    // the latest stable `master` branch
    await fetchLatestFromUpstream();
  }
  await execa('git', ['checkout', '-b', branchName]);

  logger.stop();

  if (bump === 'patch') {
    const commitRange = `${latestTag}...master`;
    await cherryPickCommitsFrom(commitRange, bump);
  }

  // After making sure our base branch is up-to-date, let's go ahead and reset
  // our project and rebuild everything from a known state. This is helpful for
  // getting rid of any local inconsistencies. Ultimately this process
  // replicates what we do in our Continuous Integration checks.
  await resetProjectState();

  // Just in case there are any freshly generated files after running the steps
  // above, we'll check to see if the local branch is dirty before proceeding
  await checkIfBranchIsDirty();

  // Call out to lerna to handle versioning changed packages
  await execa(
    'yarn',
    ['lerna', 'version', bump, '--no-push', '--no-git-tag-version', '--exact'],
    {
      stdio: 'inherit',
    }
  );

  logger.start('Creating final commit');
  logger.info(
    'The next step will be to manually create a Pull Request for this branch'
  );

  const versionCommitMessage = 'chore(release): update package versions';
  await execa('git', ['add', '-A']);
  await execa('git', ['commit', '-m', versionCommitMessage]);

  logger.stop();
}

/**
 * When working with patch releases, we'll want to cherry pick commits that are
 * found in the commit range between two tags. This helper also considers the
 * version bump and the types of commits found. Depending on the bump certain
 * commit types will be included. If an appropriate commit type is not found,
 * we'll prompt the user for whether or not to include it. If a merge conflict
 * occurs, we'll prompt the user to address it before proceeding.
 *
 * @param {string} commitRange - the two tags we'll want to grab commits from.
 * The format should follow `tagA...tagB`, where tagA is older than tagB.
 * @param {string} bump - the version bump
 * @returns {void}
 */
async function cherryPickCommitsFrom(commitRange, bump) {
  logger.start(`Getting commits to cherry-pick from ${commitRange}`);

  const { stdout: commitInfo } = await execa('git', [
    '--no-pager',
    'log',
    '--oneline',
    commitRange,
  ]);

  const commits = [];
  for (const commit of commitInfo.split('\n').reverse()) {
    const hash = commit.slice(0, 9);
    const body = commit.slice(10);
    const info = await parse(body);
    const result = {
      info,
      hash,
      body,
    };

    // If we cannot derive the commit type, we'll need to manually confirm if we
    // should include the commit
    if (info.type === null) {
      const answers = await prompt([
        {
          type: 'confirm',
          name: 'confirmed',
          message: `Should we include the commit: ${commit}`,
        },
      ]);

      // Override the type with "manual" that we can use when we filter to see
      // what commits we need to cherry pick
      if (answers.confirmed) {
        result.info.type = 'manual';
      }
    }

    commits.push(result);
  }
  const commitsToCherryPick = commits.filter((commit) => {
    return (
      typesByReleaseBump[bump].includes(commit.info.type) ||
      commit.info.type === 'manual'
    );
  });

  logger.info(`Found ${commitsToCherryPick.length} commits to cherry-pick`);

  for (const commit of commitsToCherryPick) {
    logger.info(`${commit.hash} ${commit.body}`);

    try {
      await execa('git', [
        'cherry-pick',
        '--strategy=recursive',
        '-X',
        'theirs',
        commit.hash,
      ]);
    } catch (error) {
      if (!error.stderr.startsWith('error: could not apply')) {
        throw error;
      }
      const answers = await prompt([
        {
          type: 'confirm',
          name: 'proceed',
          message:
            `Applying the commit ${commit.hash} lead to a conflict. ` +
            `Please fix the conflict and then confirm to proceed.`,
          default: false,
        },
      ]);
      if (!answers.proceed) {
        await execa('git', ['cherry-pick', '--abort']);
        throw new Error(
          'Unable to proceed with cherry-picking after failed conflict ' +
            'resolution attempt'
        );
      }
    }
  }

  logger.stop();
}

/**
 * When working with multiple local environments, it's helpful to reset the
 * project to a known state. This helper will try and clean everything up so
 * that the environment is clean and good-to-go moving forward. Most of the
 * steps in this method ultimately reflect what we do in Continuous Integration
 * environments, with the addition of a `clean` command to remove generated
 * artifacts locally.
 *
 * @returns {void}
 */
async function resetProjectState() {
  logger.start('Resetting the project to a known state');

  logger.info('Cleaning any local artifacts or node_modules');
  // Make sure that our tooling is defined before running clean
  await execa('yarn', ['install', '--offline']);
  await execa('yarn', ['clean']);

  logger.info('Installing known dependencies from offline mirror');
  await execa('yarn', ['install', '--offline']);

  logger.info('Building packages from source');
  await execa('yarn', ['build']);

  logger.stop();
}

/**
 * When working with generated files, sometimes we'll want to check if the
 * working branch is dirty and if the caller wants to commit these files as part
 * of the release process.
 *
 * @returns {void}
 */
async function checkIfBranchIsDirty() {
  const { stdout } = await execa('git', ['status', '--porcelain']);
  if (stdout !== '') {
    const { confirmed } = await prompt([
      {
        type: 'confirm',
        name: 'confirmed',
        message:
          'The git status of the project is currently not clean. Would ' +
          'you like to commit these changes to the project?',
      },
    ]);

    if (confirmed) {
      await execa('git', ['add', '-A']);
      await execa('git', [
        'commit',
        '-m',
        'chore(project): sync generated files [skip ci]',
      ]);
    }
  }
}

module.exports = {
  command: 'release [bump]',
  desc: 'run the release step for the given version bump',
  builder(yargs) {
    yargs.positional('bump', {
      describe: 'choose a release version to bump',
      choices: ['minor', 'patch'],
      default: 'patch',
    });
  },
  handler: release,
};
