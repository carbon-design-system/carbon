/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const parse = require('@commitlint/parse');
const chalk = require('chalk');
const execa = require('execa');
const { prompt } = require('inquirer');
const semver = require('semver');

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
  patch: types.filter(type => type !== 'feat'),
};

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

  const logger = createLogger();
  logger.start('Getting latest tag');

  // Make sure we've fetched the latest tags from upstream
  await execa('git', ['pull', 'upstream', '--tags']);
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
  logger.start(`Creating branch: ${branchName} from tag ${latestTag}`);

  await execa('git', ['checkout', latestTag]);
  await execa('git', ['checkout', '-b', branchName]);

  logger.stop();

  const commitRange = `${latestTag}...master`;

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
  const commitsToCherryPick = commits.filter(commit => {
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

module.exports = {
  command: 'release [bump]',
  desc: 'run the release step for the given version bump',
  builder(yargs) {
    yargs.positional('bump', {
      describe: 'choose a release version to bump',
      choices: ['patch'],
      default: 'patch',
    });
  },
  handler: release,
};

/**
 * Create a logger to be used in a handler. This is typically just for
 * formatting the output, adding a prefix, and connecting the output with
 * box-drawing ASCII characters.
 * @returns {object}
 */
function createLogger() {
  let start;

  /**
   * Display the given message with a box character. This also includes
   * formatting for the logger prefix and box character itself.
   * @param {string} boxCharacter
   * @param {string?} message
   * @returns {void}
   */
  function log(boxCharacter, message = '') {
    console.log(chalk`{yellow release ▐} {gray ${boxCharacter}} ${message}`);
  }

  return {
    info(message) {
      log('┣', chalk.gray(message));
    },
    start(message) {
      start = Date.now();
      log('┏', message);
    },
    stop(message) {
      const duration = ((Date.now() - start) / 1000).toFixed(2);
      if (message) {
        log('┗', message);
      } else {
        log('┗', chalk`{gray Done in {italic ${duration}s}}`);
      }
    },
    newline() {
      log('┃');
    },
  };
}

/**
 * Display the banner in the console, typically at the beginning of a handler
 * @returns {void}
 */
function displayBanner() {
  console.log(`
                 _
                | |
   ___ __ _ _ __| |__   ___  _ __
  / __/ _\` | '__| '_ \\ / _ \\| '_ \\
 | (_| (_| | |  | |_) | (_) | | | |
  \\___\\__,_|_|  |_.__/ \\___/|_| |_|

`);
}
