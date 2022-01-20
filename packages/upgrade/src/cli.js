/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import chalk from 'chalk';
import isGitClean from 'is-git-clean';
import { upgrade } from './commands/upgrade';
import { UpgradeError } from './error';
import { logger } from './logger';
import { upgrades } from './upgrades';
import packageJson from '../package.json';

// Note: for esbuild we need this import to be CommonJS
// - https://github.com/yargs/yargs/issues/1929
// - https://github.com/evanw/esbuild/issues/1492
// - https://github.com/yargs/yargs/blob/main/docs/bundling.md#esbuild
const cli = require('yargs');

export async function main({ argv, cwd }) {
  cli.scriptName(packageJson.name).version(packageJson.version);

  cli
    .option('force', {
      default: false,
      describe:
        'force execution if the cli encounters an error while doing safety checks',
      type: 'boolean',
    })
    .option('write', {
      alias: 'w',
      default: false,
      describe: 'update the files with changes found by running the migration',
      type: 'boolean',
    })
    .option('verbose', {
      alias: 'v',
      default: false,
      describe: 'optionally include additional logs, useful for debugging',
      type: 'boolean',
    });

  cli.usage('Usage: $0 [options]').command(
    '$0',
    'upgrade your project',
    {},
    run(async (args) => {
      const { verbose, write } = args;
      const options = {
        cwd: cwd(),
        verbose,
        write,
      };
      await upgrade(options, upgrades);
    })
  );

  cli.strict().parse(argv.slice(2));
}

/**
 * @param {Function} command
 * @returns {Function}
 */
function run(command) {
  return async (args) => {
    if (args.verbose === true) {
      logger.setLevel('verbose');
    }

    logger.log('Thanks for trying out @carbon/upgrade! 🙏');

    // Inspired by react-codemod:
    // https://github.com/reactjs/react-codemod/blob/b34b92a1f0b8ad333efe5effb50d17d46d66588b/bin/cli.js#L22
    let clean = false;

    try {
      clean = isGitClean.sync(process.cwd());
    } catch (error) {
      if (
        error &&
        error.stderr &&
        error.stderr.includes('Not a git repository')
      ) {
        clean = true;
      }
    }

    if (!clean && args.force !== true) {
      logger.log(
        chalk.yellow('[warning]'),
        'It appears that you have untracked changes in your project. Before we continue, please stash or commit your changes to git.'
      );
      logger.log(
        '\nYou may use the --force flag to override this safety check.'
      );
      process.exit(1);
    }

    try {
      await command(args);
      logger.log('Done! ✨');
    } catch (error) {
      if (error instanceof UpgradeError) {
        logger.error(error.message);
        process.exit(1);
      }
      logger.error('Yikes, looks like something really went wrong.');
      logger.error('Please make an issue with the following info:');
      logger.log(error);
      process.exit(1);
    }
  };
}
